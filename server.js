import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app.js";
dotenv.config();

const port = +process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, (e) => {
      if (e) {
        console.log(`Error >>>>>> ${e}`);
        process.exit(1);
      }
      console.log(`Server is running. Use our API on port: ${port}`);
    });
  })
  .catch((e) => {
    console.log("Database error>>>", e);
    process.exit(1);
  });
