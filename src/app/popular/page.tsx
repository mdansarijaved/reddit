import { db } from "@/lib/db";
import React from "react";

import { getAllPost } from "../actions/post/post";

import PopularCaraousel from "@/components/popular/popularCaraousel";

async function Popular() {
  const posts = await getAllPost();
  return (
    <div>
      <PopularCaraousel />
    </div>
  );
}

export default Popular;
