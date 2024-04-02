import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateOneContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const contactsList = await listContacts();

    res.status(200).json({
      message: "success!",
      contactsList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const oneContact = await getContactById(contactId);
    if (!oneContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json({
      message: "success!",
      oneContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const contactId = req.params.id;

  try {
    const deleteContact = await removeContact(contactId);
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({
      message: "success!",
      deleteContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createContact = async (req, res) => {
  const { value, errors } = createContactSchema(req.body);

  if (errors) {
    res.status(400).json({ message: errors });
    return;
  }

  try {
    const { name, email, phone } = value;
    const newContact = await addContact(name, email, phone);

    res.status(201).json({
      msg: "success!",
      user: newContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const newData = req.body;
  if (Object.keys(newData).length === 0) {
    res.status(400).json({ message: "Body must have at least one field" });
    return;
  }
  const { errors } = updateContactSchema(newData);
  if (errors) {
    res.status(400).json({ message: errors });
    return;
  }
  try {
    const updatedContact = await updateOneContact(contactId, newData);
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({
      message: "success!",
      updatedContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
