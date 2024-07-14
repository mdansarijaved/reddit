"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useMediaQuery } from "react-responsive";

export default function CreatePost() {

  const [selected, setSelected] = useState(' ');

  const isMobile = useMediaQuery({maxWidth: 768});

  const buttons = [
    {id: "text", label: "Text"},
    {id: "image", label: isMobile ? "Media" : "Images & Video"},
    {id: "link", label: "Link"},
    {id: "poll", label: "Poll"}
  ]

  return (
  <>
  <div className="mt-10 mx-10 md:mx-0 md:ml-10 lg:w-[45rem] md:w-[43rem]">
  <div className="text-[#b7cad4] flex font-semibold justify-between items-center ">
    <h1 className="text-2xl">Create post</h1>
    <p className="text-sm">Drafts</p>
  </div>
  <form className="bg-[#333d42] flex mt-6 md:w-80 py-2 px-3 rounded-full items-center gap-2" action="submit">
    <Search size={20} className="text-white"/>
    <input type="text" placeholder="Select a community" className="bg-[#333d42] outline-none text-white"/>
  </form>
  <div className="flex text-white mt-10 md:gap-2 text-sm">
  {buttons.map((button) => (
    <button key={button.id} onClick={() => setSelected(button.id)} className={`px-4 py-2 hover:bg-[#333d42] hover:rounded-full ${selected === button.id ? "underline underline-offset-8 decoration-[#648efc]" : ""}`}>{button.label}</button>
  ))}
</div>
  <div className="text-white mt-10 relative">
  <input type="text" placeholder="Title*" className=" bg-[#0e1113] border hover:bg-[#181c1f] hover:border-white text-sm py-4 px-4 rounded-2xl w-full border-[#3e4142]" />
  <p className="text-[0.7rem] absolute right-4 mt-1">0/300</p>
  <p className="text-[0.7rem] absolute left-4 mt-1 text-red-500 hidden">Please fill in this field.</p>
  </div>
  <button disabled className="text-[#525456] text-[0.8rem] mt-10 px-4 py-2 bg-[#1a1d1f] rounded-full font-semibold">
    Add tags
  </button>
  <textarea placeholder="Body" className="bg-[#0e1113] text-white outline-none focus:border-white text-sm px-4 py-2 border w-full rounded-2xl mt-4 min-h-40 border-[#3e4142]">  </textarea>
  <div className="flex gap-4 text-white mt-2 text-sm font-semibold justify-end"> 
    <button className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]">Save Draft</button>
    <button className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]">Post</button>
  </div>


  </div>
  </>
  )
}
