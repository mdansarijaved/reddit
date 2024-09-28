import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import { Likedby, Posts, User } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { handleLikes } from "@/app/actions/likes";
import Link from "next/link";
import { Session } from "next-auth";
import { post } from "@/types/post";
import isLikedbyUser from "@/lib/isLikedByUser";
import { db } from "@/lib/db";

export default async function PostCard({
  posts,
  user,
}: {
  posts: post;
  user: Session | null;
}) {
  const isLiked = await isLikedbyUser(posts);

  return (
    <div className="max-w-xl   border-x border-b py-2 px-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center mt-1">
          <div className="w-6 h-6 rounded-full bg-green-500 "></div>
          <div className="">
            <Link
              href={`/community/${posts.Community?.slug}`}
              className="text-muted-foreground text-xs  "
            >
              r/{posts.Community?.community_name}
            </Link>
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
      <Link href={`/post/${posts.slug}`}>
        <h1 className="mt-1 text-lg">{posts.title}</h1>
      </Link>
      {posts.media.length > 0 ? (
        <Carousel className="w-full ">
          <CarouselContent>
            {posts.media.map((media, index) => (
              <CarouselItem key={index}>
                <div className="w-full bg-gray-300 rounded-xl">
                  <Image
                    alt="hey"
                    key={index}
                    height={600}
                    width={600}
                    className="w-full  h-[28rem] object-contain "
                    src={media}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div
          className="w-full line-clamp-3 text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: posts?.body || "" }}
        ></div>
      )}

      <div className="flex mt-2 gap-4 items-center">
        <div className={`flex items-center rounded-full p-2`}>
          <form
            action={async () => {
              "use server";
              await handleLikes(posts.id);
            }}
          >
            <button>
              <TbArrowBigUp
                className={`flex items-center gap-1 ${
                  isLiked ? "text-green-500 fill-green-500" : "text-gray-500"
                }`}
                size={19}
              />
            </button>
          </form>
          <p className="text-[0.8rem] font-medium px-3">{posts.likes.length}</p>
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
