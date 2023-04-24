import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

export const newsRouter = createTRPCRouter({
    news: publicProcedure.query(async ({ ctx }) => {
        const last20News = await ctx.prisma.news.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 20,
            select: {
                message: true,
                id: true,
                userId: true,
                // createdAt: true
            }
        })

        return last20News
    }),

    newMessage: privateProcedure.input(z.object({
        message: z.string().max(75).min(1)
    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId;

        const gwas = await ctx.prisma.gwas.findFirst({
            where: {
                userId: userId
            }
        })

        // check if gwas exist
        if (!gwas) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: 'Nincs elég ezüstöd!'
            })
        }

        // check if gwas has enough silver (5) and throw TRPCError if not
        if (gwas.silver < 5) {
            throw new TRPCError({
                code: 'FORBIDDEN',
                message: 'Nincs elég ezüstöd!'
            })
        }

        // create a new message
        const newMessage = await ctx.prisma.news.create({
            data: {
                message: input.message,
                userId: userId,
            }
        })

        // if newmessage failed, fail
        if (!newMessage) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Hiba történt!'
            })
        }

        // subtract 5 silver from the gwas
        await ctx.prisma.gwas.update({
            where: {
                userId
            },
            data: {
                silver: gwas.silver - 5,
                points: gwas.points + 30
            }
        })
        
        return {
            success: true
        }
    })
});
