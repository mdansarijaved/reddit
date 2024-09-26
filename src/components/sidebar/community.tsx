"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm, useFieldArray, useController } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { PlusIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { communitySchema } from "@/schema/schema";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import onUpload from "@/lib/image-upload";
import Image from "next/image";

type CommunityType = z.infer<typeof communitySchema>;

function Communities({ user }: { user: Session | null }) {
  if (!user?.user) {
    redirect("/auth/login");
  }
  const user_name = user.user.name;
  const [preview, setPreview] = useState(false);

  const form = useForm<CommunityType>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      banner: "",
      icon: "",
      community_name: "",
      mature: false,
      description: "",
      AdminId: user.user.id,
    },
  });
  const [isUploading, setIsUploading] = useState(false);
  const { field: iconField } = useController({
    name: "icon",
    control: form.control,
  });
  const { field: bannerfield } = useController({
    name: "banner",
    control: form.control,
  });
  const iconUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setIsUploading(true);
      try {
        const uploadPromises = Array.from(files).map((file) =>
          onUpload(file, form.getValues("community_name"), user_name || "")
        );
        const uploadedUrls = await Promise.all(uploadPromises);
        // Assuming you only want the first uploaded URL
        iconField.onChange(uploadedUrls[0]);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      }
    }
  };

  const bannerupload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setIsUploading(true);
    if (files && files.length > 0) {
      try {
        const uploadPromises = Array.from(files).map((file) =>
          onUpload(file, form.getValues("community_name"), user_name || "")
        );
        const uploadedUrls = await Promise.all(uploadPromises);
        bannerfield.onChange(uploadedUrls[0]);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      }
    }
  };
  const onSubmit = (data: CommunityType) => {
    console.log("Form submitted:", data);
    form.reset();
  };

  return (
    <>
      <AccordionItem value="Communities">
        <AccordionTrigger className="uppercase">Communities</AccordionTrigger>
        <AccordionContent className="">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex w-full items-center gap-3">
                <PlusIcon size={16} /> Add Communities
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create your own community</DialogTitle>
              </DialogHeader>
              <div
                className={`w-full rounded-xl ${preview ? "hidden" : "block"}`}
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="community_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="community name"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4 justify-center">
                      <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Icon</FormLabel>
                            <FormControl>
                              <Input type="file" onChange={iconUpload} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="banner"
                        render={({ field }) => (
                          <FormItem className="w-1/2">
                            <FormLabel>Banner</FormLabel>
                            <FormControl>
                              <Input type="file" onChange={bannerupload} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="community description"
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between items-end">
                      <FormField
                        control={form.control}
                        name="mature"
                        render={({ field }) => (
                          <FormItem className="flex justify-center items-center gap-4 border rounded-lg p-2">
                            <div>
                              <FormLabel>Mature</FormLabel>
                              <FormDescription>
                                Content for adults only
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          disabled={isUploading}
                          onClick={() => setPreview(true)}
                        >
                          Preview
                        </Button>
                        <Button disabled={isUploading} type="submit">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
              <div className={` ${preview ? "block" : "hidden"}`}>
                <div className="border p-3 space-y-2">
                  <Image
                    src={form.watch("banner")}
                    width={700}
                    height={100}
                    alt="image"
                    className="w-[700px] h-[50px]"
                  />
                  <div className="flex justify-start items-start gap-4 ">
                    <Image
                      src={form.watch("icon")}
                      alt="icon"
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] rounded-full  "
                    />
                    <div className="space-y-3 ">
                      <p className="font-bold">
                        r/{form.watch("community_name")}
                      </p>
                      <p className="line-clamp-2 text-sm">
                        {form.watch("description")}
                      </p>
                      <p className="space-x-2 text-muted-foreground text-sm">
                        <span>1 member</span>
                        <span>1 online</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 w-full">
                    <Button type="button" onClick={() => setPreview(false)}>
                      back
                    </Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default Communities;
