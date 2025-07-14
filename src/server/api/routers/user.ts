import { user } from "@/lib/schema/user";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod/v4";

export const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db.user.findUnique({
      where: {
        id: input,
      },
    });

    return result;
  }),

  getByEmail: publicProcedure.input(z.email()).query(async ({ ctx, input }) => {
    const result = await ctx.db.user.findUnique({
      where: {
        email: input,
      },
    });

    return result;
  }),

  update: publicProcedure
    .input(
      z.object({
        email: z.email(),
        data: user.partial(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.user.update({
        where: {
          email: input.email,
        },
        data: {
          ...input.data,
          ...(input.data.emoryEmail && { emoryEmailVerified: false }),
        },
      });

      return result;
    }),
});
