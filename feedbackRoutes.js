const express = require('express');
const { submitFeedback, getUserFeedback } = require('../controllers/feedbackController');

const router = express.Router();

// Route to submit feedback
router.post('/submit', submitFeedback);

// Route to get feedback by user ID
router.get('/:userId', getUserFeedback);

module.exports = router;
