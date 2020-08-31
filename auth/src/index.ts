import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import { createRouter } from "./createRouter";

const app = express();

app.use(json());
app.use(createRouter());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
