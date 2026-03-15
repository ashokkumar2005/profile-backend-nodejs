const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  tech:        { type: [String], default: [] },
  github:      { type: String, default: '' },
  demo:        { type: String, default: '' },
  image:       { type: String, default: '' },
  order:       { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
