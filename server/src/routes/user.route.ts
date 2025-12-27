import { Router } from "express";
import { login, register, getMe } from "../controllers/user.controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

export default router;
