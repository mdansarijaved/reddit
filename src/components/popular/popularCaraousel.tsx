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
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getAllPost } from "@/app/actions/post/post";
import { Skeleton } from "../ui/skeleton";
function PopularCaraousel() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPost(),
  });

  return (
    <Suspense fallback={<PopularSkeleton />}>
      <div className="w-full px-10 pt-10 ">
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
    </Suspense>
  );
}

export default PopularCaraousel;

const PopularSkeleton = () => {
  return (
    <div className="w-full px-10 pt-10">
      <Carousel>
        <CarouselContent>
          {[...Array(4)].map((_, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="relative">
                <Skeleton className="w-full h-[300px] rounded-xl" />
                <div className="w-full h-[300px] bg-transparent absolute top-0 left-0 rounded-xl hover:bg-transparent/35 transition-all duration-300">
                  <div className="w-full h-full flex flex-col justify-end items-start p-2 text-white">
                    <Skeleton className="w-full h-6 mb-2" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
