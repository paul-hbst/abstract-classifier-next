import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "This is secret!";
  }),
  classify: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        age: z.number(),
        abstracts: z.array(
          z.object({
            text: z.string(),
            id: z.number(),
          })
        ),
      })
    )
    .query(({ input }) => {
      const absLength = input.abstracts.map((abstract) => {
        return abstract.text.length;
      });
      return {
        message: `${input.name} is ${input.age} years old`,
        absLength,
      };
    }),
});
