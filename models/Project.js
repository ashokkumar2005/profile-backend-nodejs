import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    period: { type: String },
    shortDescription: { type: String },
    stack: [{ type: String }],
    features: [{ type: String }],
    status: { type: String, enum: ["Live", "In Progress", "Archived"], default: "Live" },
    githubUrl: String,
    liveUrl: String,
    frontendUrl: String,
    backendUrl: String,
    bannerUrl: String,
    overview: String,
    problemStatement: String,
    solution: String,
    architecture: String,
    challenges: String,
    futureImprovements: String,
    gallery: [{ type: String }],
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
