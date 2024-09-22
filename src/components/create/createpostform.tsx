"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useController, useForm } from "react-hook-form";
import * as z from "zod";
import { postSchema } from "@/schema/schema";
import { createpost } from "@/app/actions/post/post";
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
import onUpload from "@/lib/image-upload";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type postType = z.infer<typeof postSchema>;

function CreatePostForm() {
  const buttons = [
    { id: "post", label: "Post" },
    { id: "link", label: "Link" },
    { id: "poll", label: "Poll" },
  ];
  const form = useForm<postType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      media: [],
    },
  });
  const [selected, setSelected] = useState(" ");
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { field: mediaField } = useController({
    name: "media",
    control: form.control,
  });

  const handleFileUpload = useCallback(
    async (files: FileList) => {
      setIsUploading(true);
      try {
        const uploadPromises = Array.from(files).map((file) => onUpload(file));
        const uploadedUrls = await Promise.all(uploadPromises);
        mediaField.onChange([...mediaField.value, ...uploadedUrls]);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      }
    },
    [mediaField]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files);
      }
    },
    [handleFileUpload]
  );
  const { toast } = useToast();
  const onsubmit = async (postdata: postType) => {
    try {
      const file = postdata.media[0];
      console.log(file);
      const message = await createpost(postdata);
      toast({
        title: message.message,
      });
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
            <FormField
              control={form.control}
              name="media"
              render={() => (
                <FormItem>
                  <FormLabel>Media</FormLabel>
                  <FormControl>
                    <div
                      className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                        isDragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                      onDragEnter={handleDragIn}
                      onDragLeave={handleDragOut}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />

                      <label
                        htmlFor="file-upload"
                        className={`cursor-pointer ${
                          isUploading ? "" : "hidden"
                        } `}
                      >
                        Uploading
                      </label>
                      <label
                        htmlFor="file-upload"
                        className={`cursor-pointer ${
                          isUploading ? "hidden" : ""
                        } `}
                      >
                        {isDragging
                          ? "Drop the files here"
                          : "Drag & Drop files here or click to select"}
                      </label>
                    </div>
                  </FormControl>
                  {mediaField.value.length > 0 && (
                    <div>
                      Uploaded files:
                      <ul className="flex justify-start items-center border p-2 rounded-md gap-4">
                        {mediaField.value.map((url, index) => (
                          <Link href={url} target="_blank" key={url}>
                            <Image
                              src={url}
                              width={100}
                              height={100}
                              className="rounded-md object-center object-cover w-[100px] h-[100px]"
                              alt="uploaded-image"
                            />
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
                </FormItem>
              )}
            />
          </div>
          <Button
            className=""
            disabled={form.formState.isSubmitting}
            variant={"outline"}
          >
            {form.formState.isSubmitting ? (
              <span>
                Posting
                <LoaderCircle className="animate-spin" />
              </span>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePostForm;
