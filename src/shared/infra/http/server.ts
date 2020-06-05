import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import AppError from "@shared/errors/AppErrors";
import routes from "./routes/index.routes";

import "@shared/container";

const app = express();

const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: "error", error: err.message });
  }

  console.log(err);

  return response
    .status(500)
    .json({ status: "error", error: "Internal server error" });
});

app.listen(port, () => console.log("Server is running"));
