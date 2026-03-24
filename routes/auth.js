const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const Admin   = require('../models/Admin');

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'portfolio_secret_key', { expiresIn: '7d' });

// POST /api/auth/setup  – one-time admin creation
router.post('/setup', async (req, res) => {
  try {
    const existing = await Admin.findOne();
    if (existing) return res.status(400).json({ error: 'Admin already exists' });
    const admin = await Admin.create(req.body);
    res.status(201).json({ token: sign(admin._id), message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token: sign(admin._id), message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
