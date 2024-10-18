// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const token = query.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/reset-password/${token}`, { password });
            setMessage('Password updated successfully');
            setError(false);
        } catch (error) {
            setMessage('Error updating password');
            setError(true);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="password" 
                    placeholder="New password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn btn-primary mt-2">Update Password</button>
            </form>
            {message && (
                <div className={`alert ${error ? 'error' : 'success'}`}>{message}</div>
            )}
        </div>
    );
}

export default ResetPassword;
