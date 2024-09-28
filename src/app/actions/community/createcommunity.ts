"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { communitySchema } from "@/schema/schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";
import * as z from "zod";

export const createCommunity = async (
  data: z.infer<typeof communitySchema>
) => {
  const validatedata = communitySchema.safeParse(data);
  const user = await auth();
  if (!user) {
    return;
  }
  if (!validatedata.success) {
    toast.error("error while parsing data");
  }
  try {
    const slugName = data.community_name.replace(/[^a-zA-Z0-9.]/g, "_");
    const slugname = `${slugName}`;
    await db.community.create({
      data: {
        ...data,
        AdminId: user.user.id,
        slug: slugname,
      },
    });
    revalidatePath("/");
  } catch (e) {
    console.log(e);
  }
};
