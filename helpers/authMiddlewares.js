import { checkToken } from "../services/jwtService.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../services/userService.js";
import HttpError from "./HttpError.js";
import { catchAsync } from "./catchAsync.js";
import { ImageService } from "../services/imageService.js";

export const checkRegisterData = catchAsync(async (req, _, next) => {
  const userExists = await checkUserExistsService({ email: req.body.email });

  if (userExists) throw HttpError(409, "User with this email already exists");

  next();
});

export const protect = catchAsync(async (req, _, next) => {
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

export const checkRegisterToken = (req, _, next) => {
  const { token } = req.user;

  if (!token) throw HttpError(401);

  next();
};

const maxFileSizeMB = 2;
export const uploadAvatar = ImageService.initUploadImageMiddleware(
  "avatarURL",
  maxFileSizeMB
);
