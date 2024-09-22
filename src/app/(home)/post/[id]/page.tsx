import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getPostbyId } from "@/app/actions/post/getPostbyId";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { handleLikes } from "@/app/actions/likes";
import { TbArrowBigUp } from "react-icons/tb";
import isLikedbyUser from "@/lib/post/likedByUser";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";

export default async function Page({ params }: { params: { id: string } }) {
  const { post, error } = await getPostbyId(params.id);

  if (post) {
    const isLiked = await isLikedbyUser(post);
    return (
      <>
        <div className="max-w-5xl w-full  border-x border-b  py-2 px-4">
          <div className="flex justify-between">
            <div className="flex gap-2  items-center mt-1">
              <div className="w-6 h-6 rounded-full bg-green-500 "></div>
              <p className="text-muted-foreground text-sm font-bold ">
                {post?.User.name}
              </p>
              <p className="text-sm text-muted-foreground "></p>
            </div>
            <button>
              <BsThreeDots className="font-thin" />
            </button>
          </div>
          <div>
            <h1 className="mt-1 text-xl ">{post?.title}</h1>
            <Carousel className="w-full ">
              <CarouselContent>
                {post?.media &&
                  post?.media.map((media, index) => (
                    <CarouselItem key={index}>
                      <Image
                        alt="hey"
                        key={index}
                        height={600}
                        width={600}
                        className="w-full rounded-xl h-[28rem] mt-1 object-cover"
                        src={media}
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div
              className="prose-sm"
              dangerouslySetInnerHTML={{ __html: post?.body || "" }}
            />
          </div>
          <div className="flex mt-2 gap-4 items-center">
            <div className={`flex items-center rounded-full p-2`}>
              <form
                action={async () => {
                  "use server";
                  await handleLikes(post?.id || "");
                }}
              >
                <button>
                  <TbArrowBigUp
                    className={`flex items-center gap-1 ${
                      isLiked
                        ? "text-green-500 fill-green-500"
                        : "text-gray-500"
                    }`}
                    size={19}
                  />
                </button>
              </form>
              <p className="text-[0.8rem] font-medium px-3">
                {post.likes.length}
              </p>
            </div>
            <button className="flex items-center text-[0.8rem] font-medium gap-2 py-2 rounded-full px-3 ">
              <GoComment size={16} />
              112
            </button>
            <button className="py-2 rounded-full px-3 ">
              <LiaMedalSolid size={19} />
            </button>
            <button className="flex items-center text-[0.8rem] font-medium gap-2 py-2 rounded-full px-3 ">
              <RiShareForwardLine size={18} />
              Share
            </button>
          </div>
          <div className="">
            <form action="">
              <Input placeholder="add your comment" />
            </form>
          </div>
        </div>
      </>
    );
  }

  return <div>{error}</div>;
}
