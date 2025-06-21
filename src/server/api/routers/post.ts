import { postInput } from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: publicProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    return ctx.db.post.create({
      data: {
        title: input.title,
        content: input.content,
        category: input.category,
        attachments: input.attachments,
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
    .input(postInput.shape.category)
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { category: input },
        include: {
          comments: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return posts;
    }),

  getById: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input },
        include: {
          comments: {
            orderBy: { createdAt: "desc" },
          },
        },
      });

      return post;
    }),

  search: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const formattedInput = input.split(" ").join(" | ");
      const posts = await ctx.db.post.findMany({
        where: {
          OR: [
            {
              title: {
                search: formattedInput,
              },
            },
            {
              content: {
                search: formattedInput,
              },
            },
          ],
        },
        include: {
          comments: true,
        },
        orderBy: {
          _relevance: {
            fields: ["title", "content"],
            search: formattedInput,
            sort: "desc",
          },
        },
      });

      return posts;
    }),
});
