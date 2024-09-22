import * as z from "zod";

export const singInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Invalid password",
  }),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(1, {
    message: "Invalid password",
  }),
});

export const postSchema = z.object({
  title: z.string().min(1).max(300),
  body: z.string().min(1),
  media: z.string().array(),
});
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];
export const communitySchema = z.object({
  community_name: z
    .string()
    .min(1, {
      message: "name is required",
    })
    .max(30),
  icon: z.instanceof(File).optional(),
  banner: z.instanceof(File).optional(),
  topics: z.array(z.string()).min(1, "Atleast one tag required"),
  mature: z.boolean().default(false),
  description: z
    .string()
    .min(5, {
      message: "description is requred",
    })
    .max(300),
  AdminId: z.string().min(1),
});
