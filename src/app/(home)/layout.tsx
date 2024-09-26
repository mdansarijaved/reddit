import Navbar from "@/components/navbar/navbar";
import RightBar from "@/components/rightsidebar/rightsidebar";
import SideBar from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="relative flex justify-start w-full  min-h-screen  ">
        <SideBar />
        {children}
        <SideBar />
        <Toaster />
      </div>
    </div>
  );
}

export default HomeLayout;
