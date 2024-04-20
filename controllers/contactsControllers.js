import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { favorite } = req.query;

  const filters = {};

  if (favorite) filters.favorite = favorite;

  const contacts = await Contact.find(filters);

  res.status(200).json({
    message: "success!",
    contacts,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) throw HttpError(404);

  res.status(200).json({
    message: "success!",
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) throw HttpError(404);

  res.status(204).json({
    message: "success!",
    contact,
  });
});

export const createContact = catchAsync(async (req, res) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json({
    message: "success!",
    contact: newContact,
    owner: newContact.id,
  });
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedContact = await Contact.findByIdAndUpdate(id, body, {
    new: true,
  });

  res.status(200).json({
    message: "success!",
    contact: updatedContact,
  });
});

export const updateFavoriteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const updatedFavoriteContact = await Contact.findByIdAndUpdate(
    id,
    { favorite: body.favorite },
    { new: true }
  );

  res.status(200).json({
    message: "success update favorite!",
    contact: updatedFavoriteContact,
  });
});
