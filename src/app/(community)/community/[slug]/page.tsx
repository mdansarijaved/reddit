import { auth } from "@/auth";
import PostCard from "@/components/hero-section/postcard";
import { db } from "@/lib/db";
import React from "react";

async function Community({ params }: { params: { slug: string } }) {
  const community = await db.community.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      posts: {
        select: {
          Community: {
            select: {
              id: true,
              community_name: true,
              slug: true,
            },
          },
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
          likes: {
            select: {
              id: true,
              userid: true,
            },
          },
        },
      },
      user: {
        select: {
          _count: true,
          id: true,
          name: true,
        },
      },
    },
  });
  const user = await auth();

  return (
    <div className="">
      <div>
        <div></div>
      </div>
      {community?.posts.map((post, index) => (
        <PostCard posts={post} key={post.id} user={user} />
      ))}
    </div>
  );
}

export default Community;
