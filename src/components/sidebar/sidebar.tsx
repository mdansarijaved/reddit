import { House } from "lucide";
import { HouseIcon } from "lucide-react";
import React from "react";

export default function SideBar() {
  return (
    <div className="max-h-screen h-screen bg-[#0e1113] max-w-sm w-60 px-7">
      <div className="text-white py-4 text-center font-semibold ">
        <p className="flex justify-center items-center gap-5">
          <HouseIcon size={20} /> Home
        </p>
      </div>
    </div>
  );
}
