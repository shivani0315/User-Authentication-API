// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated for React 18
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
