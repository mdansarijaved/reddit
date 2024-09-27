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
  const userId = session?.user.id;
  if (!validatesItems.success) {
    return { error: "Invalid Fields" };
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(3000);

  try {
    const slugName = postdata.title.replace(/[^a-zA-Z0-9.]/g, "+");
    const hash = nanoid(5);
    const slug = `${slugName}${hash}`;
    const { body, media, title } = validatesItems.data;
    const post = await db.posts.create({
      data: {
        title,
        body,
        media,
        userId: userId!,
        slug: slug,
      },
    });
    if (!post) {
      return { error: "oops something went wrong" };
    }
    revalidatePath("/");
    return { message: "post created" };
  } catch (error) {
    return { error: "something is really wrong" };
  }
};
