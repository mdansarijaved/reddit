import { cn } from "@/lib/utils";
import React from "react";

function PostBody({ body, className }: { body: string; className?: string }) {
  return (
    <div
      className={cn("w-full line-clamp-3 text-muted-foreground", className)}
      dangerouslySetInnerHTML={{ __html: body || "" }}
    ></div>
  );
}

export default PostBody;
