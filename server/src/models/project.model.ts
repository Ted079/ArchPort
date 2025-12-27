import { model, Schema } from "mongoose";
import { IProject, ProjectCategory } from "../../../shared/types";

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 20,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    images: {
      type: [String],
      //   required: [true, "At least one image is required"],
      required: false,
    },
    category: {
      type: String,
      enum: Object.values(ProjectCategory),
      //   required: [true, "category is required"],
      required: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ title: "text", description: "text" });
ProjectSchema.index({ category: 1, createdAt: -1 });

const Project = model("Project", ProjectSchema);
export default Project;
