"use server";
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { postSchema } from '@/schema/schema';
import * as z from 'zod';

export const createpost = async (postdata: z.infer<typeof postSchema>) => {
    const validatesItems = postSchema.safeParse(postdata);
    const session = await auth();
    const userId = session?.user.id;
    if (!validatesItems.success) {
        return { error: "Invalid Fields" };
    }
    try {
        const { body, media, title } = validatesItems.data;
        const post = await db.posts.create({
            data: {
                title,
                body,
                media,
                userId: userId,
            }
        });
        if (!post) {
            return { error: "oops something went wrong" };
        }
        return { message: "post created" };
    } catch (error) {
        return { error: "something is really wrong" }
    }
}