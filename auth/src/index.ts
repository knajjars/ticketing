import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { createRouter } from "./createRouter";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    secure: true,
    signed: false,
  })
);
app.use(createRouter());

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb://auth-mongo-srv:27017/auth",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.info("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
};

start();
