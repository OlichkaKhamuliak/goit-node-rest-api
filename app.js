import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

import contactsRouter from "./routes/contactsRouter.js";
import { globalErrorHandler } from "./controllers/errorController.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const pathPrefix = "/api";

app.use(`${pathPrefix}/contacts`, contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Resource not found!",
  });
});

app.use(globalErrorHandler);

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
