"use client";
import onUpload from "@/lib/image-upload";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useController, UseFormReturn } from "react-hook-form";

function ImageUpload({
  form,
  user_name,
}: {
  form: UseFormReturn<
    {
      title: string;
      body: string;
      media: string[];
    },
    any,
    undefined
  >;
  user_name: string;
}) {
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
        const uploadPromises = Array.from(files).map((file) =>
          onUpload(file, "something", user_name)
        );
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
  return (
    <FormField
      control={form.control}
      name="media"
      render={() => (
        <FormItem>
          <FormLabel>Media</FormLabel>
          <FormControl>
            <div
              className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
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
                className={`cursor-pointer ${isUploading ? "" : "hidden"} `}
              >
                Uploading
              </label>
              <label
                htmlFor="file-upload"
                className={`cursor-pointer ${isUploading ? "hidden" : ""} `}
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
  );
}

export default ImageUpload;
