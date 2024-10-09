import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getQuestions, submitTest } from '../api'; // Import submitTest from api
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './test.css';

const Test = () => {
    const { currentUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(900);
    const [score, setScore] = useState(null);
    const [testEnded, setTestEnded] = useState(false);  // Flag to track if the test ended
    const navigate = useNavigate();

    // Handle submit score
    const handleSubmitScore = useCallback(async () => {
        console.log('User answers:', userAnswers);  // Log user answers for debugging
        
        // Calculate the total score based on correct answers
        const correctAnswers = questions.filter((question) => 
            parseInt(userAnswers[question.id], 10) === question.correct_option
        ).length;

        const calculatedScore = correctAnswers;  // Total number of correct answers
        console.log('Calculated score:', calculatedScore);  // Log the score for debugging

        const userId = parseInt(currentUser.id, 10);

        try {
            const result = await submitTest({
                userId, 
                score: calculatedScore, 
                userAnswers, 
                questions 
            });
            console.log(result);  // Log the result for debugging

            setScore(calculatedScore); // Set the score in the state
            sessionStorage.removeItem('testStarted'); // Remove the test started flag
            setTestEnded(true);  // Mark the test as ended

            // Navigate to the score page and pass the score, answers, and questions
            navigate('/score', { state: { score: calculatedScore, userId, userAnswers, questions } });
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    }, [questions, userAnswers, currentUser, navigate]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions();

                // Log the whole response to inspect its structure
                console.log('Fetched questions response:', response);

                // Assuming response is an array of questions directly
                if (Array.isArray(response) && response.length > 0) {
                    setQuestions(response);
                } else {
                    setError('No questions available');
                }
            } catch (err) {
                console.error('Failed to fetch questions:', err);
                setError('Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    // Timer countdown
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    handleSubmitScore(); // Submit score when time runs out
                    return 0; // Reset timer to 0
                }
                return prevTimer - 1; // Decrement the timer
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [handleSubmitScore]);

    // Check if the test has already started or ended
    useEffect(() => {
        if (sessionStorage.getItem('testStarted')) {
            console.log('Test already started, ending test...');
            setTestEnded(true);  // Mark test as ended if refresh detected
            handleSubmitScore();  // Automatically submit score if refresh is detected
        } else {
            console.log('Starting test for the first time...');
            sessionStorage.setItem('testStarted', 'true');  // Set flag to indicate test started
        }

        return () => {
            sessionStorage.removeItem('testStarted'); // Clean up when component unmounts or test ends
        };
    }, [handleSubmitScore]);

    // Handle answer selection and update userAnswers state
    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: parseInt(answer, 10), // Store the selected answer as a number
        }));
    };

    // Retake test function
    const handleRetakeTest = () => {
        setUserAnswers({});
        setScore(null);
        setTimer(900);
        setTestEnded(false);
        sessionStorage.setItem('testStarted', 'true');  // Reset test flag
        setLoading(true);

        // Re-fetch the questions
        const fetchQuestions = async () => {
            try {
                const response = await getQuestions();
                if (response && response.questions && response.questions.length > 0) {
                    setQuestions(response.questions);
                } else {
                    setError('No questions available');
                }
            } catch (err) {
                console.error('Failed to fetch questions:', err);
                setError('Failed to fetch questions');
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    };

    // If loading, show a loading message
    if (loading) {
        return <div>Loading questions...</div>;
    }

    // If error occurred, show the error message
    if (error) {
        return <div>{error}</div>;
    }

    // If test ended, show the retake button and score
    if (testEnded) {
        return (
            <div>
                <h3>Your test has ended.</h3>
                {score !== null && <h3>Your Score: {score}</h3>}
                <button onClick={handleRetakeTest}>Retake Test</button>
            </div>
        );
    }

    // Display the test with questions and answer options
    return (
    <div className='test-page'>
        <div className='test-container'>
            <h2>Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</h2>
            {questions.map((question, index) => (
                <div key={question.id}>
                    <h4>{question.text}</h4>
                    <div>
                        <input 
                            type="radio" 
                            name={`question${index}`} 
                            value="1" 
                            onChange={() => handleAnswerChange(question.id, '1')} 
                        /> {question.option1}<br />
                        <input 
                            type="radio" 
                            name={`question${index}`} 
                            value="2" 
                            onChange={() => handleAnswerChange(question.id, '2')} 
                        /> {question.option2}<br />
                        <input 
                            type="radio" 
                            name={`question${index}`} 
                            value="3" 
                            onChange={() => handleAnswerChange(question.id, '3')} 
                        /> {question.option3}<br />
                        <input 
                            type="radio" 
                            name={`question${index}`} 
                            value="4" 
                            onChange={() => handleAnswerChange(question.id, '4')} 
                        /> {question.option4}<br />
                    </div>
                </div>
            ))}
            <button onClick={handleSubmitScore}>Submit Test</button>
        </div>
    </div>
    );
};

export default Test;
