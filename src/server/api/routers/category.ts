import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getStats: publicProcedure.query(async ({ ctx }) => {
    // Get post counts by category
    const postCounts = await ctx.db.post.groupBy({
      by: ["category"],
      _count: true,
    });

    // Get comment counts by category
    const commentCounts = await ctx.db.post.findMany({
      select: {
        category: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    // Aggregate comment counts by category
    const commentsByCategory = commentCounts.reduce(
      (acc, post) => {
        acc[post.category] ??= 0;
        acc[post.category]! += post._count.comments;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Combine into the requested format
    const statsMap = postCounts.reduce(
      (acc, postCount) => {
        acc[postCount.category] = {
          posts: postCount._count,
          comments: commentsByCategory[postCount.category] ?? 0,
        };
        return acc;
      },
      {} as Record<string, { posts: number; comments: number }>,
    );

    return statsMap;
  }),
});
