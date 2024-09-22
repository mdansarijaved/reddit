import { Posts } from "@prisma/client";

export type likes = {
    id: string;
    userid: string;
};
export type user = { id: string; name: string | null };

export type post = Posts & { User: user } & { likes: likes[] }