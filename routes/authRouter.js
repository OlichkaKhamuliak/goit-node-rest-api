//  /users/register

import { Router } from "express";
import { checkRegisterData } from "../helpers/authMiddlewares.js";
import { login, register } from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
} from "../schemas/usersSchemas.js";

const router = Router();
router.post("/register", checkRegisterData, registerUserSchema, register);

// checkLoginData login
router.post("/login", loginUserSchema, login);

export { router };
