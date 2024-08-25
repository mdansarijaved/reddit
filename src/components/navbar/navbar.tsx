import {
  Bell,
  Menu,
  MessageCircleMore,
  MousePointerClick,
  Plus,
  Search,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import AuthButton from "./login";

export default function Navbar() {
  return (
    <div className="w-full flex justify-between fixed top-0 left-0 border-b bg-white   border-x border-neutral-300  z-20  py-2  items-center px-6">
      <div className="flex">
        <button className="lg:hidden mr-4">
          <Menu size={24} />
        </button>
        <Link href="/" className="flex gap-2">
          <p className="font-bold text-2xl hidden lg:block  ">Reddit</p>
        </Link>
      </div>
      <form className="lg:flex hidden gap-2 xl:absolute xl:right-1/2 xl:translate-x-1/2  px-3 mx-6 lg:mx-0 rounded-full py-[0.5rem]  items-center  bg-gray-200 w-full lg:w-[30rem]">
        <Search size={20} className="text-neutral-600 font-extralight" />
        <input
          type="text"
          placeholder="Search Reddit"
          className=" text-[0.9rem] border  w-full bg-transparent outline-none border-none"
        />
      </form>
      <div className="flex gap-2 items-center">
        <button className=" px-2 py-2 rounded-full hidden lg:block">
          <MousePointerClick size={20} className="text-neutral-00 font-light" />
        </button>
        <button className=" px-2 py-2 rounded-full">
          <MessageCircleMore
            size={20}
            className="font-light text-neutral-600"
          />
        </button>
        <Link
          href="/createpost"
          className="md:flex gap-2  px-2 py-2 rounded-full justify-center items-center hidden"
        >
          <Plus size={20} className="font-light text-neutral-600" />
          <p>Create</p>
        </Link>
        <button className="  py-2 rounded-full hidden md:block">
          <Bell size={20} className="font-light text-neutral-600" />
        </button>
        <AuthButton />
      </div>
    </div>
  );
}
