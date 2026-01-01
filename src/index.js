import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import './Assets/Css/Main.css';
import './Assets/Css/Style.css';
import './Assets/Css/Responsive.css';
import './Assets/Css/CustomFonts.css';
import './Services/i18n'; 
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    <App />
    <ToastContainer />
    </Router>
);


