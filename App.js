// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard'; // Ensure this is correct
import Score from './components/Score';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/score" element={<Score/>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
