import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateOneContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const contactsList = await listContacts();

    res.status(200).json({
      message: "success!",
      contactsList,
    });
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneContact = async (req, res) => {
  const contactId = req.params.id;
  try {
    const oneContact = await getContactById(contactId);

    res.status(200).json({
      message: "success!",
      oneContact,
    });
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const contactId = req.params.id;

  try {
    const deleteContact = await removeContact(contactId);

    res.status(200).json({
      message: "success!",
      deleteContact,
    });
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const newContact = await addContact(name, email, phone);

    res.status(201).json({
      msg: "success!",
      user: newContact,
    });
  } catch (e) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const newData = req.body;
  try {
    const updatedContact = await updateOneContact(contactId, newData);
    res.status(200).json({
      message: "success!",
      updatedContact,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
