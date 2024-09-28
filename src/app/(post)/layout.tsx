import Navbar from "@/components/navbar/navbar";
import RightBar from "@/components/rightsidebar/rightsidebar";
import SideBar from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      {/* <Navbar /> */}
      <div className="relative flex justify-center w-full  min-h-screen  ">
        {/* <SideBar /> */}
        <div className="w-full flex justify-evenly">
          <div className="">{children}</div>
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default PostLayout;
