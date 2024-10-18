const User = require('../models/User'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // If you plan to use JWT, but not necessary for this functionality
const sendEmail = require('../utils/sendEmail'); // Ensure this utility is correctly implemented
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
        await user.save();

        // Create a reset URL
        const resetUrl = `${req.protocol}://${req.get('host')}/api/reset-password/${resetToken}`;
        const message = `
            <h2>Password Reset</h2>
            <p>Please click the following link to reset your password:</p>
            <a href="${resetUrl}">Reset Password</a>
        `;

        // Send email
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message,
        });

        res.json({ message: 'Reset link sent to your email' });
    } catch (err) {
        console.error('Error in forgotPassword:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token } = req.params; // Extract the token from the URL parameters
    const { password } = req.body; // New password to set

    try {
        // Find the user based on the reset token and its validity
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Check if token is still valid
        });

        // If the user is not found or token is invalid
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset token fields
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save(); // Save the updated user info

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error in resetPassword:', err); // Log the error for debugging
        res.status(500).json({ message: 'Server error' });
    }
};
