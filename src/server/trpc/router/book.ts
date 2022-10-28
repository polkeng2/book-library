import { router, publicProcedure } from "../trpc";
import { z } from "zod";

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
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          titol: input.titol,
          autor: input.autor,
          prestatge: parseInt(input.prestatge),
        },
      });
    }),
    deleteBook: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.delete({
        where: {
          id: input.id,
        },
      });
    }
  ),
});