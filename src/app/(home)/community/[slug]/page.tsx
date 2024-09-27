import { db } from "@/lib/db";
import React from "react";

async function Community({ params }: { params: { slug: string } }) {
  const community = await db.community.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      posts: true,
      user: {
        select: {
          _count: true,
          id: true,
          name: true,
        },
      },
    },
  });
  return (
    <div className="">
      <div>
        <p className="text-7xl font-bold">{community?.community_name}</p>
      </div>
      {community?.posts.map((post, index) => (
        <div>{post.title}</div>
      ))}
    </div>
  );
}

export default Community;
