const router  = require('express').Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const Profile = require('../models/Profile');
const auth    = require('../middleware/auth');

// ── Multer config ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = file.fieldname === 'resume'
      ? path.join(__dirname, '../uploads/resume')
      : path.join(__dirname, '../uploads/images');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = {
      profileImage: /jpeg|jpg|png|webp/,
      resume: /pdf/
    };
    const pattern = allowed[file.fieldname];
    if (pattern && pattern.test(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.fieldname}`));
    }
  }
});

const getOrCreate = async () => {
  let profile = await Profile.findOne();
  if (!profile) profile = await Profile.create({});
  return profile;
};

// GET /api/profile  – public
router.get('/', async (req, res) => {
  try {
    const profile = await getOrCreate();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/profile  – admin only
router.put('/', auth, async (req, res) => {
  try {
    const profile = await getOrCreate();
    const allowed = ['name', 'role', 'bio', 'about', 'address', 'contact', 'skills'];
    allowed.forEach(k => { if (req.body[k] !== undefined) profile[k] = req.body[k]; });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile/upload-image  – admin only
router.post('/upload-image', auth, upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    const profile = await getOrCreate();
    profile.profileImage = `/uploads/images/${req.file.filename}`;
    await profile.save();
    res.json({ profileImage: profile.profileImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/profile/upload-resume  – admin only
router.post('/upload-resume', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No resume uploaded' });
    const profile = await getOrCreate();
    profile.resume = `/uploads/resume/${req.file.filename}`;
    await profile.save();
    res.json({ resume: profile.resume });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
