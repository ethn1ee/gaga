import { z } from "zod";

const commentInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  postId: z.string().optional(),
  parentId: z.string().optional(),
});

type CommentInput = z.infer<typeof commentInput>;

// Used for creating a comment on a post
const commentOnPostInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  postId: z.string().min(1, "PostId cannot be empty"),
});

type CommentOnPostInput = z.infer<typeof commentOnPostInput>;

// Used for creating a child comment on a post
const commentOnParentInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  parentId: z.string().min(1, "PostId cannot be empty"),
});

type CommentOnParentInput = z.infer<typeof commentOnParentInput>;

export {
  commentInput,
  commentOnParentInput,
  commentOnPostInput,
  type CommentInput,
  type CommentOnParentInput,
  type CommentOnPostInput,
};
