import Joi from "joi";

export const createContactSchema = Joi.object()
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
  });

export const updateContactSchema = Joi.object()
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
  .or("name", "email", "phone")
  .messages({ "object.missing": "Body must have at least one field" });
