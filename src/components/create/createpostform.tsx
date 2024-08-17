"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperclipIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "./imageupload";
import { postSchema } from "@/schema/schema";
import { createpost } from "@/app/actions/post";

type postType = z.infer<typeof postSchema>;

function CreatePostForm() {
  const buttons = [
    { id: "text", label: "Text" },
    { id: "link", label: "Link" },
    { id: "poll", label: "Poll" },
  ];
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<postType>({
    resolver: zodResolver(postSchema),
  });
  const [selected, setSelected] = useState(" ");
  const [wordcount, setwordcount] = useState(0);
  const [ShowImageContainer, setShowImageContainer] = useState(false);
  const [ImagesUrl, setImagesUrl] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue("media", ImagesUrl);
  }, [ImagesUrl]);

  const onsubmit = async (postdata: postType) => {
    try {
      await createpost(postdata);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" mx-10 md:mx-0 md:ml-10 lg:w-[45rem] md:w-[43rem]">
      <div className="text-[#b7cad4] flex font-semibold justify-between items-center ">
        <h1 className="text-2xl">Create post</h1>
        <p className="text-sm px-4 py-2 hover:bg-[#333d42] rounded-full">
          Drafts
        </p>
      </div>
      <form
        className="bg-[#333d42] flex mt-6 md:w-80 py-2 px-3 rounded-full items-center gap-2"
        action="submit"
      >
        <Search size={20} className="text-white" />
        <input
          type="text"
          placeholder="Select a community"
          className="bg-[#333d42] outline-none text-white"
        />
      </form>
      <div className="flex text-white mt-10 md:gap-2 text-sm">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => setSelected(button.id)}
            className={`px-4 py-2 hover:bg-[#333d42] hover:rounded-full ${
              selected === button.id
                ? "underline underline-offset-8 decoration-[#648efc]"
                : ""
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="text-white mt-10 relative">
          <textarea
            {...register("title", { required: true })}
            onChange={(e) => setwordcount(e.target.value.length)}
            placeholder="Title*"
            disabled={isSubmitting}
            className={` bg-[#0e1113] border ${
              wordcount > 300
                ? "outline-red-500 "
                : "outline-none hover:border-white"
            }   text-sm py-4 px-4 rounded-2xl w-full border-[#3e4142] custom-scrollbar-global`}
          />
          <div className="flex justify-between items-center px-3">
            {errors.title && (
              <span className="text-xs font-semibold">Title is required</span>
            )}
            <p className="text-[0.7rem]  mt-1">{wordcount}/300</p>
          </div>

          <button
            disabled
            className="text-[#525456] text-[0.8rem] mt-10 px-4 py-2 bg-[#1a1d1f] rounded-full font-semibold"
          >
            Add tags
          </button>
          <div className="flex items-center justify-end px-3">
            <button
              type="button"
              onClick={() => setShowImageContainer(!ShowImageContainer)}
            >
              <PaperclipIcon size={20} />
            </button>
          </div>
          <ImageUpload
            setImagesUrl={setImagesUrl}
            ImagesUrl={ImagesUrl}
            ShowImageContainer={ShowImageContainer}
          />
          <div></div>
          <textarea
            placeholder="Body"
            {...register("body", { required: true })}
            className="bg-[#0e1113] text-white outline-none focus:border-white text-sm px-4 py-4 border w-full rounded-2xl mt-4 min-h-40 border-[#3e4142]"
          ></textarea>
          {errors.body && (
            <span className="text-xs font-semibold">Body is required</span>
          )}
        </div>
        <div
          className={`flex gap-4 text-white mt-2 text-sm font-semibold justify-end`}
        >
          <button
            type="button"
            className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-[#104ca7] py-2 px-4 rounded-full hover:bg-[#1870f4]"
          >
            Post
          </button>
        </div>
      </form>
      <div></div>
    </div>
  );
}

export default CreatePostForm;
