import React from "react";
import PopularSection from "@/components/popular/PopularSection";
import { auth } from "@/auth";

async function Popular() {
  const user = await auth();
  if (!user) {
    return;
  }
  return (
    <div>
      <PopularSection user={user} />
    </div>
  );
}

export default Popular;
