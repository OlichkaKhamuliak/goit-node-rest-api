import Joi from "joi";
import { joiValidator } from "../helpers/joiValidator.js";

export const createContactSchema = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).trim().required(),
      email: Joi.string().email().trim().required(),
      phone: Joi.string()
        .regex(/^\+?[\d()\-\s]+$/)
        .message('"phone" invalid phone number format')
        .trim()
        .min(2)
        .required(),
    })
    .validate(data)
);

export const updateContactSchema = joiValidator((data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(30).trim(),
      email: Joi.string().email().trim(),
      phone: Joi.string()
        .min(2)
        .regex(/^\+?[\d()\-\s]+$/)
        .message('"phone" invalid phone number format')
        .trim(),
    })
    .validate(data)
);
