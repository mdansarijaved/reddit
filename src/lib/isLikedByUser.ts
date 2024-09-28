import { auth } from "@/auth";
import { post } from "@/types/post";
import { Session } from "next-auth";

const isLikedbyUser = async (post: post) => {
  const user = await auth();
  const isLiked = post?.likes.some((like) => like.userid === user?.user.id);
  return isLiked;
};

export default isLikedbyUser;
