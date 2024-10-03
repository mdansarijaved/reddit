import { handleLikes } from "@/app/actions/likes";
import React from "react";
import { TbArrowBigUp } from "react-icons/tb";

function LikeButton({ isLiked, id }: { isLiked: boolean; id: string }) {
  return (
    <button
      onClick={async () => await handleLikes(id)}
      className="rounded-3xl px-2 py-1 hover:bg-gray-200 w-10"
    >
      <TbArrowBigUp
        className={`flex items-center gap-1 ${
          isLiked ? "text-green-500 fill-green-500" : "text-gray-500"
        }`}
        size={19}
      />
    </button>
  );
}

export default LikeButton;
