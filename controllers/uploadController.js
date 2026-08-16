import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { asyncHandler } from "../middleware/errorHandler.js";
import { uploadBufferToCloudinary } from "../config/cloudinary.js";

// POST /api/upload — admin only. Expects multipart/form-data with an
// "image" field (see routes/uploadRoutes.js, which uses multer memoryStorage).
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  // Check if Cloudinary is configured
  const hasCloudinary = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET;

  if (hasCloudinary) {
    try {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      return res.status(201).json({
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      console.warn("Cloudinary upload failed, attempting local fallback:", err.message);
    }
  }

  // Local fallback: save to uploads/ directory
  const ext = path.extname(req.file.originalname) || ".jpg";
  const filename = `${crypto.randomBytes(16).toString("hex")}${ext}`;
  const uploadDir = path.join(process.cwd(), "uploads");

  // Ensure directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, req.file.buffer);

  // Return server host relative URL
  const serverUrl = `${req.protocol}://${req.get("host")}/uploads/${filename}`;

  res.status(201).json({
    url: serverUrl,
    publicId: filename,
  });
});
