"use server";

import { db } from "@/lib/db";
import { error } from "console";
import { Truculenta } from "next/font/google";

class PostError extends Error {

};


export const getPostbyId = async (postId: string) => {
    try {
        const post = await db.posts.findFirst({
            include: {
                User: true,
                likes: true,
                children: true,
                parent: true
            },
            where: {
                id: postId,
            }
        })

        if (!post) {
            throw new PostError("No post found");
        }
        return { post, error: null };
    } catch (error) {
        console.log("Error: ", error);
        if (error instanceof PostError)
            return { post: null, error: error.message }
        else {
            return { post: null, error: "something went wrong" }
        }
    }
}