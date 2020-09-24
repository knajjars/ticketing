import { errorHandler, NotFoundError } from "@knticketing/common";
import { Router } from "express";

import { createAuthRouter } from "./routes";

export function createRouter(): Router {
  const router = Router();

  router.use("/api/users", createAuthRouter());
  router.all("*", async () => {
    throw new NotFoundError();
  });

  router.use(errorHandler);

  return router;
}
