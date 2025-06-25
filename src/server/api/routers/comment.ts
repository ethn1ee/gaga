import { commentInput } from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: publicProcedure
    .input(commentInput)
    .mutation(async ({ ctx, input }) => {
      const result = ctx.db.comment.create({
        data: {
          content: input.content,
          postId: input.postId,
          authorId: input.authorId,
        },
      });

      return result;
    }),
});
