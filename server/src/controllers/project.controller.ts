import type { Request, Response } from "express";
import { CreateProjectDTO } from "../../../shared/types";
import Project from "../models/project.model";
import cloudinary from "../utils/cloudinary";
import fs from "fs";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, images, category }: CreateProjectDTO = req.body;
    const project = await Project.create({
      title,
      description,
      images,
      category,
      author: req.userId,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.query;

    const filter: any = {};

    if (authorId) {
      filter.author = authorId;
    }

    const projects = await Project.find(filter)
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
    res.status(200).json(proj);
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

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, images, category }: CreateProjectDTO = req.body;
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        images,
        category,
        author: req.userId,
      },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const uploadImagesRoute = async (req: Request, res: Response) => {
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const uploadPromises = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "uploads",
      });

      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      return {
        url: result.url,
        publicId: result.public_id,
      };
    });

    const uploadImages = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: "Image uploaded and local file deleted",
      images: uploadImages,
    });
  } catch (error: any) {
    console.error("Cloudinary error:", error);
    return res.status(500).json({
      success: false,
      message: "Upload to Cloudinary failed",
      error: error.message,
    });
  }
};

//delete image from proj
