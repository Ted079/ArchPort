import express, { Router } from "express";
import { login, register, getMe } from "../controllers/user.controller";

const router = Router();

router.post("/regitser", register);

router.post("/login", login);

router.get("/me", getMe);

export default router;
