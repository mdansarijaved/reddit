import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import { Posts, User } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default async function PostCard({
  posts,
}: {
  posts: Posts & { User: User };
}) {
  return (
    <div className=" max-w-5xl w-[35rem] max-h-[35.4rem]  border-x border-b  py-2 px-4">
      <div className="flex justify-between">
        <div className="flex gap-2  items-center mt-1">
          <div className="w-6 h-6 rounded-full bg-green-500 "></div>
          <p className="text-muted-foreground text-sm font-bold ">
            {posts.User.name}
          </p>
          <p className="text-sm text-muted-foreground "></p>
        </div>
        <button>
          <BsThreeDots className="font-thin" />
        </button>
      </div>
      <h1 className="mt-1 text-lg">{posts.title}</h1>
      <Carousel className="w-full ">
        <CarouselContent>
          {posts.media &&
            posts.media.map((media, index) => (
              <CarouselItem key={index}>
                <Image
                  alt="hey"
                  key={index}
                  height={600}
                  width={600}
                  className="w-full rounded-xl h-[28rem] mt-1 object-cover"
                  src={media}
                />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex mt-2 gap-4 items-center">
        <div className={`flex items-center  rounded-full p-2`}>
          <button className="flex items-center gap-1 hover:text-green-400">
            <TbArrowBigUp size={19} />
          </button>
          <p className=" text-[0.8rem] font-medium px-3">8</p>
          <button className="flex items-center gap-1 hover:text-red-900">
            <TbArrowBigDown size={19} />
          </button>
        </div>
        <button className="flex items-center text-[0.8rem] font-medium gap-2 py-2 rounded-full px-3 ">
          <GoComment size={16} />
          112
        </button>
        <button className="py-2 rounded-full px-3 ">
          <LiaMedalSolid size={19} />
        </button>
        <button className="flex items-center text-[0.8rem]  font-medium gap-2 py-2 rounded-full px-3 ">
          <RiShareForwardLine size={18} />
          Share
        </button>
      </div>
    </div>
  );
}
