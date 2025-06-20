import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        category: z.string().min(1),
        authorId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          title: input.title,
          content: input.content,
          category: input.category,
          authorId: input.authorId,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return post ?? null;
  }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { category: input.category },
        include: { comments: true },
        orderBy: { createdAt: "desc" },
      });

      return posts;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().cuid2() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        include: { comments: true },
      });

      return post;
    }),
});
