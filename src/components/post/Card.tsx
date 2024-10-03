import { post } from "@/types/post";
import { Session } from "next-auth";
import React from "react";
import { PostHeading } from "./PostHeading";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";
import LikeButton from "./LikeButton";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import PostBody from "./body";

function Card({ posts, user }: { posts: post; user: Session | null }) {
  const isLiked = posts?.likes.some((like) => like.userid === user?.user.id);

  return (
    <div className="max-w-xl   border-x border-b py-2 px-4">
      <PostHeading posts={posts} />
      <Link href={`/post/${posts.slug}`}>
        <h1 className="mt-1 text-lg">{posts.title}</h1>
      </Link>
      {posts.media.length > 0 ? (
        <ImageCarousel media={posts.media} />
      ) : (
        <PostBody body={posts.body} />
      )}
      <div className="flex mt-2 gap-4 items-center">
        <div className={`flex items-center rounded-full p-2`}>
          <LikeButton isLiked={isLiked} post={posts} />
        </div>
        <button className="flex items-center text-[0.8rem] font-medium gap-2 py-2 rounded-full px-3 ">
          <GoComment size={16} />
          112
        </button>
        <button className="py-2 rounded-full px-3 ">
          <LiaMedalSolid size={19} />
        </button>
        <button className="flex items-center text-[0.8rem] font-medium gap-2 py-2 rounded-full px-3 ">
          <RiShareForwardLine size={18} />
          Share
        </button>
      </div>
    </div>
  );
}

export default Card;
