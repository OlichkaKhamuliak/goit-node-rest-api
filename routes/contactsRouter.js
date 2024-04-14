import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  getFavorites,
  updateFavoriteContact,
  getNonFavorites,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteContactSchema,
} from "../schemas/contactsSchemas.js";
import {
  // checkCreateContactData,
  checkUserId,
} from "../helpers/userMiddlewares.js";

const contactsRouter = express.Router();

contactsRouter.get("/", (req, res) => {
  const favorite = req.query.favorite;

  if (favorite === "true") {
    return getFavorites(req, res);
  } else if (favorite === "false") {
    return getNonFavorites(req, res);
  }

  return getAllContacts(req, res);
});

contactsRouter.get("/:id", checkUserId, getOneContact);

contactsRouter.delete("/:id", checkUserId, deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  // checkCreateContactData,
  createContact
);

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
