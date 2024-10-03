"use client";

import { Session } from "next-auth";
import { post } from "@/types/post";
import SortSection from "../post/sortbar";
import { useState } from "react";
import ViewLayout from "../post/viewLayout";
import Card from "../post/Card";
import { Compact } from "../post/Compact";

export default function PostCard({
  posts,
  user,
}: {
  posts: post[];
  user: Session | null;
}) {
  const [value, setValue] = useState("");
  const [layout, setLayout] = useState("Card");

  return (
    <div>
      <div className="w-full border-b flex justify-start items-center ">
        <SortSection value={value} setValue={setValue} />
        <ViewLayout value={layout} setValue={setLayout} />
      </div>
      {posts.map((post) =>
        layout === "Card" ? (
          <Card posts={post} key={post.id} user={user} />
        ) : (
          <Compact posts={post} key={post.id} user={user} />
        )
      )}
    </div>
  );
}
