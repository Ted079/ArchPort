import { model, Schema } from "mongoose";
import { IProject, ProjectCategory } from "../../../shared/types";

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
    },
    location: {
      type: String,
    },
    square: {
      type: Number,
    },
    firm: {
      type: String,
      required: false,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      enum: Object.values(ProjectCategory),
      required: true,
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
  },
);

ProjectSchema.index({ title: "text", description: "text" });
ProjectSchema.index({ category: 1, createdAt: -1 });
ProjectSchema.index({ tags: 1});

const Project = model("Project", ProjectSchema);
export default Project;
