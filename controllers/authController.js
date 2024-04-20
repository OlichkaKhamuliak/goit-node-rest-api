import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import { signToken } from "../servises/jwtServise.js";
import { loginUser, registerUser } from "../servises/userServise.js";

export const register = catchAsync(async (req, res) => {
  const { newUser } = await registerUser(req.body);

  res.status(201).json({
    message: "success!",
    user: newUser,
  });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);

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

  const user = await User.findByIdAndUpdate(_id, { token: null });

  if (!user) throw HttpError(401);

  res.sendStatus(204);
});

export const getMe = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};
