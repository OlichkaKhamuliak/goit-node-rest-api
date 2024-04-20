//  /users/register

import { Router } from "express";
import { checkRegisterData, protect } from "../helpers/authMiddlewares.js";
import {
  getMe,
  login,
  logout,
  register,
} from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.get("/current", protect, getMe);

authRouter.post("/register", checkRegisterData, registerUserSchema, register);

authRouter.post("/login", loginUserSchema, login);

authRouter.post("/logout", protect, logout);

export { authRouter };
