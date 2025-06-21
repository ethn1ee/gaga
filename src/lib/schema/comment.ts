import { z } from "zod";

const commentInput = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
  postId: z.string().min(1, "PostId cannot be empty"),
});

type CommentInput = z.infer<typeof commentInput>;

export { commentInput, type CommentInput };
