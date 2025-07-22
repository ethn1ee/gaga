import { postInput } from "@/lib/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

import { z } from "zod/v4";

const resultSchema = {
  include: {
    comments: {
      include: { author: true },
    },
    author: true,
  },
};

export const postRouter = createTRPCRouter({
  create: publicProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    const result = await ctx.db.post.create({
      data: { ...input },
    });

    return result;
  }),

  incrementView: publicProcedure
    .input(z.cuid2())
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.post.update({
        where: {
          id: input,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });

      return result;
    }),

  getRecent: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const result = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      ...resultSchema,
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
        ...resultSchema,
        orderBy: { createdAt: "desc" },
      });

      return result;
    }),

  // getByCategoryAndSubcategory: publicProcedure
  //   .input(
  //     z.object({
  //       category: postInput.shape.category,
  //       subcategory: postInput.shape.subcategory,
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const posts = await ctx.db.post.findMany({
  //       where: {
  //         AND: {
  //           category: {
  //             equals: input.category,
  //             mode: "insensitive",
  //           },
  //           subcategory: {
  //             equals: input.subcategory,
  //             mode: "insensitive",
  //           },
  //         },
  //       },
  //       ...resultSchema,
  //       orderBy: { createdAt: "desc" },
  //     });

  //     return posts;
  //   }),

  getById: publicProcedure.input(z.cuid2()).query(async ({ ctx, input }) => {
    const result = await ctx.db.post.findUnique({
      where: { id: input },
      include: {
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
        ...resultSchema,
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

  getBatch: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        query: z.object({
          ...postInput.partial().shape,
          q: z.string().min(1).optional(),
        }),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, query } = input;
      const formattedQ = query.q?.replaceAll(" ", " & ") ?? "";

      const where = {
        AND: [
          Object.fromEntries(
            Object.entries(query).filter(([k, v]) => k !== "q" && !!v),
          ),
          query.q
            ? {
                OR: [
                  {
                    title: {
                      search: formattedQ,
                    },
                  },
                  {
                    content: {
                      search: formattedQ,
                    },
                  },
                ],
              }
            : {},
        ],
      };

      const result = await ctx.db.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          ...where,
        },
        ...resultSchema,

        orderBy: {
          createdAt: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (result.length > limit) {
        const nextItem = result.pop();
        nextCursor = nextItem?.id;
      }
      return {
        items: result,
        nextCursor,
      };
    }),

  deleteById: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.post.delete({ where: { id: input } });
      return result;
    }),
});
