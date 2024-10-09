import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './score.css'; // Import the CSS file for Score component styles

const Score = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the score and other passed data from location state
    const { score, questions } = location.state || {};

    // Function to handle retaking the test
    const handleRetakeTest = () => {
        // Reset session storage or any relevant states for the test
        sessionStorage.removeItem('testStarted');

        // Redirect the user back to the Test component
        navigate('/test');
    };
    
    let feedbackMessage = '';
    if (score >= 7) { // Assuming score is out of 10
        feedbackMessage = 'Great job! Keep up the good work!';
    } else {
        feedbackMessage = "Don't worry! Practice makes perfect!";
    }

    return (
        <div className="score-page"> {/* Add this class for styling */}
            <h2>Your Test Results</h2>
            <h3>Your Score: {score !== undefined ? score : 'N/A'}</h3>
            <p>Correct Answers: {score} out of {questions.length}</p>
            <p>{feedbackMessage}</p>

            <div>
                <p>Thank you for taking the test!</p>
                <p>If you'd like, you can retake the test.</p>
                <button onClick={handleRetakeTest}>Retake Test</button>
            </div>
        </div>
    );
};

export default Score;
