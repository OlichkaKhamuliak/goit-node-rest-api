import { checkToken } from "../servises/jwtServise.js";
import {
  checkUserExistsService,
  getUserByIdService,
} from "../servises/userServise.js";
import HttpError from "./HttpError.js";
import { catchAsync } from "./catchAsync.js";
import { ImageServise } from "../servises/imageServise.js";

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

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cbk) => {
//     cbk(null, path.join("public", "avatars"));
//   },
//   filename: (req, file, cbk) => {
//     const extension = file.mimetype.split("/")[1];
//     cbk(null, `${req.user.id}-${v4()}.${extension}`);
//   },
// });

// const multerFilter = (req, file, callback) => {
//   if (file.mimetype.startsWith("image/")) {
//     callback(null, true);
//   } else {
//     callback(HttpError(400), "Please, upload images only", false);
//   }
// };

// const MB_SIZE = 1024 * 1024;

// export const uploadAvatar = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
//   limits: { fileSize: 2 * MB_SIZE },
// }).single("avatarURL");
export const uploadAvatar = ImageServise.initUploadImageMiddleware("avatarURL");
