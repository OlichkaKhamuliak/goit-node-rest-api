import { userRoles } from "../constans/userRoles.js";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/userModel.js";
import { signToken } from "./jwtServise.js";

/**
 * Create user service.
 * @param {Object} userData
 * @returns {Promise<User>}
 *
 * @author Olha
 * @cathegory services
 */
export const createUserService = async (userData) => {
  const newUser = await User.create(userData);

  newUser.password = undefined;

  return newUser;
};

/**
 * Get users list
 * @returns {Promise<Object>}
 */
export const getUsersService = () => User.find();

/**
 * Update user
 */
export const updateUserService = (user, userData) => {
  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

/**
 * Delete user
 */
export const deleteUserService = (id) => User.findByIdAndDelete(id);

/**
 * Check if user exists by filter
 */
export const checkUserExistsService = (filter) => User.exists(filter);

/**
 * Get user by id
 */
export const getUserByIdService = (id) => User.findById(id);

export const registerUser = async (userData) => {
  const newUser = await User.create({
    ...userData,
    subscription: userRoles.STARTER,
  });
  const userExists = await checkUserExistsService({ email: req.body.email });

  if (userExists) throw HttpError(409, "User with this email already exists");
  newUser.password = undefined;

  const token = signToken(newUser.id);

  return { newUser, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw HttpError(401);

  const passwordIsValid = await user.checkUserPassword(password, user.password);

  if (!passwordIsValid) throw HttpError(401);

  user.password = undefined;
  const token = signToken(user.id);

  return { user, token };
};
