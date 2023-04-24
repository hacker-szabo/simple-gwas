import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const diceRouter = createTRPCRouter({
    getMore: privateProcedure.mutation(async ({ ctx }) => {
        const userId = ctx.userId;

        const gwas = await ctx.prisma.gwas.findFirst({
            where: {
                userId: userId
            }
        })

        if (!gwas) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Még nincs GWASod"
            })
        }

        if (gwas.copper > 0) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Ilyen sok rézhez nem jár segély!"
            })
        }

        await ctx.prisma.gwas.update({
            where: {
                userId: userId
            },
            data: {
                copper: 10
            }
        });

        return {
            copper: 10
        }
    }),

    throwTheDice: privateProcedure.input(z.object({
        bid: z.number().positive().finite().safe()
    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId;

        const diceOne = Math.floor(Math.random() * 6) + 1;
        const diceTwo = Math.floor(Math.random() * 6) + 1;
        
        const gwas = await ctx.prisma.gwas.findFirst({
            where: {
                userId: userId
            }
        });

        if (!gwas) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Még nincs GWASod"
            })
        }

        if (input.bid > gwas.copper) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Nincs ennyi rezed! Ha elfogyott, kérhetsz még!"
            })
        }

        let newCopper = gwas.copper;

        if (diceOne == diceTwo) {
            // nyert
            console.log('nyert');
            newCopper += input.bid * 6;
        } else {
            // vesztett
            console.log('vesztett');
            newCopper -= input.bid;
        }

        // max copper is 10.1k
        newCopper = Math.min(10100, newCopper)

        console.log([gwas.copper, newCopper]);

        await ctx.prisma.gwas.update({
            where: {
                userId: userId
            },
            data: {
                copper: newCopper
            }
        })
        
        return {
            isWon: diceOne == diceTwo,
            diceOne: diceOne,
            diceTwo: diceTwo,
            bid: input.bid,
            newCopper: newCopper,
            multiplier: 6
        }
    })
});
