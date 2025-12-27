import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjectById } from "../controllers/project.controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.delete("/:id", checkAuth, deleteProject);

router.post("/", checkAuth, createProject);

export default router;