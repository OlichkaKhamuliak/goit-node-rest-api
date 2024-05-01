import { v4 as uuidv4 } from "uuid";

import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../helpers/sendEmail.js";
import {
  loginUser,
  registerUser,
  updateMyAvatarService,
} from "../services/userService.js";

// userController.js
export const register = catchAsync(async (req, res) => {
  const { newUser } = await registerUser(req.body);

  // Викличіть функцію надсилання листа для верифікації email
  await sendEmail(newUser.email, newUser.verificationToken);

  res.status(201).json({
    message: "success! Check your email for verification link",
    user: newUser,
  });
});

export const login = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Перевірити, чи користувач знайдений та чи верифікований його email
  if (!user || !user.verify)
    throw HttpError(401, "Unauthorized - email not verified");

  const { token } = await loginUser(req.body);

  const loginedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  res.status(200).json({
    message: "success!",
    user: loginedUser,
  });
});

export const logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(
    _id,
    { token: null },
    { new: true }
  );

  if (!user) throw HttpError(401);

  res.sendStatus(204);
});

export const updateUserSubscription = catchAsync(async (req, res) => {
  const { subscription } = req.body;

  const { _id } = req.user;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  if (!updatedUser) throw HttpError(401);

  res.status(200).json({
    message: "Subscription updated successfully",
    user: updatedUser,
  });
});

export const getCurrentUser = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

export const updateMyAvatar = catchAsync(async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updatedUser = await updateMyAvatarService(req.user, req.file, {
    new: true,
  });

  res.status(200).json({
    user: updatedUser,
  });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");
  user.verificationToken = null;
  user.verify = true;
  await user.save();

  res.status(200).json({ message: "Verification successful" });
});

export const resendVerificationEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw HttpError(404, "User not found");

  if (user.verify) throw HttpError(409, "Email already verified");

  // Генеруємо новий токен верифікації
  const newVerificationToken = uuidv4();

  // Оновлюємо токен верифікації для користувача
  user.verificationToken = newVerificationToken;
  await user.save();

  // Відправляємо новий лист з посиланням для верифікації
  await sendEmail(user.email, user.verificationToken);

  res.status(200).json({ message: "Verification email resent successfully" });
});
