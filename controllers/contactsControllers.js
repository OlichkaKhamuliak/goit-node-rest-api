import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { favorite } = req.query;
  const userId = req.user._id;

  const filters = { owner: userId };

  if (favorite) filters.favorite = favorite;

  const userContacts = await Contact.find(filters);

  res.status(200).json({
    message: "success!",
    contacts: userContacts,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const contact = await Contact.findOne({ _id: id, owner: userId });

  if (!contact) throw HttpError(404);

  res.status(200).json({
    message: "success!",
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const contact = await Contact.findOneAndDelete({ _id: id, owner: userId });

  if (!contact) {
    throw HttpError(404);
  }

  res.status(204).json({
    message: "success!",
    contact,
  });
});

export const createContact = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const newContact = await Contact.create({
    ...req.body,
    owner: _id,
  });

  res.status(201).json({
    message: "success!",
    contact: newContact,
  });
});

export const updateContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const userId = req.user._id;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    body,
    {
      new: true,
    }
  );

  if (!updatedContact) throw HttpError(404);

  res.status(200).json({
    message: "success!",
    contact: updatedContact,
  });
});

export const updateFavoriteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const userId = req.user._id;

  const updatedFavoriteContact = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedFavoriteContact) throw HttpError(404);

  res.status(200).json({
    message: "success update favorite!",
    contact: updatedFavoriteContact,
  });
});
