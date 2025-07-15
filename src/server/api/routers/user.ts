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

  getByEmail: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.user.findUnique({
        where: {
          email: input,
        },
      });

      return result;
    }),

  update: publicProcedure
    .input(
      z
        .object({
          email: z.string().optional(),
          id: z.string().optional(),
          data: user.partial(),
        })
        .refine((data) => !!data.email || !!data.id, {
          message: "Either email or id must be provided",
        }),
    )
    .mutation(async ({ ctx, input }) => {
      const where = input.email ? { email: input.email } : { id: input.id };
      const data = {
        ...input.data,
        ...((input.data.affiliation === "None" || input.data.emoryEmail) && {
          emoryEmailVerified: false,
        }),
      };

      const result = await ctx.db.user.update({
        where,
        data,
      });

      return result;
    }),
});
