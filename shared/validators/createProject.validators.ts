import { z } from "zod";
import { createProjectSchema } from "./project.validators";

// for createProject from frontend
export const createProjectFormSchema = createProjectSchema.extend({
  images: z
    .custom<FileList | File[]>()
    .refine((files) => files.length > 0, "Please select at least one image")
    .refine((files) => files.length <= 10, "Maximum 5 images")
    .transform((files) => Array.from(files))
    .refine((files) =>
      files.every(
        (file) => file.size <= 5 * 1024 * 1024,
        "Each file must not exceed 5MB",
      ),
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            file.type,
          ),
        ),
      "Only PNG, JPG, WebP, JPEG",
    ),
});

export type CreateProjectFormInput = z.input<typeof createProjectFormSchema>;
export type CreateProjectFormOutput = z.output<typeof createProjectFormSchema>;
