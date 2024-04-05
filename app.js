import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import { globalErrorHandler } from "./controllers/errorController.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    message: "Oops! Resource not found!",
  });
});

app.use(globalErrorHandler);

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
