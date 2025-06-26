import { commentOnParentInput, commentOnPostInput } from "@/lib/schema/comment";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
});
