import React, { ReactNode } from "react";

function CommunityLayout({ children }: { children: ReactNode }) {
  return <div className="relative  w-full  min-h-screen  ">{children}</div>;
}

export default CommunityLayout;
