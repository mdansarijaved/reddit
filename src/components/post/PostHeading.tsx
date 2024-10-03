import { post } from "@/types/post";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

export const PostHeading = ({ posts }: { posts: post }) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-2 items-center mt-1">
        <div className="w-6 h-6 rounded-full bg-green-500 "></div>
        <div className="">
          {posts.Community?.community_name && (
            <Link
              href={`/community/${posts.Community?.slug}`}
              className="text-muted-foreground text-xs  "
            >
              r/{posts.Community?.community_name}
            </Link>
          )}
          <p className="text-muted-foreground text-xs font-light  ">
            u/{posts.User.name}
          </p>
        </div>
        <p className="text-sm text-muted-foreground "></p>
      </div>
      <button>
        <BsThreeDots className="font-thin" />
      </button>
    </div>
  );
};
