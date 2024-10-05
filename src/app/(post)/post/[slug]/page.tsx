import { getPostbySlug } from "@/app/actions/post/getPostbyId";
import { BsThreeDots } from "react-icons/bs";
import { GoComment } from "react-icons/go";
import { LiaMedalSolid } from "react-icons/lia";
import { RiShareForwardLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import ImageCarousel from "@/components/post/ImageCarousel";
import LikeButton from "@/components/post/LikeButton";
import { post } from "@/types/post";

export default async function Page({ params }: { params: { slug: string } }) {
  const { post, error } = await getPostbySlug(params.slug);
  const isLiked = true;
  if (!post) {
    return <div>{error}</div>;
  }
  return (
    <div className="max-w-xl w-full  border-x border-b   px-4">
      <div className="flex justify-between">
        <div className="flex gap-2  items-center mt-1">
          <div className="w-6 h-6 rounded-full bg-green-500 "></div>
          <p className="text-muted-foreground text-sm font-bold ">
            {post.User.name}
          </p>
          <p className="text-sm text-muted-foreground "></p>
        </div>
        <button>
          <BsThreeDots className="font-thin" />
        </button>
      </div>
      <div>
        <h1 className="mt-1 text-xl ">{post.title}</h1>
        {post.media.length > 0 ? <ImageCarousel media={post.media} /> : null}
        <div
          className="prose-sm"
          dangerouslySetInnerHTML={{ __html: post?.body || "" }}
        />
      </div>
      <div className="flex mt-2 gap-4 items-center">
        <div className={`flex items-center rounded-full p-2`}>
          <LikeButton post={post} isLiked={isLiked} />
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
  );
}
