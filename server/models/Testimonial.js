import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: String,
    quote: { type: String, required: true },
    avatarUrl: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
