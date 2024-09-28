"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { postSchema } from "@/schema/schema";
import { createpost } from "@/app/actions/post/post";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "@/components/create/editor";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "../ui/select";
import { Session } from "next-auth";
import { toast } from "sonner";
import ImageUpload from "../imageUpload/imageUpload";
import SelectCommunity from "./selectcommunity";

type postType = z.infer<typeof postSchema>;

function CreatePostForm({ user }: { user: Session }) {
  const buttons = [
    { id: "post", label: "Post" },
    { id: "link", label: "Link" },
    { id: "poll", label: "Poll" },
  ];
  const form = useForm<postType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      media: [],
      body: "",
      title: "",
      community: "",
    },
  });
  const [selected, setSelected] = useState(" ");

  const user_name: string = user?.user?.name ?? "defaultUserName";

  const onsubmit = async (postdata: postType) => {
    console.log(postdata);
    // alert("HERLLO");
    toast.promise(createpost(postdata), {
      loading: "Creating Post.",
      success: (e) => {
        return e.error ?? e.message;
      },
      error: (e) => {
        return e.error;
      },
    });
    // form.reset();
  };
  return (
    <div className=" mx-10   lg:w-[45rem] md:w-[43rem]    space-y-4">
      <div className="text-neutral-600 flex font-semibold justify-between items-center ">
        <h1 className="text-2xl">Create post</h1>
        <Button variant={"ghost"} className="text-sm px-4 py-2  rounded-md">
          Drafts
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
          <SelectCommunity form={form} />

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
            <ImageUpload form={form} user_name={user_name} />
          </div>
          <div className="w-full flex justify-end">
            <Button className="" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <span>
                  Posting
                  <LoaderCircle className="animate-spin" />
                </span>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreatePostForm;
