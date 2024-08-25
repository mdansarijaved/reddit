"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ImageUpload from "./imageupload";
import { postSchema } from "@/schema/schema";
import { createpost } from "@/app/actions/post";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import Tiptap from "./editor";
import { Button } from "../ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "../ui/select";

type postType = z.infer<typeof postSchema>;

function CreatePostForm() {
  const buttons = [
    { id: "post", label: "Post" },
    { id: "link", label: "Link" },
    { id: "poll", label: "Poll" },
  ];
  const form = useForm<postType>({
    resolver: zodResolver(postSchema),
  });
  const [selected, setSelected] = useState(" ");
  const [ImagesUrl, setImagesUrl] = useState<string[]>([]);

  useEffect(() => {
    form.setValue("media", ImagesUrl);
  }, [ImagesUrl]);

  const onsubmit = async (postdata: postType) => {
    try {
      await createpost(postdata);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" mx-10 md:mx-0 md:ml-10 lg:w-[45rem] md:w-[43rem] space-y-4">
      <div className="text-neutral-600 flex font-semibold justify-between items-center ">
        <h1 className="text-2xl">Create post</h1>
        <Button variant={"ghost"} className="text-sm px-4 py-2  rounded-md">
          Drafts
        </Button>
      </div>
      <Select>
        <SelectTrigger className="w-52 px-1 focus:ring-0">
          <SelectValue placeholder="Select a commmunity" className="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>communities</SelectLabel>
            <SelectItem value="node">r/node</SelectItem>
            <SelectItem value="noded">r/node</SelectItem>
            <SelectItem value="nodes">r/node</SelectItem>
            <SelectItem value="nodeq">r/node</SelectItem>
            <SelectItem value="nodec">r/node</SelectItem>
            <SelectItem value="nodeq">r/node</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex mt-5 justify-start  md:gap-2 text-sm">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => setSelected(button.id)}
            className={` w-20 text-start py-2   ${
              selected === button.id
                ? "underline underline-offset-8 decoration-[#648efc]"
                : ""
            } ${button.label === "Link" ? "text-muted-foreground" : ""}`}
          >
            {button.label}
          </button>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="bg-transparent border border-neutral-300 focus-visible:ring-0 focus:outline-none  "
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Tiptap body={field.name} onChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="" variant={"outline"}>
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePostForm;

{
  /**

    
     
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

          <div className="border rounded-xl overflow-hidden flex flex-col gap-2 border-gray-700 mt-5">
            <textarea
              placeholder="Body"
              {...register("body", { required: true })}
              className="bg-[#0e1113] outline-none focus:outline-none focus:border-none border-none text-white text-sm px-4 py-4 border w-full min-h-40 "
            ></textarea>
            <ImageUpload setImagesUrl={setImagesUrl} ImagesUrl={ImagesUrl} />
          </div>
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
  
  */
}
