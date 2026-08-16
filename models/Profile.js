import mongoose from "mongoose";

// Singleton document — there is only ever one Profile record.
const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    roles: [{ type: String }],
    tagline: { type: String },
    summary: { type: String },
    location: { type: String },
    email: { type: String },
    phone: { type: String },
    avatarUrl: { type: String },
    coverImageUrl: { type: String },
    resumeUrl: { type: String },
    socials: {
      github: String,
      linkedin: String,
      portfolio: String,
      whatsapp: String,
    },
    seo: {
      title: String,
      description: String,
    },
    theme: {
      logo: String,
      favicon: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);
