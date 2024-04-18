import { userRoles } from "../constans/userRoles.js";
import HttpError from "../helpers/HttpError.js";
import { catchAsync } from "../helpers/catchAsync.js";
import { User } from "../models/userModel.js";
import { signToken } from "../servises/jwtServise.js";
import { loginUser, registerUser } from "../servises/userServise.js";

export const register = catchAsync(async (req, res) => {
  const { newUser, token } = await registerUser(req.body);

  newUser.token = token;

  res.status(201).json({
    message: "success!",
    user: newUser,
  });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUser(req.body);
  user.token = token;

  res.status(201).json({
    message: "success!",
    user,
  });
});
