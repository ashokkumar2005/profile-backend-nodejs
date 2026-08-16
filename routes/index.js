import { Router } from "express";
import authRoutes from "./authRoutes.js";
import profileRoutes from "./profileRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import contactRoutes from "./contactRoutes.js";
import { buildResourceRouter } from "./resourceRoutes.js";
import { createCRUDController } from "../controllers/crudFactory.js";

import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Education from "../models/Education.js";
import Achievement from "../models/Achievement.js";
import Certification from "../models/Certification.js";
import Testimonial from "../models/Testimonial.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/upload", uploadRoutes);
router.use("/contact", contactRoutes);

router.use("/skills", buildResourceRouter(createCRUDController(Skill)));
router.use("/projects", buildResourceRouter(createCRUDController(Project)));
router.use("/education", buildResourceRouter(createCRUDController(Education)));
router.use("/achievements", buildResourceRouter(createCRUDController(Achievement)));
router.use("/certifications", buildResourceRouter(createCRUDController(Certification)));
router.use("/testimonials", buildResourceRouter(createCRUDController(Testimonial)));

router.get("/health", (req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

export default router;
