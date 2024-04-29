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
    const tmpDir = path.join(process.cwd(), "tmp");
    const publicAvatarsDir = path.join(process.cwd(), "public", "avatars");

    await fse.ensureDir(tmpDir);
    const resizedImageBuffer = await sharp(file.buffer)
      .resize({
        height: options?.heitht ?? 250,
        width: options?.width ?? 250,
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    // Save resized image to temporary directory
    await fse.outputFile(path.join(tmpDir, fileName), resizedImageBuffer);
    console.log("Image saved in tmp directory:", tmpDir, fileName);

    // Move image to public/avatars directory
    const userAvatarPath = path.join(
      publicAvatarsDir,
      `${pathSegments[0]}_${fileName}`
    );
    await fse.move(path.join(tmpDir, fileName), userAvatarPath);

    // Construct avatar URL
    const avatarURL = `/avatars/${pathSegments[0]}_${fileName}`;

    return avatarURL;
  }
}
