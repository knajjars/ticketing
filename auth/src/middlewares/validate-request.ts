import { Response, Request, NextFunction } from "express";

import { RequestValidationError } from "../errors";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
