"use client";
import { RiImageCircleLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { Dot } from "lucide-react";
import Image from "next/image";
import { TbArrowBigUp, TbArrowBigDown } from "react-icons/tb";
import { useEffect, useState } from "react";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import { Posts } from "@/types/types";

export default function Hero({ posts }: { posts: Posts[] }) {
  const [votes, setVotes] = useState(0);
  const [lastAction, setLastAction] = useState("none");

  const increaseVote = () => {
    if (lastAction === "increased") {
      setVotes((prevVotes) => prevVotes - 1);
      setLastAction("none");
    } else {
      setVotes((prevVotes) =>
        lastAction === "decreased" ? prevVotes + 2 : prevVotes + 1
      );
      setLastAction("increased");
    }
  };

  const decreaseVote = () => {
    if (lastAction === "decreased") {
      setVotes((prevVotes) => prevVotes + 1);
      setLastAction("none");
    } else {
      setVotes((prevVotes) =>
        lastAction === "increased" ? prevVotes - 2 : prevVotes - 1
      );
      setLastAction("decreased");
    }
  };

  const backgroundColor =
    lastAction === "increased"
      ? "green"
      : lastAction === "decreased"
      ? "red"
      : "#1a282d";

  return (
    <section>
      {posts.map((post) => (
        <div className="text-white w-full max-h-[35.4rem] rounded-3xl hover:bg-[#131f23] mt-2 px-4">
          <div className="flex justify-between">
            <div className="flex items-center mt-1">
              <button className="flex items-center text-[0.8rem] text-[#c2dee7] hover:text-[#a7ccff] gap-1">
                <Image
                  alt="hey"
                  className="rounded-full"
                  src=""
                  height={25}
                  width={25}
                />
                r/darksouls3
              </button>
              <p className="text-[#82959b]">
                <Dot />
              </p>
              <p className="text-[0.8rem] text-[#82959b]">8 hr. ago</p>
            </div>
            <button>
              <BsThreeDots />
            </button>
          </div>
          <h1 className="mt-1 text-lg">What is this magic spell?</h1>
          <Image
            alt="hey"
            height={600}
            width={600}
            className="w-full rounded-xl h-[28rem] mt-1 object-cover"
            src=""
          />
          <div className="flex mt-2 gap-4 items-center">
            <div
              style={{ backgroundColor }}
              className={`flex items-center hover:bg-[#223237] rounded-full p-2 bg-[#1a282d]`}
            >
              <button
                onClick={increaseVote}
                className="flex items-center gap-1 hover:text-green-400"
              >
                <TbArrowBigUp size={19} />
              </button>
              <p className=" text-[0.8rem] font-medium px-3">{votes}</p>
              <button
                onClick={decreaseVote}
                className="flex items-center gap-1 hover:text-red-900"
              >
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
      ))}
    </section>
  );
}
