import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const bookRouter = router({
  getAllBooks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  insertBook: publicProcedure
    .input(
      z.object({
        titol: z.string(),
        autor: z.string(),
        prestatge: z.string(),
        notes: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          titol: input.titol,
          autor: input.autor,
          prestatge: input.prestatge,
          notes: input.notes,
        },
      });
    }),
    updateBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
        titol: z.string(),
        autor: z.string(),
        prestatge: z.string(),
        notes: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.update({
        where: {
          id: input.id,
        },
        data: {
          titol: input.titol,
          autor: input.autor,
          prestatge: input.prestatge,
          notes: input.notes,
        }}
        )}),
    deleteBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      if (input.id === "") throw new TRPCError({ code: "BAD_REQUEST", message: 'Cannot delete empty entry.', });
      return ctx.prisma.book.delete({
        where: {
          id: input.id,
        },
      });
    }
  ),
});