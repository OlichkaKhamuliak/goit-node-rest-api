import Joi from "joi";
import { PHONE_REGEX } from "../constans/regex.js";

export const createContactSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(2).max(30).trim().required(),
    email: Joi.string().email().trim().required(),
    phone: Joi.string()
      .regex(PHONE_REGEX)
      .message('"phone" invalid phone number format')
      .trim()
      .min(2)
      .required(),
    favorite: Joi.boolean(),
  });

export const updateContactSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string().min(2).max(30).trim(),
    email: Joi.string().email().trim(),
    phone: Joi.string()
      .min(2)
      .regex(PHONE_REGEX)
      .message('"phone" invalid phone number format')
      .trim(),
    favorite: Joi.boolean(),
  })
  .min(1)
  .messages({ "object.min": "Body must have at least one field" });
