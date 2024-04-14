import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
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

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
  "/:id/favorite",
  checkUserId,
  validateBody(updateFavoriteContactSchema),
  updateFavoriteContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  checkUserId,
  updateContact
);

export default contactsRouter;
