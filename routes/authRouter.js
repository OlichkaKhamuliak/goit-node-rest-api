//  /users/register

import { Router } from "express";
import { checkRegisterData, protect } from "../helpers/authMiddlewares.js";
import { getMe, login, register } from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.get("/me", protect, getMe);

authRouter.post("/register", checkRegisterData, registerUserSchema, register);

// checkLoginData login
authRouter.post("/login", loginUserSchema, login);

export { authRouter };
