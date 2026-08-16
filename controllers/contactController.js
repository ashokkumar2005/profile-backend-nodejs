import ContactMessage from "../models/ContactMessage.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// POST /api/contact — public. Visitor submits the contact form.
export const submitMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Name, email, and message are required");
  }
  const saved = await ContactMessage.create({ name, email, message });
  res.status(201).json({ message: "Message received", id: saved._id });
});

// GET /api/contact — admin only. List messages, newest first.
export const listMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

// PATCH /api/contact/:id/read — admin only.
export const markRead = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json(msg);
});

// DELETE /api/contact/:id — admin only.
export const deleteMessage = asyncHandler(async (req, res) => {
  const msg = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!msg) {
    res.status(404);
    throw new Error("Message not found");
  }
  res.json({ message: "Deleted", id: req.params.id });
});
