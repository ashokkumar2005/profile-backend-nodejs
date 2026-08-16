import Profile from "../models/Profile.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// GET /api/profile — public. Creates an empty profile on first call so the
// admin panel always has a document to edit.
export const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({ name: "Your Name" });
  }
  res.json(profile);
});

// PUT /api/profile — admin only. Upserts the single profile document.
export const updateProfile = asyncHandler(async (req, res) => {
  const existingProfile = await Profile.findOne();

  const mergedProfile = {
    ...(existingProfile?.toObject() || {}),
    ...req.body,
    socials: {
      ...(existingProfile?.socials || {}),
      ...(req.body?.socials || {}),
    },
  };

  const profile = await Profile.findOneAndUpdate({}, mergedProfile, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  res.json(profile);
});
