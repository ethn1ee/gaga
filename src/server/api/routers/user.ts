import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getByUsername: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const result = ctx.db.user.findUnique({
      where: {
        username: input,
      },
      include: {
        posts: {
          include: {
            comments: {
              include: {
                author: true,
              },
            },
            author: true,
          },
        },
        comments: true,
      },
    });

    return result;
  }),
});
