import { Router } from "express";
import {
  login,
  register,
  getMe,
  uploadAvatar,
  deleteAvatar,
  meUpdate,
} from "../controllers/user.controller";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../middleware/multer";

const router = Router();


//auth
router.post("/register", register);
router.post("/login", login);

//current user
router.get("/me", checkAuth, getMe);
router.patch("/me", checkAuth, meUpdate);
// router.delete("/me/", checkAuth, meUpdate);

//avatar
router.post("/avatar", checkAuth, upload.single("image"), uploadAvatar);
router.delete("/avatar", checkAuth, deleteAvatar);
export default router;


