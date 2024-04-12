import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  getFavorites,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  checkCreateContactData,
  checkUpdateContactData,
  checkUserId,
} from "../helpers/userMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/favorites", getFavorites);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", checkUserId, getOneContact);

contactsRouter.delete("/:id", checkUserId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  checkCreateContactData,
  createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  checkUserId,
  checkUpdateContactData,
  updateContact
);

export default contactsRouter;
