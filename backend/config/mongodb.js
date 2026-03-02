const mongoose = require('mongoose');

const connectDB = async () => {
    console.log('Attempting to connect to MongoDB...', process.env.MONGODB_URI?.split('@')[1] || 'URI MISSING');
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
    }
};

module.exports = connectDB;
