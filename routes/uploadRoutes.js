import { Router } from "express";
import multer from "multer";
import { uploadImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "application/octet-stream",
      "application/x-pdf",
      "application/vnd.pdf",
    ];
    const mime = file.mimetype || "";
    if (!allowed.includes(mime) && !mime.startsWith("image/")) {
      return cb(new Error("Only JPEG, PNG, WEBP, and PDF files are allowed"));
    }
    cb(null, true);
  },
});

const router = Router();

router.post("/", protect, upload.single("image"), uploadImage);

export default router;
