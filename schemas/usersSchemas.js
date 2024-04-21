import Joi from "joi";
import { userSubscription } from "../constans/userSubscription.js";
import { validateBody } from "../helpers/validateBody.js";

export const registerUserSchema = validateBody(
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().min(6).max(130).required(),
      email: Joi.string().email().trim().required(),
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
);

export const loginUserSchema = validateBody(
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      password: Joi.string().min(6).max(130).required(),
      email: Joi.string().email().required(),
    })
);

export const subscriptionUserSchema = validateBody(
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      subscription: Joi.string().valid(...Object.values(userSubscription)),
    })
);
