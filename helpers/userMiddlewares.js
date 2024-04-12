import { catchAsync } from "./catchAsync.js";
import HttpError from "./HttpError.js";
import { contactsPath } from "../services/contactsServices.js";
import { createContactSchema } from "../schemas/contactsSchemas.js";
import { Contact } from "../models/contactModel.js";
import { Types } from "mongoose";

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isValidId = Types.ObjectId.isValid(id);

  if (!isValidId) throw HttpError(404);

  const contact = await Contact.findById(id);
  // const contact = await Contact.find({ _id: id });

  if (!contact) throw HttpError(404);

  req.contact = contact;

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
