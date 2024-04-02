import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  try {
    const readContacts = await fs.readFile(contactsPath);
    return JSON.parse(readContacts);
  } catch (error) {
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact || null;
  } catch (error) {
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
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
  } catch (error) {
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
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
  } catch (error) {
    throw error;
  }
}

export async function updateOneContact(contactId, newData) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return undefined;
    }

    const updatedContact = { ...contacts[index], ...newData };
    contacts[index] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return updatedContact;
  } catch (error) {
    throw error;
  }
}
