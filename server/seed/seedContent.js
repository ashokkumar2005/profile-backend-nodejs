// Run with: npm run seed:content
// One-time convenience script that migrates the resume-derived content
// from the frontend's src/data/profile.js into MongoDB, so the admin
// dashboard has real starting data instead of an empty database.
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Project from "../models/Project.js";
import Education from "../models/Education.js";

const profile = {
  name: "Ashokkumar T",
  roles: ["Full Stack MERN Developer", "REST API Builder", "React.js Engineer"],
  tagline:
    "I build scalable full-stack web applications — clean APIs on the backend, responsive interfaces on the front.",
  summary:
    "Enthusiastic Full Stack Developer with hands-on experience in the MERN stack, specializing in building scalable REST APIs and responsive user interfaces.",
  location: "Ariyalur, Tamil Nadu, India",
  email: "babajiashok8637@gmail.com",
  phone: "8637446615",
  socials: {
    github: "https://github.com/ashokkumar2005",
    portfolio: "https://ashok-portfolio-sam.vercel.app/",
    linkedin: "",
  },
};

const skills = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React.js"], order: 1 },
  { category: "Backend", items: ["Node.js", "Express.js"], order: 2 },
  { category: "Database", items: ["MongoDB"], order: 3 },
  { category: "Tools", items: ["Git", "GitHub", "Postman", "VS Code"], order: 4 },
  { category: "Deployment", items: ["Vercel", "Render"], order: 5 },
  {
    category: "Core Competencies",
    items: [
      "Full Stack Web Development",
      "REST API Development",
      "MongoDB Database Design",
      "JWT & Authentication",
      "Responsive Web Design",
      "Problem Solving",
      "Code Quality & Debugging",
      "Version Control (Git)",
    ],
    order: 6,
  },
];

const education = [
  {
    degree: "Bachelor of Engineering (B.E) — Computer Science and Engineering",
    school: "Nelliandavar Institute of Technology",
    period: "2022 — 2026",
    order: 1,
  },
  {
    degree: "Senior Secondary School",
    school: "Government Higher Secondary School, Ariyalur",
    period: "2020 — 2022",
    order: 2,
  },
];

const projects = [
  {
    name: "Hospital Management System",
    slug: "hospital-management-system",
    period: "Jan 2026 — Apr 2026",
    shortDescription:
      "A full-stack hospital management platform with role-based access for admins, doctors, and patients, appointment booking, blood donation management, and an AI symptom checker.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Role-based authentication for Admin, Doctor, and Patient modules",
      "Appointment booking system",
      "Blood donation and request management",
      "AI-assisted symptom checker",
      "RESTful API design with MongoDB data modeling",
      "Responsive, modern UI built with React.js",
    ],
    status: "Live",
    githubUrl: "https://github.com/ashokkumar2005",
    liveUrl: "https://ashok-portfolio-sam.vercel.app/",
    overview:
      "A MERN-stack system designed to digitize day-to-day hospital operations behind a single role-aware interface.",
    problemStatement:
      "Small and mid-sized hospitals often coordinate appointments, patient records, and blood donation requests manually, which is slow and error-prone.",
    solution:
      "A centralized web platform where each role sees only the tools relevant to them, backed by a REST API and MongoDB.",
    architecture:
      "React front end, Express/Node REST API, MongoDB via Mongoose, JWT-based auth middleware.",
    challenges:
      "Designing a single authentication system that cleanly branches into three role-based experiences.",
    futureImprovements:
      "Real-time notifications, an analytics dashboard for admins, SMS/email reminders.",
    order: 1,
    featured: true,
  },
  {
    name: "One Piece Portfolio Website",
    slug: "one-piece-portfolio",
    shortDescription:
      "An anime-themed personal portfolio built with React and Vite, showcasing projects and skills through reusable components with smooth client-side navigation.",
    stack: ["React.js", "Vite", "React Router"],
    features: [
      "Anime-themed responsive design",
      "Reusable React component architecture",
      "Client-side routing with React Router",
      "Interactive, animated UI elements",
    ],
    status: "Live",
    githubUrl: "https://github.com/ashokkumar2005",
    liveUrl: "https://ashok-portfolio-sam.vercel.app/",
    overview: "A themed take on the classic developer portfolio, built to practice component reuse and routing.",
    problemStatement: "Generic portfolio templates tend to blend together and don't reflect any personal identity.",
    solution: "Built a fully custom, anime-inspired UI from scratch, keeping every section reusable.",
    architecture: "Vite-powered React SPA with React Router handling navigation.",
    challenges: "Balancing a strong visual theme with usability and fast load times.",
    futureImprovements: "Add a blog section and dark/light theme toggle.",
    order: 2,
  },
];

async function run() {
  await connectDB();

  await Profile.findOneAndUpdate({}, profile, { upsert: true });
  await Skill.deleteMany({});
  await Skill.insertMany(skills);
  await Education.deleteMany({});
  await Education.insertMany(education);
  await Project.deleteMany({});
  await Project.insertMany(projects);

  console.log("Content seeded: profile, skills, education, projects.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
