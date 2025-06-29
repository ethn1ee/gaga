import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  updateAvatar: publicProcedure
    .input(
      z.object({
        username: z.string(),
        image: z.string().url(),
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
