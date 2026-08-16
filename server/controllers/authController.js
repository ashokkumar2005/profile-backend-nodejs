import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler } from "../middleware/errorHandler.js";

// POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Username and password are required");
  }

  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  res.json({
    token: generateToken(admin),
    admin: { id: admin._id, username: admin.username },
  });
});

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-passwordHash");
  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  res.json(admin);
});
