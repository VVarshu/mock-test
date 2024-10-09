const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming you have a DB config
const { submitTest } = require('../controllers/testController');

router.post('/submit', async (req, res) => {
    const { userId, score } = req.body; // Ensure you're destructuring userId correctly

    // Check if userId is a valid number
    if (!userId || typeof userId !== 'number') {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const query = "INSERT INTO scores (user_id, score) VALUES (?, ?)";
        const result = await pool.query(query, [userId, score]); // Use parameterized queries for safety

        res.status(200).json({ message: 'Score submitted successfully', result });
    } catch (error) {
        console.error('Error submitting score:', error);
        res.status(500).json({ error: 'Failed to submit score' });
    }
});

module.exports = router;
