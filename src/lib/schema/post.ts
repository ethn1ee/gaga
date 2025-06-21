import { Prisma } from "@prisma/client";
import { z } from "zod";

const postInput = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  content: z.string().min(1, "Comment cannot be empty"),
  category: z.string().min(1, "Category cannot be empty"),
  authorId: z.string().min(1, "AuthorId cannot be empty"),
});

type PostInput = z.infer<typeof postInput>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postWithComments = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { comments: true },
});
type PostWithComments = Prisma.PostGetPayload<typeof postWithComments>;

export { postInput, type PostInput, type PostWithComments };
