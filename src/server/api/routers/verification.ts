import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod/v4";

export const verificationRouter = createTRPCRouter({
  create: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    // expire any existing verification for the same identifier
    await ctx.db.verification.updateMany({
      where: { identifier: input },
      data: { expiresAt: new Date(Date.now() - 1) },
    });

    const result = await ctx.db.verification.create({
      data: {
        identifier: input,
        value: createId(),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });

    return result;
  }),

  verify: publicProcedure
    .input(z.object({ id: z.string(), token: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.verification.findUnique({
        where: { id: input.id },
      });

      const isValid =
        !!result &&
        result.expiresAt >= new Date() &&
        result.value === input.token;

      await ctx.db.verification.update({
        where: { id: input.id },
        data: { expiresAt: new Date(Date.now() - 1) },
      });

      return isValid ? result : null;
    }),
});
