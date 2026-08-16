// Run with: npm run seed:admin
// Reads ADMIN_USERNAME / ADMIN_PASSWORD from .env, hashes the password,
// and creates (or updates) the single admin account. Remove those two
// lines from .env after running this once — the hash is what's stored.
import "dotenv/config";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

async function run() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error("Set ADMIN_USERNAME and ADMIN_PASSWORD in .env before running this script.");
    process.exit(1);
  }
  if (ADMIN_PASSWORD.length < 8) {
    console.error("ADMIN_PASSWORD should be at least 8 characters.");
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await Admin.hashPassword(ADMIN_PASSWORD);
  const admin = await Admin.findOneAndUpdate(
    { username: ADMIN_USERNAME },
    { username: ADMIN_USERNAME, passwordHash },
    { upsert: true, new: true }
  );

  console.log(`Admin account ready: ${admin.username}`);
  console.log("Now remove ADMIN_USERNAME / ADMIN_PASSWORD from .env — they're no longer needed.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
