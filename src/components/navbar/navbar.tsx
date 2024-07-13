"use client";

import { FaReddit } from "react-icons/fa6";
import { Search } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Plus } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import { Bell } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#0e1113] px-4">
        <div className="w-full flex justify-between relative bg-[#0e1113] text-white h-16 border-b border-[#3e4142] items-center px-1">
          <div className="flex gap-2">
            <button className="lg:hidden mr-2">
              <Menu size={24} />
            </button>
            <FaReddit className="text-red-600" size={30} />
            <p className="font-bold text-2xl hidden lg:block">reddit</p>
          </div>
          <form
            onClick={(e) => {
              e.preventDefault();
            }}
            className="sm:flex hidden gap-2 xl:absolute xl:right-1/2 xl:translate-x-1/2 bg-[#333d42] px-3 mx-6 lg:mx-0 rounded-full py-[0.7rem] items-center w-full lg:w-[30rem]"
          >
            <Search size={24} />
            <input
              type="text"
              placeholder="Search Reddit"
              className="bg-[#333d42] text-md w-full outline-none placeholder:text-md mr-10"
            />
          </form>
          <div className="flex gap-2">
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full hidden lg:block">
              <MousePointerClick />
            </button>
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full">
              <MessageCircleMore />
            </button>
            <button className="md:flex gap-2 hover:bg-[#333d42] px-2 py-2 rounded-full hidden">
              <Plus />
              <p>Create</p>
            </button>
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full hidden md:block">
              <Bell />
            </button>
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full">
              <CircleUserRound />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
