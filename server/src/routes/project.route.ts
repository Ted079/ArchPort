import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  updateProject,
  uploadImagesRoute,
} from "../controllers/project.controller";
import { checkAuth } from "../middleware/checkAuth";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/:id/upload", checkAuth, upload.array("images", 10), uploadImagesRoute);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);

router.delete("/:id", checkAuth, deleteProject);
router.patch("/:id", checkAuth, updateProject);
router.post("/", checkAuth, createProject);

export default router;
