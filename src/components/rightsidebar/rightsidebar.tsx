import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import Image from "next/image";

import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";

export default async function RightBar() {
  const posts = await db.posts.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
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
      Community: {
        select: {
          id: true,
          community_name: true,
          slug: true,
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
  return (
    <div className="max-w-xs sticky top-20 right-10 border shadow-xl  h-fit w-full hidden xl:block rounded-xl py-3 ">
      <p className="px-4 py-3">Recent Posts</p>
      <div className="w-full space-y-4">
        {posts.map((post, i) => (
          <div className="w-full space-y-2 border-t  pt-3">
            <div className="flex justify-start items-center gap-2 px-4">
              <div className="w-6 h-6 rounded-full bg-green-800"></div>
              <div className="">
                <p className="text-xs font-light">
                  r/{post.Community?.community_name}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between items-start gap-4 px-4">
              <div className="space-y-1">
                <Link href={`/post/${post.slug}`}>
                  <p className="text-sm">{post.title}</p>
                </Link>
                <div className="w-full text-xs font-light">
                  <div>{post.likes.length} upvotes</div>
                </div>
              </div>
              {post.media[0] ? (
                <Image
                  src={post.media[0]}
                  width={80}
                  height={80}
                  alt="image"
                  className="rounded overflow-clip w-10 h-10"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
