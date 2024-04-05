import { promises as fs } from "fs";
import { catchAsync } from "./catchAsync.js";
import HttpError from "./HttpError.js";
import { contactsPath } from "../services/contactsServices.js";

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // TEMP save user to the DB
  const usersDB = await fs.readFile(contactsPath);

  const users = JSON.parse(usersDB);
  const user = users.find((u) => u.id === id);

  if (!user) {
    throw HttpError(404);
  }

  req.user = user;

  next();
});

export const checkCreateUserData = {};
