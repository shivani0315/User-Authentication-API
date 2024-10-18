const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authController = require('./controllers/authController');
const routes = require('./routes/auth');
const path = require('path');

dotenv.config();
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'frontend/src'))); // Adjust the path as needed


// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use('/api', routes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((error) => console.error('Database connection error:', error));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Password Reset API');
});

// Routes
app.post('/forgot-password', authController.forgotPassword);
app.post('/reset-password', authController.resetPassword);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
