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
  // author: string | IUser;
  author:  IUser;
  views: number;
  // likes: string[],

  createdAt: Date;
  updatedAt: Date;
}

// export interface IProjectPopulated extends Omit<IProject, "author"> {
//   author: IUser;
// }

export interface CreateProjectDTO {
  title: string;
  description: string;
  images: string[];
  category: ProjectCategory;
}
