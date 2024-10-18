import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const requestPasswordReset = (email) => {
    return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = (token, password) => {
    return axios.post(`${API_URL}/reset-password`, { token, password });
};

