import type { Request, Response } from "express";
import { CreateProjectDTO } from "../../../shared/types";
import Project from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, images, category }: CreateProjectDTO = req.body;
    const project = await Project.create({
      title,
      description,
      images,
      category,
      author: req?.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}; // дописать для поиска и филтрации..

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const proj = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author");
    if (!proj) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(201).json(proj);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Project.deleteOne({
      _id: id,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Cant delete Projetc" });
  }
};

// export const getProjectById = async (req: Request, res: Response) => {
//   try {
//     const projectId = req.params.id;
//     Project.findByIdAndUpdate({}, {}, {});
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getOneProj = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const proj = await Project.findById(id);
//     if (!proj) {
//       return res.status(404).json({ message: "Project not found" });
//     }
//     await proj.save();
//     res.status(201).json(proj);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
