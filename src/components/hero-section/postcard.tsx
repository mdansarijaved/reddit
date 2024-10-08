"use client";
import { post } from "@/types/post";
import SortSection from "../post/sortbar";
import { useState } from "react";
import ViewLayout from "../post/viewLayout";
import Card from "../post/Card";
import { Compact } from "../post/Compact";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/app/actions/post/post";
import { Session } from "next-auth";
import { Skeleton } from "../ui/skeleton";

export default function PostCard({ user }: { user: Session | null }) {
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPost(),
  });

  const [value, setValue] = useState("");
  const [layout, setLayout] = useState("Card");

  if (isLoading) {
    return (
      <div className=" w-[36rem] space-y-3">
        <Skeleton className="h-12 w-full " />
        <div className="space-y-2 w-full">
          <Skeleton className="h-[30rem] w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return <div>Error loading posts</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>Nothings here</div>;
  }

  return (
    <div>
      <div className="w-full border-b flex justify-start items-center ">
        <SortSection value={value} setValue={setValue} />
        <ViewLayout value={layout} setValue={setLayout} />
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          {layout === "Card" ? (
            <Card posts={post} user={user} />
          ) : (
            <div className="max-w-xl">
              <Compact posts={post} user={user} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
