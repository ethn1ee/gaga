import type { Post, Prisma } from "@prisma/client";

type PostFormData = Omit<Post, "id" | "createdAt" | "updatedAt">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postWithComments = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { comments: true },
});

type PostWithComments = Prisma.PostGetPayload<typeof postWithComments>;

export { PostFormData, PostWithComments };
