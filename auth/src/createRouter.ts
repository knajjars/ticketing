import { Router } from "express";

import { createAuthRouter } from "./routes";
import { errorHandler } from "./middlewares";
import { NotFoundError } from "./errors";

export function createRouter(): Router {
  const router = Router();

  router.use("/api/users", createAuthRouter());
  router.all("*", async () => {
    throw new NotFoundError();
  });

  router.use(errorHandler);

  return router;
}
