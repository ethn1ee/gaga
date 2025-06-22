import { Prisma } from "@prisma/client";
import { z } from "zod";

const postInput = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  attachments: z.array(z.string()).max(5, "Maximum 5 attachments are allowed"),
  authorId: z.string().min(1, "Author ID cannot be empty"),
});

type PostInput = z.infer<typeof postInput>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postWithComments = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { comments: true },
});
type PostWithComments = Prisma.PostGetPayload<typeof postWithComments>;

export { postInput, type PostInput, type PostWithComments };
