import { cn } from "@/lib/utils";
import { post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

type Variant = "normal" | "popular" | "exclusive";

export const PostHeading = ({
  posts,
  className,
  variant = "normal",
}: {
  posts: post;
  className?: string | undefined;
  variant?: Variant;
}) => {
  const variantClasses = {
    normal: "block",
    popular: "hidden",
    exclusive: "",
  };

  return (
    <div className={cn(`flex justify-between w-full `, className)}>
      <div className="flex gap-2 items-center mt-1">
        {posts.Community ? (
          <Image
            src={posts.Community.icon}
            width={200}
            height={200}
            alt="icon"
            className="w-6 h-6 rounded-full  "
          ></Image>
        ) : (
          <div className="w-6 h-6 rounded-full bg-green-500 "></div>
        )}
        <div className="">
          {posts.Community?.community_name && (
            <Link
              href={`/community/${posts.Community?.slug}`}
              className={`text-xs ${variantClasses[variant]}  `}
            >
              r/{posts.Community?.community_name}
            </Link>
          )}
          <p className="text-xs font-light  ">u/{posts.User.name}</p>
        </div>
      </div>
      <button>
        <BsThreeDots className={`font-thin ${variantClasses[variant]}`} />
      </button>
    </div>
  );
};
