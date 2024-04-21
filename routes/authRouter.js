//  /users/register

import { Router } from "express";
import { checkRegisterData, protect } from "../helpers/authMiddlewares.js";
import {
  getMe,
  login,
  logout,
  register,
  updateUserSubscription,
} from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.get("/current", protect, getMe);

authRouter.post("/register", checkRegisterData, registerUserSchema, register);

authRouter.post("/login", loginUserSchema, login);

authRouter.post("/logout", protect, logout);

authRouter.patch("/", protect, subscriptionUserSchema, updateUserSubscription);

export { authRouter };
