import Navbar from "@/components/navbar/navbar";
import RightBar from "@/components/rightsidebar/rightsidebar";
import SideBar from "@/components/sidebar/sidebar";
import React, { ReactNode } from "react";

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <SideBar />
      <div className="relative w-full max-w-5xl  p-16   ">{children}</div>
    </div>
  );
}

export default HomeLayout;
