import { Router } from "express";

import { currentUserRouter } from "./current-user";
import { signinRouter } from "./signin";
import { signoutRouter } from "./signout";
import { signupRouter } from "./signup";

function createRouter(): Router {
  const router = Router();

  router.use(currentUserRouter);
  router.use(signinRouter);
  router.use(signoutRouter);
  router.use(signupRouter);

  return router;
}

export { createRouter as createAuthRouter };
