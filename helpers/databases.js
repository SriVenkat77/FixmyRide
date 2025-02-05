const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config()

const connectDB = async () => {
    // Use MONGODB_URI from env or fallback to a default local connection string
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bike_service';

    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // Add timeout
        });

        console.log('Successfully connected to MongoDB'+ MONGODB_URI);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
