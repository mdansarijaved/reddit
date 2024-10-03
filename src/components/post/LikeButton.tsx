"use client";
import { handleLikes } from "@/app/actions/likes";
import { post } from "@/types/post";
import React from "react";
import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";

function LikeButton({ isLiked, post }: { isLiked: boolean; post: post }) {
  return (
    <div className="rounded-3xl px-2 py-2 hover:bg-gray-200 w-fit flex justify-center items-center gap-2 ">
      <TbArrowBigUp
        onClick={async () => await handleLikes(post.id)}
        className={`flex items-center gap-1 ${
          isLiked ? "text-green-500 fill-green-500" : "text-gray-500"
        }`}
        size={19}
      />
      <span className="text-[0.8rem] font-medium ">{post.likes.length}</span>
      <TbArrowBigDown
        onClick={async () => await handleLikes(post.id)}
        className={`flex items-center gap-1 ${
          isLiked ? "text-green-500 fill-green-500" : "text-gray-500"
        }`}
        size={19}
      />
    </div>
  );
}

export default LikeButton;
