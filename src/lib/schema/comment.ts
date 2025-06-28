import { z } from "zod";

const commentInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  postId: z.string().optional(),
  parentId: z.string().optional(),
});

type CommentInput = z.infer<typeof commentInput>;

const commentOnPostInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  postId: z.string().min(1, "PostId cannot be empty"),
});

const commentOnParentInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  parentId: z.string().min(1, "ParentId cannot be empty"),
});

export {
  commentInput,
  commentOnParentInput,
  commentOnPostInput,
  type CommentInput,
};
