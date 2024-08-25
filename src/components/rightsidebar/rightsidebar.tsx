import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HouseIcon } from "lucide-react";
import React from "react";

export default function RightBar() {
  return (
    <div>
      <ScrollArea
        className={`h-full overflow-y-scroll fixed max-h-screen top-0 right-0  z-10
           lg:block  w-[350px] px-7  border-x border-gray-700  `}
      ></ScrollArea>
    </div>
  );
}

/**
 * 
 * <div className="w-full flex justify-between relative  text-white h-[3.6rem]  items-center px-1">
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
            <div className=" rounded-full hidden lg:flex"></div>
            <div className="w-8 h-8 rounded-full bg-red-900 lg:hidden"></div>
          </div>
        </div>
 */
