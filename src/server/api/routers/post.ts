import { postInput } from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: publicProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    return ctx.db.post.create({
      data: { ...input },
    });
  }),

  getRecent: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        comments: true,
        author: true,
      },
      take: 10,
    });

    return posts;
  }),

  getByCategory: publicProcedure
    .input(postInput.shape.category)
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { category: input },
        include: {
          comments: true,
          author: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return posts;
    }),

  getByCategoryAndSubcategory: publicProcedure
    .input(
      z.object({
        category: postInput.shape.category,
        subcategory: postInput.shape.subcategory,
      }),
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { ...input },
        include: {
          comments: true,
          author: true,
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
            include: {
              author: true,
            },
            orderBy: { createdAt: "desc" },
          },
          author: true,
        },
      });

      return post;
    }),
  
  getByAuthorId: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findMany({
      where: { authorId: input },
      include: {
        comments: {
          include: {
            author: true,
          },
          orderBy: { createdAt: "desc" },
        },
        author: true,
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
          author: true,
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
