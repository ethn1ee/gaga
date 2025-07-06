import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod/v4";

export const userRouter = createTRPCRouter({
  getByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.user.findUnique({
        where: {
          username: input,
        },
      });

      return result;
    }),

  updateAvatar: publicProcedure
    .input(
      z.object({
        username: z.string(),
        image: z.url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.user.update({
        where: {
          username: input.username,
        },
        data: {
          image: input.image,
        },
      });

      return result;
    }),
});
