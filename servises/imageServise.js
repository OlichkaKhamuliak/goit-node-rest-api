import multer from "multer";
import HttpError from "../helpers/HttpError.js";
import { v4 } from "uuid";
import path from "path";
import * as fse from "fs-extra";
import sharp from "sharp";

export class ImageServise {
  static initUploadImageMiddleware(fieldName) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, callback) => {
      if (file.mimetype.startsWith("image/")) {
        callback(null, true);
      } else {
        callback(HttpError(400), "Please, upload images only", false);
      }
    };
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(fieldName);
  }

  //tmp //users //public/avatars
  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 1 * 1024 * 1024)
    ) {
      throw HttpError(400, "File is too large");
    }
    const fileName = `${v4()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize({
        height: options?.heitht ?? 250,
        width: options?.width ?? 250,
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}
