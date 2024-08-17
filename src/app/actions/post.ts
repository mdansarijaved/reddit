"use server";
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { postSchema } from '@/schema/schema';
import * as z from 'zod';

export const createpost = async (postdata: z.infer<typeof postSchema>) => {
    const session = await auth();
    try {
        const { body, media, title } = postdata;
        const post = await db.posts.create({
            data: {
                title,
                body,
                media,
                userId: session?.user.id,
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