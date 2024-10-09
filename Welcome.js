import React from 'react';
import { Link } from 'react-router-dom';
import './welcome.css'; // Import the CSS file for animations

const Welcome = () => {
    return (
        <div className="welcome-container">
           
                <h1 className="welcome-title">
                    {'WELCOME'.split('').map((letter, index) => (
                        <span key={index} className={`drop-in letter-${index}`}>
                            {letter}
                        </span>
                    ))}
                </h1>
                


            <div className="welcome-buttons">
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Register</Link>
            </div>

            <div className="welcome-info">
                <h3>Why Mock Test Platform is Helpful:</h3>
                <ul>
                    <li className="info-left">Test your skills in JavaScript, HTML, and CSS.</li>
                    <li className="info-right">Practice with a variety of questions designed to challenge you.</li>
                    <li className="info-left">Improve your web development knowledge in an interactive way.</li>
                    <li className="info-right">Receive immediate feedback and scoring.</li>
                    <li className="info-left">Simulate real exam scenarios to boost your confidence.</li>
                </ul>
            </div>
        </div>
    );
};

export default Welcome;
