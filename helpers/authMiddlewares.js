import { checkToken } from "../servises/jwtServise.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../servises/userServise.js";
import HttpError from "./HttpError.js";
import { catchAsync } from "./catchAsync.js";

export const checkRegisterData = catchAsync(async (req, _, next) => {
  const userExists = await checkUserExistsService({ email: req.body.email });

  if (userExists) throw HttpError(409, "User with this email already exists");

  next();
});

export const protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = checkToken(token);

  if (!userId) throw HttpError(401);

  const currentUser = await getUserByIdService(userId);

  if (!currentUser) throw HttpError(401);

  req.user = currentUser;

  next();
});
