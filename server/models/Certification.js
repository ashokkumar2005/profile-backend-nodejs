import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: String,
    date: String,
    credentialUrl: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Certification", certificationSchema);
