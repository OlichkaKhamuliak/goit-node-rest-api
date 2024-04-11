import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  checkCreateContactData,
  checkUserId,
} from "../helpers/userMiddlewares.js";

const contactsRouter = express.Router();

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
  updateContact
);

export default contactsRouter;
