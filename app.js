import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import contactsRouter from "./routes/contactsRouter.js";
import { globalErrorHandler } from "./controllers/errorController.js";
import { authRouter } from "./routes/authRouter.js";

dotenv.config();

export const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const pathPrefix = "/api";

app.use(`${pathPrefix}/users`, authRouter);
app.use(`${pathPrefix}/contacts`, contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Resource not found!",
  });
});

app.use(globalErrorHandler);
