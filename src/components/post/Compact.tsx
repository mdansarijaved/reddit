import { post } from "@/types/post";
import { Session } from "next-auth";
import Image from "next/image";
import { PostHeading } from "./PostHeading";
import LikeButton from "./LikeButton";

export const Compact = ({
  posts,
  user,
}: {
  posts: post;
  user: Session | null;
}) => {
  const isLiked = posts?.likes.some((like) => like.userid === user?.user.id);

  return (
    <div className="max-w-xl border-x w-full  border-b py-1 px-4 flex justify-start items-center">
      {posts.media.length > 0 ? (
        <Image
          src={posts.media[0]}
          width={1000}
          height={1000}
          alt="image"
          className="w-24 h-24 object-cover rounded-xl"
        />
      ) : null}
      <div className="grid items-start justify-start gap-1 w-full bg-red-400">
        <PostHeading posts={posts} />
        <div className="text-lg font-semibold line-clamp-2">{posts.title}</div>
        <LikeButton id={posts.id} isLiked={isLiked} />
      </div>
    </div>
  );
};
