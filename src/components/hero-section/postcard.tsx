import { BsThreeDots } from "react-icons/bs";
import { Dot } from "lucide-react";
import Image from "next/image";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";

import { getUserById } from "@/lib/auth/account/user";
import { Posts, User } from "@prisma/client";
import { PutPublicAccessBlockCommandInput } from "@aws-sdk/client-s3";

export default async function PostCard({
  posts,
}: {
  posts: Posts & { User: User };
}) {
  return (
    <div className=" max-w-5xl w-[35rem] max-h-[35.4rem]  border-x border-gray-800 border-b hover:bg-[#131f23]  py-2 px-4">
      <div className="flex justify-between">
        <div className="flex items-center mt-1">
          <button className="flex items-center text-[0.8rem] text-[#c2dee7] hover:text-[#a7ccff] gap-1"></button>
          <p className="text-[#82959b]">{posts.User.name}</p>
          <p className="text-[0.8rem] text-[#82959b]">8 hr. ago</p>
        </div>
        <button>
          <BsThreeDots />
        </button>
      </div>
      <h1 className="mt-1 text-lg">{posts.title}</h1>
      {posts.media &&
        posts.media.map((media, index) => (
          <Image
            alt="hey"
            key={index}
            height={600}
            width={600}
            className="w-full rounded-xl h-[28rem] mt-1 object-cover"
            src={media}
          />
        ))}
      <div className="flex mt-2 gap-4 items-center">
        <div
          className={`flex items-center hover:bg-[#223237] rounded-full p-2 bg-[#1a282d]`}
        >
          <button className="flex items-center gap-1 hover:text-green-400">
            <TbArrowBigUp size={19} />
          </button>
          <p className=" text-[0.8rem] font-medium px-3">8</p>
          <button className="flex items-center gap-1 hover:text-red-900">
            <TbArrowBigDown size={19} />
          </button>
        </div>
        <button className="flex items-center text-[0.8rem] hover:bg-[#223237] font-medium gap-2 py-2 rounded-full px-3 bg-[#1a282d]">
          <GoComment size={16} />
          112
        </button>
        <button className="py-2 rounded-full px-3 bg-[#1a282d] hover:bg-[#223237]">
          <LiaMedalSolid size={19} />
        </button>
        <button className="flex items-center text-[0.8rem] hover:bg-[#223237] font-medium gap-2 py-2 rounded-full px-3 bg-[#1a282d]">
          <RiShareForwardLine size={18} />
          Share
        </button>
      </div>
    </div>
  );
}
