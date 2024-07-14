import React from "react";

import { Search } from "lucide-react";

export default function CreatePost() {
  return (
  <>
  <div className="mt-10 ml-10 w-[45rem]">
  <div className="text-[#b7cad4] flex font-semibold justify-between items-center ">
    <h1 className="text-2xl">Create post</h1>
    <p>Drafts</p>
  </div>
  <form className="bg-[#333d42] flex mt-6 w-80 py-2 px-3 rounded-full items-center gap-2" action="submit">
    <Search size={20} className="text-white"/>
    <input type="text" placeholder="Select a community" className="bg-[#333d42] outline-none text-white"/>
  </form>
  <div className="flex text-white mt-10 gap-10 text-sm ml-2">
    <button>Text</button>
    <button>Images & Video</button>
    <button>Link</button>
    <button>Poll</button>
  </div>
  <div className="text-white mt-10 relative">
  <input type="text" placeholder="Title*" className=" bg-[#0e1113] border h-full hover:bg-[#181c1f] hover:border-white text-sm py-4 px-4 rounded-2xl w-full border-[#3e4142]" />
  <p className="text-[0.7rem] absolute right-4 mt-1">0/300</p>
  <p className="text-[0.7rem] absolute left-4 mt-1 text-red-500 hidden">Please fill in this field.</p>
  </div>
  <button disabled className="text-[#525456] text-[0.8rem] mt-10 px-4 py-2 bg-[#1a1d1f] rounded-full font-semibold">
    Add tags
  </button>
  <textarea placeholder="Body" className="bg-[#0e1113] text-sm px-4 py-2 border w-full rounded-2xl mt-4 h-40 border-[#3e4142]">  </textarea>
  <div className="flex gap-7 text-white mt-2 text-sm font-semibold justify-end"> 
    <button className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]">Save Draft</button>
    <button className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]">Post</button>
  </div>


  </div>
  </>
  )
}
