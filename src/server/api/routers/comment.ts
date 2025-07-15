import { commentOnParentInput, commentOnPostInput } from "@/lib/schema/comment";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod/v4";

export const commentRouter = createTRPCRouter({
  createOnPost: publicProcedure
    .input(commentOnPostInput)
    .mutation(async ({ ctx, input }) => {
      const result = ctx.db.comment.create({
        data: { ...input },
      });

      return result;
    }),

  createOnParent: publicProcedure
    .input(commentOnParentInput)
    .mutation(async ({ ctx, input }) => {
      const result = ctx.db.comment.create({
        data: { ...input },
      });

      return result;
    }),

  getByPostId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const result = ctx.db.comment.findMany({
      where: { postId: input },
      include: {
        author: true,
        childs: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return result;
  }),
});
