//  /users/register

import { Router } from "express";
import {
  checkRegisterData,
  checkRegisterToken,
  protect,
  uploadAvatar,
} from "../helpers/authMiddlewares.js";
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateMyAvatar,
  updateUserSubscription,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/authController.js";
import {
  loginUserSchema,
  registerUserSchema,
  subscriptionUserSchema,
  verifySchema,
} from "../schemas/usersSchemas.js";

const authRouter = Router();

authRouter.get("/current", protect, checkRegisterToken, getCurrentUser);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post("/verify", verifySchema, resendVerificationEmail);

authRouter.patch(
  "/avatars",
  protect,
  checkRegisterToken,
  uploadAvatar,
  updateMyAvatar
);

authRouter.post("/register", checkRegisterData, registerUserSchema, register);

authRouter.post("/login", loginUserSchema, login);

authRouter.post("/logout", protect, checkRegisterToken, logout);

authRouter.patch(
  "/",
  protect,
  checkRegisterToken,
  subscriptionUserSchema,
  updateUserSubscription
);

export { authRouter };
