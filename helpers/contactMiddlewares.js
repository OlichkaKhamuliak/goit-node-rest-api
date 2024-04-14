import { catchAsync } from "./catchAsync.js";
import HttpError from "./HttpError.js";
import { Types } from "mongoose";

export const checkUserId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isValidId = Types.ObjectId.isValid(id);

  if (!isValidId) throw HttpError(404);

  next();
});
