import { IUser } from "./user.types";

export enum ProjectCategory {
  ARCHITECTURE = "architecture",
  INTERIOR = "interior",
  LANDSCAPE = "landscape",
  URBAN = "urban",
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category?: ProjectCategory;
  author: string | IUser;
  views: number;
  // likes: string[],

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectDTO {
  title: string;
  description: string;
  images: string[];
  category: ProjectCategory;
}
