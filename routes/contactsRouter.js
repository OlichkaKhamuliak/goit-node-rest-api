import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import { checkUserId } from "../helpers/contactMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkUserId, getOneContact);

contactsRouter.delete("/:id", checkUserId, deleteContact);

contactsRouter.post("/", createContactSchema, createContact);

contactsRouter.put(
  "/:id/favorite",
  checkUserId,
  updateFavoriteContactSchema,
  updateFavoriteContact
);

contactsRouter.put("/:id", updateContactSchema, checkUserId, updateContact);

export default contactsRouter;
