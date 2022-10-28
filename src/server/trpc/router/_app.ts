// src/server/router/_app.ts
import { router } from "../trpc";

import { bookRouter } from "./book";

export const appRouter = router({
  book: bookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
