
const pool = require('../config/db'); // Import MySQL connection pool
const express = require('express');
const { getRandomQuestions } = require('../controllers/questionController');

const router = express.Router();

// Route to get random questions
router.get('/random', getRandomQuestions);

module.exports = router;

// Endpoint to get random questions
router.get('/random', async (req, res) => {
    try {
        // Acquire a connection from the pool and perform the query
        const [rows] = await pool.query('SELECT * FROM questions ORDER BY RAND() LIMIT 10');
        
        // Send the fetched rows (questions) as a response
        res.json({
            success: true,
            questions: rows,
        });
    } catch (error) {
        console.error('Error fetching random questions:', error); // Log the error
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

module.exports = router;
