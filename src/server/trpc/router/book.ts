import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

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
        posicio: z.string(),
        habitacio: z.string(),
        tipus: z.string(),
        editorial: z.string(),
        idioma: z.string(),
        notes: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          titol: input.titol,
          autor: input.autor,
          prestatge: input.prestatge,
          posicio: input.posicio,
          habitacio: input.habitacio,
          tipus: input.tipus,
          editorial: input.editorial,
          idioma: input.idioma,
          notes: input.notes,
        },
      });
    }),
  updateBook: publicProcedure
    .input(
      z.object({
        id: z.number(),
        titol: z.string(),
        autor: z.string(),
        prestatge: z.string(),
        posicio: z.string(),
        habitacio: z.string(),
        tipus: z.string(),
        editorial: z.string(),
        idioma: z.string(),
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
          posicio: input.posicio,
          habitacio: input.habitacio,
          tipus: input.tipus,
          editorial: input.editorial,
          idioma: input.idioma,
          notes: input.notes,
        },
      });
    }),
  deleteBook: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
    if (input < 0)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot delete empty entry.",
      });
    return ctx.prisma.book.delete({
      where: {
        id: input,
      },
    });
  }),
});
