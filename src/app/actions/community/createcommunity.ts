"use server";

import { communitySchema } from "@/schema/schema";
import * as z from "zod";

export const createCommunity = (data: z.infer<typeof communitySchema>) => {
  const validatedata = communitySchema.safeParse(data);
};
