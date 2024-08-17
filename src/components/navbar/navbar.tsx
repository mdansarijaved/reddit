import { FaReddit } from "react-icons/fa6";
import { Search } from "lucide-react";
import { MessageCircleMore } from "lucide-react";
import { Plus } from "lucide-react";
import { MousePointerClick } from "lucide-react";
import { Bell } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
import AuthButton from "./login";

export default function Navbar() {
  return (
    <>
      <div className="bg-[#0e1113] px-3 fixed top-0 left-0 w-full z-30 border-b border-[#3e4142]">
        <div className="w-full flex justify-between relative bg-[#0e1113] text-white h-[3.6rem]  items-center px-1">
          <div className="flex">
            <button className="lg:hidden mr-4">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex gap-2">
              <FaReddit
                className="text-red-600 bg-white rounded-full"
                size={30}
              />
              <p className="font-bold text-2xl hidden lg:block">reddit</p>
            </Link>
          </div>
          <form className="lg:flex hidden gap-2 xl:absolute xl:right-1/2 xl:translate-x-1/2 bg-[#333d42] px-3 mx-6 lg:mx-0 rounded-full py-[0.5rem] items-center w-full lg:w-[30rem]">
            <Search size={24} />
            <input
              type="text"
              placeholder="Search Reddit"
              className="bg-[#333d42] text-[0.9rem] w-full outline-none mr-10"
            />
          </form>
          <div className="flex gap-2 items-center">
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full hidden lg:block">
              <MousePointerClick />
            </button>
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full">
              <MessageCircleMore />
            </button>
            <Link
              href="/createpost"
              className="md:flex gap-2 hover:bg-[#333d42] px-2 py-2 rounded-full justify-center items-center hidden"
            >
              <Plus />
              <p>Create</p>
            </Link>
            <button className="hover:bg-[#333d42] px-2 py-2 rounded-full hidden md:block">
              <Bell />
            </button>
            <div className=" rounded-full hidden lg:flex">
              <AuthButton />
            </div>
            <div className="w-8 h-8 rounded-full bg-red-900 lg:hidden"></div>
          </div>
        </div>
      </div>
    </>
  );
}
