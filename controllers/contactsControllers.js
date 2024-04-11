import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateOneContact,
} from "../services/contactsServices.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = catchAsync(async (req, res) => {
  // const contactsList = await listContacts();
  const contactsList = await Contact.find();

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
  // const { name, email, phone } = req.body;
  // const newContact = await addContact(name, email, phone);

  const newContact = await Contact.create(req.body);

  res.status(201).json({
    message: "success!",
    user: newContact,
  });
});

export const updateContact = catchAsync(async (req, res, next) => {
  const contactId = req.params.id;
  const newData = req.body;
  const updatedContact = await updateOneContact(contactId, newData);

  res.status(200).json({
    message: "success!",
    updatedContact,
  });
});
