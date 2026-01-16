import { Router } from "express";
import {
  login,
  register,
  getMe,
  uploadAvatar,
  deleteAvatar,
} from "../controllers/user.controller";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

router.post("/avatar", checkAuth, upload.single("image"), uploadAvatar);
router.delete("/avatar", checkAuth, deleteAvatar);
export default router;


