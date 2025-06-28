import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getStats: publicProcedure.query(async ({ ctx }) => {
    const postStats = await ctx.db.post.groupBy({
      by: ["category"],
      _count: {
        _all: true,
      },
      _sum: {
        views: true,
      },
    });

    const commentStats = await ctx.db.post.findMany({
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });

    const commentsByCategory = commentStats.reduce(
      (acc, post) => {
        acc[post.category] ??= 0;
        acc[post.category]! += post._count.comments;
        return acc;
      },
      {} as Record<string, number>,
    );

    const statsMap = postStats.reduce(
      (acc, post) => {
        acc[post.category] = {
          posts: post._count._all,
          comments: commentsByCategory[post.category] ?? 0,
          views: post._sum.views ?? 0,
        };
        return acc;
      },
      {} as Record<string, { posts: number; comments: number; views: number }>,
    );

    return statsMap;
  }),
});
