import { Router } from "express";
import {
  submitMessage,
  listMessages,
  markRead,
  deleteMessage,
} from "../controllers/contactController.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.post("/", submitMessage);
router.get("/", protect, listMessages);
router.patch("/:id/read", protect, markRead);
router.delete("/:id", protect, deleteMessage);

export default router;
