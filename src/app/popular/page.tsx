import { db } from "@/lib/db";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

async function Popular() {
  const posts = await db.posts.findMany({
    orderBy: {
      likes: {
        _count: "desc", // Sort by the number of likes in descending order
      },
    },
    select: {
      id: true,
      title: true,
      body: true,
      media: true,
      slug: true,
      createdAt: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      Community: {
        select: {
          id: true,
          community_name: true,
          slug: true,
        },
      },
      likes: {
        select: {
          id: true,
          userid: true,
        },
      },
    },
  });
  return (
    <div className="w-full px-10 pt-10 ">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem key={index} className="md:basis-1/3  lg:basis-1/4">
              <div className="p-1">
                <Image
                  src={post.media[0]}
                  alt="image"
                  width={300}
                  height={300}
                  className="w-[300px] object-cover  h-[300px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default Popular;
