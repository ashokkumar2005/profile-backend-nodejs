const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Project = require('../models/Project');
const auth    = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/images');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `project-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/jpeg|jpg|png|webp/.test(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'));
    }
  }
});

// GET /api/projects  – public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/projects  – admin only
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, github, demo, order } = req.body;
    const tech = req.body.tech
      ? (typeof req.body.tech === 'string' ? req.body.tech.split(',').map(t => t.trim()) : req.body.tech)
      : [];
    const project = await Project.create({
      title, description, tech, github, demo, order: order || 0,
      image: req.file ? `/uploads/images/${req.file.filename}` : ''
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/projects/:id  – admin only
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { title, description, github, demo, order } = req.body;
    if (title)       project.title       = title;
    if (description) project.description = description;
    if (github)      project.github      = github;
    if (demo)        project.demo        = demo;
    if (order)       project.order       = order;
    if (req.body.tech) {
      project.tech = typeof req.body.tech === 'string'
        ? req.body.tech.split(',').map(t => t.trim())
        : req.body.tech;
    }
    if (req.file) project.image = `/uploads/images/${req.file.filename}`;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/projects/:id  – admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
