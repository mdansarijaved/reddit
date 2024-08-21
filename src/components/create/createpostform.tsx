"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "./imageupload";
import { postSchema } from "@/schema/schema";
import { createpost } from "@/app/actions/post";
import ReactQuill from "react-quill";

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
  const [ImagesUrl, setImagesUrl] = useState<string[]>([]);
  const [content, setContent] = useState("sadfasdfasd");

  const handleContentChange = (value: any) => {
    console.log(value);
    setContent(value);
  };

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
            } ${button.label === "Link" ? "text-muted-foreground" : ""}`}
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
              wordcount > 300 ? "outline-red-500 " : "outline-none "
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
          <ReactQuill
            value={content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
            ]}
            className="bg-white text-black"
          />
          {/* <div className="border rounded-xl overflow-hidden flex flex-col gap-2 border-gray-700 mt-5">

            <textarea
              placeholder="Body"
              {...register("body", { required: true })}
              className="bg-[#0e1113] outline-none focus:outline-none focus:border-none border-none text-white text-sm px-4 py-4 border w-full min-h-40 "
            ></textarea>
            <ImageUpload setImagesUrl={setImagesUrl} ImagesUrl={ImagesUrl} />
          </div> */}
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
