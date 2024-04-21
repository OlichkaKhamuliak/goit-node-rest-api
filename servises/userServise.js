import { userSubscription } from "../constans/userSubscription.js";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtServise.js";

/**
 * Check if user exists by filter
 */
export const checkUserExistsService = (filter) => User.exists(filter);

/**
 * Get user by id
 */
export const getUserByIdService = (id) => User.findById(id);

/**
 * Register user
 */
export const registerUser = async (userData) => {
  const userExists = await checkUserExistsService({ email: userData.email });

  if (userExists) throw HttpError(409, "User with this email already exists");

  const newUser = await User.create({
    ...userData,
    subscription: userSubscription.STARTER,
  });

  newUser.password = undefined;

  return { newUser };
};

/**
 * Register user with token
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401);

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401);

  user.password = undefined;

  const token = signToken(user.id);

  return { user, token };
};
