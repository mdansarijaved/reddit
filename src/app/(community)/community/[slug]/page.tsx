import { getCommunitybySlug } from "@/app/actions/community/getAllCommunity";
import { auth } from "@/auth";
import PostCard from "@/components/hero-section/postcard";
import RightBar from "@/components/post/rightbar";
import Image from "next/image";
import React from "react";

async function Community({ params }: { params: { slug: string } }) {
  const community = await getCommunitybySlug(params.slug);
  const user = await auth();

  if (!community) {
    return <div>Nothing here.</div>;
  }
  return (
    <div className="pt-2 px-20">
      <div className="w-full h-52   ">
        <div className="relative h-fit w-full">
          <Image
            src={community.banner}
            alt="banner"
            width={1440}
            height={1000}
            className="w-full h-40 rounded-xl object-cover"
          />
          <div className="w-fit h-fit rounded-full p-1 bg-white absolute -bottom-12 left-12">
            <Image
              src={community.icon}
              alt="icon"
              width={1440}
              height={1000}
              className="w-24 h-24 rounded-full overflow-hidden "
            />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-evenly items-start ">
        <div>
          <PostCard posts={community.posts} user={user} />
        </div>
        <RightBar />
      </div>
    </div>
  );
}

export default Community;
