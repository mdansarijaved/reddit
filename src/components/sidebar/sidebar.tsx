import { House } from "lucide";
import { HouseIcon } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import Droptdown from "./dropdowm";
import styles from "./dopdown.module.css";

export default function SideBar() {
  const resources = [
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
    {
      icon: <HouseIcon size={20} />,
      title: "about",
    },
  ];
  return (
    <div
      className={`max-h-screen h-screen overflow-y-scroll  max-w-sm w-72 px-7  border-r border-gray-700 ${styles["custom-scrollbar"]}`}
    >
      <div className="text-white py-4  font-semibold  ">
        <p className="flex  items-center gap-5 py-2 rounded-lg ">
          <HouseIcon size={20} /> Home
        </p>
        <p className="flex  items-center gap-5 py-2 rounded-lg ">
          <HouseIcon size={20} /> Home
        </p>
        <p className="flex  items-center gap-5 py-2 rounded-lg ">
          <HouseIcon size={20} /> Home
        </p>
      </div>
      <div className="w-full border border-gray-800"></div>
      <div>
        <Droptdown
          title="custom feed"
          subtitle="create a custom feed"
        ></Droptdown>
      </div>
      <div className="w-full border border-gray-800"></div>
      <div>
        <Droptdown
          title="Communities"
          subtitle="Create a community"
        ></Droptdown>
      </div>
      <div className="w-full border border-gray-800"></div>
      <div>
        <Droptdown title="resources">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center text-gray-200 gap-5 py-2 rounded-lg"
            >
              {resource.icon}
              {resource.title}
            </div>
          ))}
        </Droptdown>
      </div>
    </div>
  );
}
