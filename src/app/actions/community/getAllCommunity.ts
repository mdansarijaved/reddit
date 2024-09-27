"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const getAllCommunity = async () => {
  const session = await auth();
  if (!session) {
    return;
  }
  const communites = db.community.findMany();
  return communites;
};
