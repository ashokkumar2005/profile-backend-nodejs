require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('MongoDB connected');
    try {
        const admin = new Admin({
            username: 'babajiashok8637@gmail.com',
            password: 'ashokbabaji8637'
        });
        await admin.save();
        console.log('Admin user babajiashok8637@gmail.com created successfully');
    } catch (err) {
        if (err.code === 11000) {
            console.log('Admin already exists, updating password...');
            const existing = await Admin.findOne({ username: 'babajiashok8637@gmail.com' });
            existing.password = 'ashokbabaji8637';
            await existing.save();
            console.log('Admin password updated successfully');
        } else {
            console.error('Error creating admin:', err);
        }
    }
    process.exit(0);
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
