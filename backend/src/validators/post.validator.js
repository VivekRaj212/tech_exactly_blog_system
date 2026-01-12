import { z } from "zod";

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
  }),
});
