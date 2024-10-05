"use client";
import React from "react";
import PopularCaraousel from "./popularCaraousel";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/app/actions/post/post";
import { Compact } from "../post/Compact";
import { Session } from "next-auth";
import { PopularSkeleton } from "./Fallback";

function PopularSection({ user }: { user: Session }) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPost(),
  });
  if (isLoading) return <PopularSkeleton />;
  if (!posts) return null;
  if (error) return <div>Error Loading Posts</div>;
  return (
    <div className="w-full px-10 pt-10">
      <PopularCaraousel posts={posts} />
      <div className="w-full flex flex-col justify-center items-center pt-10">
        {posts.map((post) => (
          <div key={post.id} className="w-full">
            <Compact posts={post} user={user} className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularSection;
