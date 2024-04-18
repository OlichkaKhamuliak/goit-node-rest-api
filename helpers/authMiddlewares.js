import { checkUserExistsService } from "../servises/userServise.js";
import HttpError from "./HttpError.js";
import { catchAsync } from "./catchAsync.js";

export const checkRegisterData = catchAsync(async (req, _, next) => {
  const userExists = await checkUserExistsService({ email: req.body.email });

  if (userExists) throw HttpError(409, "User with this email already exists");

  next();
});
