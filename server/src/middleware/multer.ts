import multer from "multer";
import { Request } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "uploads/");
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_, file, callback) {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const isImage = allowedTypes.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const isMimetype = allowedTypes.test(file.mimetype);

    if (isImage && isMimetype) {
      return callback(null, true);
    } else {
      callback(new Error("Only images are allowed (jpeg, jpg, png, webp)"));
    }
  },
});
