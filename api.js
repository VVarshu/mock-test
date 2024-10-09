import axios from 'axios';

// Set base API URL
const API_URL = 'http://localhost:5000/api'; // Make sure this matches your server URL

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData); // Adjusted URL
        return response.data; // Return the response data
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message); // Log error details
        throw error; // Re-throw the error to handle it in the component
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials); // Adjusted URL
        return response.data; // Return the JWT token or user data
    } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message); // Log error details
        throw error; // Re-throw the error for handling in the frontend
    }
};

// Get random questions for the test
export const getQuestions = async () => {
    try {
        const response = await axios.get(`${API_URL}/questions/random`); // Use the correct base URL
        console.log('Fetched questions:', response.data); // This log should show the questions
        return response.data; // Return the fetched questions
    } catch (error) {
        console.error('Error fetching questions:', error.message); // Log error details
        throw error; // Re-throw error to be handled in the component
    }
};

// Submit the test and feedback
export const submitTest = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/test/submit`, data); // Correct endpoint
        return response.data; // Return the success response
    } catch (error) {
        console.error('Error submitting test:', error.message); // Log error message
        throw error; // Re-throw the error for frontend handling
    }
};
