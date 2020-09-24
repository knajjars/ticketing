import { currentUser, requireAuth } from "@knticketing/common";
import express from "express";

const router = express.Router();

router.get("/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
