//  /users/register

import { Router } from "express";
import { checkRegisterData } from "../helpers/authMiddlewares.js";
import { register } from "../controllers/authController.js";
import { registerUserSchema } from "../schemas/usersSchemas.js";

const router = Router();
router.post("/register", checkRegisterData, registerUserSchema, register);

// checkLoginData login
router.post("/login");

export { router };
