import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { Contact } from "../models/contactModel.js";

export const getAllContacts = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const filters = { owner: _id };

  let {
    page = 1,
    limit = 20,
    favorite,
    phone,
    name,
    email,
    search,
  } = req.query;

  if (favorite) filters.favorite = favorite;

  if (phone) {
    const regex = new RegExp(phone, "i");
    filters.phone = regex;
  }

  if (name) {
    const regex = new RegExp(name, "i");
    filters.name = regex;
  }

  if (email) {
    const regex = new RegExp(email, "i");
    filters.email = regex;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    filters.$or = [{ phone: regex }, { name: regex }, { email: regex }];
  }

  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const userContacts = await Contact.find(filters).skip(skip).limit(limit);

  res.status(200).json({
    message: "success!",
    contacts: userContacts,
  });
});

export const getOneContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findOne({ _id: id, owner: _id });

  if (!contact) throw HttpError(404);

  res.status(200).json({
    message: "success!",
    contact,
  });
});

export const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const contact = await Contact.findOneAndDelete({ _id: id, owner: _id });

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
  const { _id } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
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
  const { _id } = req.user;

  const updatedFavoriteContact = await Contact.findOneAndUpdate(
    { _id: id, owner: _id },
    { favorite: body.favorite },
    { new: true }
  );

  if (!updatedFavoriteContact) throw HttpError(404);

  res.status(200).json({
    message: "success update favorite!",
    contact: updatedFavoriteContact,
  });
});
