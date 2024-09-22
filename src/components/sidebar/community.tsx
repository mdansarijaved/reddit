"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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

const communitySchema = z.object({
  community_name: z
    .string()
    .min(1, {
      message: "name is required",
    })
    .max(30),
  icon: z.instanceof(File).optional(),
  banner: z.instanceof(File).optional(),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
  mature: z.boolean().default(false),
  description: z
    .string()
    .min(5, {
      message: "description is required",
    })
    .max(300),
  AdminId: z.string().min(1),
});

type CommunityType = z.infer<typeof communitySchema>;

function Communities() {
  const form = useForm<CommunityType>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      community_name: "",
      mature: false,
      topics: [""],
      description: "",
      AdminId: "default-admin-id",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "topics" as never,
  });

  const [newTopic, setNewTopic] = useState("");

  const onSubmit = (data: CommunityType) => {
    console.log("Form submitted:", data);
  };

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      console.log(newTopic.trim());
      append(newTopic.trim());
      setNewTopic("");
    }
  };

  return (
    <>
      <AccordionItem value="Communities">
        <AccordionTrigger className="uppercase">Communities</AccordionTrigger>
        <AccordionContent className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-3">
                <PlusIcon size={16} /> Add Communities
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Create your own community</DialogTitle>
              </DialogHeader>
              <div className="w-full rounded-xl ">
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  field.onChange(file);
                                }}
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
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  field.onChange(file);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="topics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Topics</FormLabel>
                          <FormControl>
                            <div className="flex flex-col space-y-2">
                              <div className="flex space-x-2">
                                <Input
                                  type="text"
                                  value={newTopic}
                                  onChange={(e) => setNewTopic(e.target.value)}
                                  placeholder="Add a topic"
                                />
                                <Button type="button" onClick={handleAddTopic}>
                                  Add
                                </Button>
                              </div>
                              <div>
                                {fields.map((field) => (
                                  <span key={field.id}>{field}</span>
                                ))}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}

export default Communities;
