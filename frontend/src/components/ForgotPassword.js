// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update to include '/api' in the URL
            await axios.post('http://localhost:5000/forgot-password', { email });
            setMessage('Check your email for reset instructions.');
            setError(false);
        } catch (error) {
            setMessage('Error sending reset email.');
            setError(true);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn btn-primary mt-2">Send Reset Link</button>
            </form>
            {message && (
                <div className={`alert ${error ? 'error' : 'success'}`}>{message}</div>
            )}
        </div>
    );
}

export default ForgotPassword;
