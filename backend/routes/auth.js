const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();

// Reset Password Form Route
router.get('/reset-password/:token', (req, res) => {
    const token = req.params.token;
    res.send(`
        <html>
            <head>
                <title>Reset Password</title>
                <link rel="stylesheet" href="/app.css"> <!-- Adjusted path -->
            </head>
            <body>
                <div class="container">
                    <h2>Reset Password</h2>
                    <form action="/api/reset-password/${token}" method="POST">
                        <input type="password" name="password" placeholder="Enter your new password" required />
                        <button type="submit">Reset Password</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

// Reset Password POST Route
router.post('/reset-password/:token', resetPassword); // Ensure this route is defined

module.exports = router;
