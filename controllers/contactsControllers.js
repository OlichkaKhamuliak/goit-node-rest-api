import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const contacts = await Contact.find();

  res.status(200).json({
    message: "success!",
    contacts,
  });
});

export const getFavorites = catchAsync(async (req, res) => {
  const favorites = await Contact.find({ favorite: true });

  res.status(200).json({
    message: "success!",
    contacts: favorites,
  });
});

export const getNonFavorites = catchAsync(async (req, res) => {
  const favorites = await Contact.find({ favorite: false });

  res.status(200).json({
    message: "success!",
    contacts: favorites,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { contact } = req;

  res.status(200).json({
    message: "success!",
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);

  // res.status(200).json({
  //   message: "success!",
  //   deleteContact,
  // });

  res.sendStatus(204);
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    message: "success!",
    contact: newContact,
  });
});

export const updateContact = catchAsync(async (req, res) => {
  const { contact, body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(contact.id, body, {
    new: true,
  });

  res.status(200).json({
    message: "success!",
    contact: updatedContact,
  });
});

export const updateFavoriteContact = catchAsync(async (req, res) => {
  const { contact, body } = req;

  const updatedFavoriteContact = await Contact.findByIdAndUpdate(
    contact.id,
    { favorite: body.favorite },
    { new: true }
  );

  res.status(200).json({
    message: "success update favorite!",
    contact: updatedFavoriteContact,
  });
});
