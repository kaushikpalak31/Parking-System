// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize dotenv to load environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies

// Environment variables
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/parking-management';

// Connect to MongoDB
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Define routes
app.use('/api/auth', require('./routes/auth')); // User Management APIs
// Add other routes as you expand your project

// Health check route
app.get('/', (req, res) => {
    res.send('Parking Management System backend is running.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
