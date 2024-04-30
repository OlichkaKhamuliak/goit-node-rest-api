import multer from "multer";
import HttpError from "../helpers/HttpError.js";
import { v4 } from "uuid";
import path from "path";
import * as fse from "fs-extra";
import sharp from "sharp";

export class ImageService {
  static initUploadImageMiddleware(fieldName, maxFileSizeMB) {
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
      limits: {
        fileSize: maxFileSizeMB * 1024 * 1024,
      },
    }).single(fieldName);
  }

  static async saveImage(file, options, ...pathSegments) {
    const fileName = `${v4()}.jpeg`;
    const tmpDir = path.join(process.cwd(), "tmp");
    const publicAvatarsDir = path.join(process.cwd(), "public", "avatars");

    await fse.ensureDir(tmpDir);
    const resizedImageBuffer = await sharp(file.buffer)
      .resize({
        height: options?.height ?? 250,
        width: options?.width ?? 250,
      })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    // Save resized image to temporary directory
    await fse.outputFile(path.join(tmpDir, fileName), resizedImageBuffer);

    // Move image to public/avatars directory
    const userAvatarPath = path.join(
      publicAvatarsDir,
      `${pathSegments}_${fileName}`
    );
    await fse.move(path.join(tmpDir, fileName), userAvatarPath);

    // Construct avatar URL
    const avatarURL = `/avatars/${pathSegments[0]}_${fileName}`;

    return avatarURL;
  }
}
