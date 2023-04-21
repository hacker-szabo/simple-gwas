import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const gwasRouter = createTRPCRouter({
  getGwas: privateProcedure
      .query(({ ctx }) => {
        const userId = ctx.userId
        return ctx.prisma.gwas.findFirst({
          where: {
              userId: userId
          }
        });
      }),
  
  pet: privateProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId

    // get gwas
    const gwas = await ctx.prisma.gwas.findFirst({
      where: {
        userId: userId
      }
    })

    // check if gwas exist
    if (!gwas) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Mit simogatsz? Hát nincs is GWASod!"
      })
    }

    // check if lastFeed (prisma DateTime) converted to YYYY-mm-dd is not today converted to YYYY-mm-dd then throw trpcerror if it's the same
    const todayDate = new Date().toISOString().slice(0, 10)
    
    if (gwas.lastFeed.toISOString().slice(0, 10) === todayDate) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Ma már nem simogathatsz!"
      })
    }

    // modositani a gwast, h tobb legyen az elete!
    // atirni a gwas datumat

    await prisma.gwas.update({
      where: {
        userId: userId
      },
      data: {
        lastFeed: new Date().toISOString(),
        health: Math.min(gwas.health + 15, 100),
        points: gwas.points + (Math.min(gwas.health + 15, 100) - gwas.health),
      }
    })

    return {
      lastFeed: new Date().toISOString(),
      health: Math.min(gwas.health + 15, 100)
    }
  }),

  createGwas: privateProcedure.input(z.object({
    username: z.string().max(12).min(2)
  })).mutation(async ({ ctx, input }) => {
    // get userid
    const userId = ctx.userId

    // get gwas
    const gwas = await ctx.prisma.gwas.findFirst({
      where: {
        userId
      }
    })

    // check if he already has a gwas and fail is yes
    if (gwas) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Már van GWASod!"
      })
    }

    // check if input.username already exist and fail if yes
    if (await ctx.prisma.gwas.findFirst({
      where: {
        username: input.username
      }
    }) !== null) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Már létezik GWAS ezzel a névvel!"
      })
    }

    // create a row with default values, lastPet should be less then now()-24h
    const newGwas = await ctx.prisma.gwas.create({
      data: {
        userId,
        health: 65,
        points: 0,
        lastFeed: new Date(new Date().getTime() - (24 * 60 * 60 * 1000)).toISOString(),
        silver: 0,
        copper: 10,
        username: input.username
      }
    })

    // if newGwas creation failed, fail
    if (!newGwas) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Hiba történt!"
      })
    }

    return {
      username: newGwas.username
    }
  }),

  buySilver: privateProcedure.input(z.object({
    silver: z.number().min(0)
  })).mutation(async ({ ctx, input }) => {
    const userId = ctx.userId

    // get gwas
    const gwas = await ctx.prisma.gwas.findFirst({
      where: {
        userId: userId
      }
    })

    // check if gwas exist
    if (!gwas) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Először csinálj GWASt!"
      })
    }

    const silverPriceInCopper = 5000

    // check if gwas has enough copper to pay for input.silver amount of silver
    if (gwas.copper < silverPriceInCopper * input.silver) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Nincs elég pénzed!"
      })
    }
    
    // add input.silver to gwas.silver, subtract and silverPriceInCopper * input.silver from gwas.copper save it in the db
    await prisma.gwas.update({
      where: {
        userId
      },
      data: {
        silver: gwas.silver + input.silver,
        copper: gwas.copper - (silverPriceInCopper * input.silver)
      }
    })

    return {
      silver: gwas.silver + input.silver,
      copper: gwas.copper - (silverPriceInCopper * input.silver)
    }
  })

});
