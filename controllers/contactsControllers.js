import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateOneContact,
} from "../services/contactsServices.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contactsList = await listContacts();

  res.status(200).json({
    message: "success!",
    contactsList,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const contactId = req.params.id;
  const oneContact = await getContactById(contactId);

  res.status(200).json({
    message: "success!",
    oneContact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  const contactId = req.params.id;

  const deleteContact = await removeContact(contactId);

  res.status(200).json({
    message: "success!",
    deleteContact,
  });
});

export const createContact = catchAsync(async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);

  res.status(201).json({
    message: "success!",
    user: newContact,
  });
});

export const updateContact = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  const newData = req.body;
  if (Object.keys(newData).length === 0) {
    return next(HttpError(400, "Body must have at least one field"));
  }
  const updatedContact = await updateOneContact(contactId, newData);

  res.status(200).json({
    message: "success!",
    updatedContact,
  });
});
