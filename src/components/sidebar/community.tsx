"use client";
import React, { ChangeEvent, useRef, useState } from "react";
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
import { createCommunity } from "@/app/actions/community/createcommunity";
import { Community } from "@prisma/client";
import Link from "next/link";

type CommunityType = z.infer<typeof communitySchema>;

function Communities({
  user,
  communities,
}: {
  user: Session | null;
  communities: Community[];
}) {
  if (!user?.user) {
    return;
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user_name = user.user.name;
  const [preview, setPreview] = useState(false);
  const iconRef = useRef<React.ElementRef<typeof Input>>(null);
  const bannerRef = useRef<React.ElementRef<typeof Input>>(null);

  const form = useForm<CommunityType>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      banner: "",
      icon: "",
      community_name: "",
      mature: false,
      description: "",
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
        const uploadPromises = await onUpload(
          files[0],
          form.getValues("community_name"),
          user_name || ""
        );
        const uploadedUrls = await uploadPromises;
        iconField.onChange(uploadedUrls);
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
        const uploadPromises = await onUpload(
          files[0],
          form.getValues("community_name"),
          user_name || ""
        );
        const uploadedUrls = await uploadPromises;
        bannerfield.onChange(uploadedUrls);
        setIsUploading(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsUploading(false);
      }
    }
  };
  const onSubmit = async (data: CommunityType) => {
    console.log("Form submitted:", data);
    await createCommunity(data);
    if (bannerRef.current) {
      bannerRef.current.value = "";
    }
    if (iconRef.current) {
      iconRef.current.value = "";
    }
    form.reset();
    setIsDialogOpen(false);
  };

  return (
    <>
      <AccordionItem value="Communities">
        <AccordionTrigger className="uppercase">Communities</AccordionTrigger>
        <AccordionContent className="">
          <Dialog
            open={isDialogOpen}
            onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
          >
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
                              <Input
                                type="file"
                                ref={iconRef}
                                onChange={iconUpload}
                              />
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
                              <Input
                                type="file"
                                ref={bannerRef}
                                onChange={bannerupload}
                              />
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
          <div className="space-y-3 pt-3">
            {communities.map((community, index) => (
              <Link
                href={`/community/${community.slug}`}
                key={community.slug}
                className="flex justify-start items-center gap-3 "
              >
                <Image
                  src={community.icon}
                  alt="community icon"
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 "
                />
                <p className="font-semibold text-xs">
                  r/{community.community_name}
                </p>
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default Communities;
