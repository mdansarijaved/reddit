"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { postSchema } from "@/schema/schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createpost = async (postdata: z.infer<typeof postSchema>) => {
  const validatesItems = postSchema.safeParse(postdata);
  const session = await auth();
  if (!session) {
    return { error: "Unauth" };
  }
  if (!validatesItems.success) {
    return { error: "Invalid Fields" };
  }
  const userId = session.user.id;

  try {
    const slugName = postdata.title.replace(/[^a-zA-Z0-9.]/g, "_");
    const hash = nanoid(5);
    const slug = `${slugName}${hash}`;
    const { community, ...data } = validatesItems.data;
    const post = await db.posts.create({
      data: {
        userId: userId,
        body: data.body,
        media: data.media,
        title: data.title,
        slug: slug,
        communityId: validatesItems.data.community,
      },
    });
    console.log(post);
    if (!post) {
      return { error: "oops something went wrong" };
    }
    revalidatePath("/");
    return { message: "post created" };
  } catch (error) {
    console.log(error);
    return { error: "something is really wrong" };
  }
};

export const getAllPost = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await db.posts.findMany({
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
      id: true,
      createdAt: true,
      title: true,
      body: true,
      media: true,
      slug: true,
      User: {
        select: {
          _count: true,
          id: true,
          name: true,
        },
      },
      Community: {
        select: {
          id: true,
          community_name: true,
          slug: true,
          icon: true,
          banner: true,
        },
      },
      likes: {
        select: {
          id: true,
          userid: true,
        },
      },
    },
  });
};
