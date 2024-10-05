import { post } from "@/types/post";
import { Session } from "next-auth";
import Image from "next/image";
import { PostHeading } from "./PostHeading";
import LikeButton from "./LikeButton";
import { FileEdit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Compact = ({
  posts,
  user,
  className,
}: {
  posts: post;
  user: Session | null;
  className?: string;
}) => {
  const isLiked = posts?.likes.some((like) => like.userid === user?.user.id);

  return (
    <div className={cn(" border-x   border-b p-2 w-[36rem]", className)}>
      <div className="flex justify-start items-start gap-2">
        {posts.media.length > 0 ? (
          <Link href={`/post/${posts.slug}`}>
            <div className="w-24 bg-red-300 h-24 rounded-xl">
              <Image
                src={posts.media[0]}
                width={1000}
                height={1000}
                alt="image"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </Link>
        ) : (
          <Link href={`/post/${posts.slug}`}>
            <div className="w-24 h-24 bg-black grid justify-center items-center rounded-xl ">
              <FileEdit className="w-12 h-12" />
            </div>
          </Link>
        )}
        <div className=" gap-1 w-full">
          <div className="flex w-full  ">
            <PostHeading posts={posts} />
          </div>
          <div className="text-lg font-semibold line-clamp-2">
            {posts.title}
          </div>
          <LikeButton post={posts} isLiked={isLiked} />
        </div>
      </div>
    </div>
  );
};
