// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleStartTest = () => {
        navigate('/test'); // Navigate to the Test page
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Mock Test Dashboard</h1>
            <p>Here are the instructions to take your test:</p>
            <ol>
                <li>Ensure you are in a quiet environment with minimal distractions.</li>
                <li>You will have a limited time to complete the test.</li>
                <li>Read each question carefully before answering.</li>
                <li>Once you start, you cannot pause the test.</li>
                <li>Good luck!</li>
            </ol>
            <button onClick={handleStartTest}>Start Test</button>
        </div>
    );
};

export default Dashboard;
