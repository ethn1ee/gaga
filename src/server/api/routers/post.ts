import { postInput } from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod";

export const postRouter = createTRPCRouter({
  create: publicProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    return ctx.db.post.create({
      data: { ...input },
    });
  }),

  getRecent: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const result = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        comments: {
          include: { author: true },
        },
        author: true,
      },
      take: input,
    });

    return result;
  }),

  getByCategory: publicProcedure
    .input(postInput.shape.category)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.post.findMany({
        where: {
          category: {
            equals: input,
            mode: "insensitive",
          },
        },
        include: {
          comments: {
            include: { author: true },
          },
          author: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return result;
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
        where: {
          AND: {
            category: {
              equals: input.category,
              mode: "insensitive",
            },
            subcategory: {
              equals: input.subcategory,
              mode: "insensitive",
            },
          },
        },
        include: {
          comments: {
            include: { author: true },
          },
          author: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return posts;
    }),

  getById: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.post.findUnique({
        where: { id: input },
        include: {
          comments: {
            include: { author: true, childs: true },
            orderBy: { createdAt: "desc" },
          },
          author: true,
        },
      });

      return result;
    }),

  getByAuthorId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.post.findMany({
        where: { authorId: input },
        include: {
          comments: {
            include: { author: true },
            orderBy: { createdAt: "desc" },
          },
          author: true,
        },
      });

      return result;
    }),

  getPhotos: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const result = await ctx.db.post.findMany({
      where: { category: "photos" },
      orderBy: {
        createdAt: "desc",
      },
      take: input,
    });

    return result;
  }),

  search: publicProcedure
    .input(z.string().min(1))
    .query(async ({ ctx, input }) => {
      const formattedInput = input.split(" ").join(" | ");
      const result = await ctx.db.post.findMany({
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
          comments: { include: { author: true } },
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

      return result;
    }),

  getCountByCategory: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.post.groupBy({
      by: ["category"],
      _count: {
        _all: true,
      },
    });

    return result;
  }),
});
