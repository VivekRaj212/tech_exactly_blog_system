import { z } from "zod";

export const createCommentSchema = z.object({
  body: z.object({
    postId: z.string().min(1, "Post ID is required"),
    content: z.string().min(2, "Comment cannot be empty"),
  }),
});

export const updateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(2, "Comment cannot be empty"),
  }),
});
