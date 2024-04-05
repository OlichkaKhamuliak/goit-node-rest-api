import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { handleAsync } from "../helpers/handleAsync.js";

export const contactsPath = path.join("db", "contacts.json");

export const listContacts = () =>
  handleAsync(async () => {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts);
  });

export const getContactById = (contactId) =>
  handleAsync(async () => {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  });

export const removeContact = (contactId) =>
  handleAsync(async () => {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    if (!removedContact) {
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return removedContact;
  });

export const addContact = (name, email, phone) =>
  handleAsync(async () => {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  });

export const updateOneContact = (contactId, newData) =>
  handleAsync(async () => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return undefined;
    }

    const updatedContact = { ...contacts[index], ...newData };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return updatedContact;
  });
