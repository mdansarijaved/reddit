"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const handleLikes = async (postId: string) => {
  const user = await auth();
  if (!user) {
    return;
  }
  try {
    const postLiked = await db.likedby.findFirst({
      where: {
        userid: user.user.id,
        postsId: postId,
      },
    });

    if (postLiked) {
      await db.likedby.delete({
        where: {
          id: postLiked.id,
        },
      });
      revalidatePath("/");
      return;
    }

    await db.likedby.create({
      data: {
        postsId: postId,
        userid: user.user.id,
      },
    });
    revalidatePath("/");
    return;
  } catch (error) {
    console.log("there is some error");
  }
};
