// models/Feedback.js
const pool = require('../config/db'); // MySQL connection pool

const Feedback = {};

// Save feedback
Feedback.saveFeedback = async (userId, feedbackText) => {
    const sql = 'INSERT INTO Feedback (user_id, feedback_text) VALUES (?, ?)';
    try {
        const [result] = await pool.query(sql, [userId, feedbackText]);
        return result; // Return the result of the insertion
    } catch (error) {
        console.error('Error saving feedback:', error);
        throw new Error('Database insertion error');
    }
};

// Get feedback by user ID
Feedback.getFeedbackByUserId = async (userId) => {
    const sql = 'SELECT * FROM Feedback WHERE user_id = ?';
    try {
        const [rows] = await pool.query(sql, [userId]);
        return rows; // Return the fetched feedback
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw new Error('Database query error');
    }
};

module.exports = Feedback;
