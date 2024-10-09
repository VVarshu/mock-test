const pool = require('../config/db'); // Ensure correct path

// Controller to get random questions
const getRandomQuestions = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Questions ORDER BY RAND() LIMIT 10'); // Ensure table name matches
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).json({ message: 'No questions available' });
        }
    } catch (error) {
        console.error('Error in fetching random questions: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getRandomQuestions };
