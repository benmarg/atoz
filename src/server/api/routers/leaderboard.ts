import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const leaderboardRouter = createTRPCRouter({
  setScore: publicProcedure
    .input(
      z.object({ time: z.number(), userId: z.string(), nickname: z.string() }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("userId", input.userId);
      const previousScore = await ctx.db.score.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (previousScore) {
        return ctx.db.score.update({
          where: {
            userId: input.userId,
          },
          data: {
            time: input.time,
          },
        });
      } else {
        return ctx.db.score.create({
          data: {
            time: input.time,
            userId: input.userId,
            nickname: input.nickname,
          },
        });
      }
    }),
  getScoreByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.score.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),
  getScoreboard: publicProcedure
    .input(z.object({ time: z.number() }))
    .query(async ({ input, ctx }) => {
      const { time } = input;
      const fasterTimes = await ctx.db.score.findMany({
        where: {
          time: {
            lt: time,
          },
        },
        orderBy: {
          time: "desc",
        },
        take: 3,
      });
      const slowerTimes = await ctx.db.score.findMany({
        where: {
          time: {
            gt: time,
          },
        },
        orderBy: {
          time: "asc",
        },
        take: 3,
      });

      const rank = await ctx.db.score.count({
        where: {
          time: {
            lt: time,
          },
        },
      });

      return { fasterTimes: fasterTimes.reverse(), slowerTimes, rank };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.score.findMany();
  }),
});
