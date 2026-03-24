const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name:    { type: String, required: true, default: 'Ashokkumar T' },
  role:    { type: String, default: 'MERN Stack Developer' },
  bio:     { type: String, default: 'Passionate developer focused on building scalable backend systems using Node.js, Express, and MongoDB.' },
  about:   { type: String, default: '' },
  address: {
    street:   { type: String, default: 'East Street, Kazhumangalam' },
    post:     { type: String, default: 'Udayarpalayam Post' },
    district: { type: String, default: 'Ariyalur District' },
    state:    { type: String, default: 'Tamil Nadu' },
    pincode:  { type: String, default: '621 806' },
    country:  { type: String, default: 'India' }
  },
  contact: {
    email:    { type: String, default: 'ashokkumar@example.com' },
    github:   { type: String, default: 'https://github.com/ashokkumar' },
    location: { type: String, default: 'Ariyalur, Tamil Nadu' }
  },
  skills: {
    frontend: { type: [String], default: ['HTML', 'CSS', 'JavaScript', 'React (basic)'] },
    backend:  { type: [String], default: ['Node.js', 'Express.js', 'REST API Development'] },
    database: { type: [String], default: ['MongoDB', 'Mongoose'] },
    features: { type: [String], default: ['JWT Authentication', 'Middleware', 'Error Handling', 'File Upload (Multer)', 'Logging (Morgan)', 'Security (Helmet, CORS)'] },
    tools:    { type: [String], default: ['Git', 'GitHub', 'Postman', 'VS Code'] }
  },
  profileImage: { type: String, default: '' },
  resume:       { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
