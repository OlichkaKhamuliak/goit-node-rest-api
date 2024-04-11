import { promises as fs } from "fs";
import { catchAsync } from "./catchAsync.js";
import HttpError from "./HttpError.js";
import { contactsPath } from "../services/contactsServices.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import { Contact } from "../models/contactModel.js";

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

export const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { value } = createContactSchema.validate(req.body);

  const emailExists = await Contact.exists({ email: value.email });
  const phoneExists = await Contact.exists({ phone: value.phone });

  if (emailExists && phoneExists) {
    throw HttpError(
      409,
      "User with this email and phone number is already exist"
    );
  } else if (emailExists) {
    throw HttpError(409, "User with this email is already exist");
  } else if (phoneExists) {
    throw HttpError(409, "User with this phone number is already exist");
  }

  req.body = value;
  next();
});
