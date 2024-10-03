"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { error } from "console";
import { revalidatePath } from "next/cache";

export const getAllCommunity = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  const communites = db.community.findMany();
  return communites;
};

export const getCommunitybySlug = async (slug: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  if (!session) {
    return;
  }
  try {
    const community = await db.community.findFirst({
      where: {
        slug: slug,
      },
      include: {
        posts: {
          select: {
            Community: {
              select: {
                id: true,
                community_name: true,
                slug: true,
              },
            },
            id: true,
            title: true,
            body: true,
            media: true,
            slug: true,
            User: {
              select: {
                id: true,
                name: true,
              },
            },
            likes: {
              select: {
                id: true,
                userid: true,
              },
            },
          },
        },
        user: {
          select: {
            _count: true,
            id: true,
            name: true,
          },
        },
      },
    });
    revalidatePath("/community");
    return community;
  } catch (error) {
    console.error(error);
  }
};
