"use client";
import { getCommunitybySlug } from "@/app/actions/community/getAllCommunity";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Suspense } from "react";
import { Button } from "../ui/button";

function RightBar() {
  const params = useParams<{ slug: string }>();
  const community = useQuery({
    queryKey: ["community", params.slug],
    queryFn: async () => await getCommunitybySlug(params.slug),
  });

  return (
    <div className="max-w-xs rounded-xl sticky min-h-56 top-20 right-10 w-full h-fit border shadow-lg overflow-hidden">
      {community.isPending ? (
        <div className="w-full h-full flex justify-center items-center">
          <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
        </div>
      ) : (
        <div>
          <div className="relative">
            <Image
              src={community.data?.banner ? community.data.banner : ""}
              alt="image"
              width={500}
              height={300}
              className="w-full h-[100px] object-cover"
            />
            <div className="p-1 rounded-full absolute -bottom-8 left-8 bg-white">
              <Image
                src={community.data?.icon ? community.data.icon : ""}
                alt="image"
                width={500}
                height={300}
                className="w-16 h-16 rounded-full  "
              />
            </div>
          </div>
          <div className="pt-8 pb-3 space-y-3 px-3 text-xs">
            <p className="text-base font-bold">
              {community.data?.community_name}{" "}
            </p>
            <p className=" text-muted-foreground line-clamp-3">
              {community.data?.description}
            </p>
            <div className="text-center flex justify-start items-center gap-2 pt-2">
              <p className="">{community.data?.user._count.Members}</p>
              <span>Members</span>
            </div>
            <div className="text-xs">
              <p className="font-semibold">Rules and Guidlines</p>
              <span className="text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti omnis at aliquid atque! Esse temporibus quidem itaque,
                similique error assumenda hic asperiores. Aperiam dolor vero,
                est repellat tenetur voluptatem corporis.
              </span>
            </div>
            <div className="w-full flex justify-end items-center">
              <Button className="rounded-2xl px-6 bg-red-600">Join</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RightBar;
