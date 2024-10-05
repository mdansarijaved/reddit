"use client";
import React, { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { PostHeading } from "@/components/post/PostHeading";
import PostBody from "@/components/post/body";

import { post } from "@/types/post";
function PopularCaraousel({ posts }: { posts: post[] }) {
  return (
    <div className="w-full  ">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent className="">
          {posts.map(
            (post, index) =>
              post.media.length > 0 && (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/2 md:basis-1/3  lg:basis-1/4 "
                >
                  <div className="relative">
                    <Image
                      src={post.media[0]}
                      alt="image"
                      width={300}
                      height={300}
                      className="w-full object-cover  h-[300px] rounded-xl "
                    />
                    <div className="w-full h-[300px] bg-transparent absolute top-0 left-0 rounded-xl hover:bg-transparent/35 transition-all duration-300">
                      <div className="w-full h-full flex flex-col justify-end items-start p-2 text-white">
                        <PostHeading
                          posts={post}
                          variant="popular"
                          className="text-white"
                        />
                        <Link href={`/post/${post.slug}`} className=" w-full">
                          <p className="text-lg font-semibold line-clamp-1">
                            {post.title}
                          </p>
                          <PostBody
                            body={post.body}
                            className="text-white text-sm line-clamp-1"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default PopularCaraousel;
