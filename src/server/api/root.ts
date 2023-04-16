import { createTRPCRouter } from "~/server/api/trpc";
import { gwasRouter } from "~/server/api/routers/gwas";
import { diceRouter } from "./routers/games/dice";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  gwas: gwasRouter,
  gamesDice: diceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
