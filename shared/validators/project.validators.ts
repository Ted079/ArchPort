import { file, z } from "zod";
import { ProjectCategory } from "../types";

//both back and front
export const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "The title must not exceed 50 characters")
    .regex(
      /^[a-яА-Я\s'-]+$/i,
      "The name can only contain letters, spaces, and hyphens",
    ),

  description: z
    .string()
    .max(500, "The description should not exceed 500 characters")
    .min(1, "Description is required"),

  images: z.array(z.string()).default([]),
  category: z.enum(Object.values(ProjectCategory) as [string, ...string[]], {
    message: "Выберите категорию",
  }),
});

export type CreateProjectData = z.infer<typeof createProjectSchema>;
export type ProjectError = z.ZodError<CreateProjectData>;
