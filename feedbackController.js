const Feedback = require('../models/Feedback'); // Assuming you have a Feedback model defined
const pool = require('../config/db'); // MySQL connection pool

// Submit feedback
exports.submitFeedback = async (req, res) => {
    const { userId, feedbackText } = req.body;

    try {
        // Validate input
        if (!userId || !feedbackText) {
            return res.status(400).json({ message: 'User ID and feedback text are required' });
        }

        // Save feedback to the database
        await Feedback.saveFeedback(userId, feedbackText);

        // Respond with success message
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (err) {
        console.error('Error submitting feedback:', err);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
};

// Get feedback for a specific user
exports.getUserFeedback = async (req, res) => {
    const { userId } = req.params;

    try {
        // Retrieve feedback from the database
        const feedback = await Feedback.getFeedbackByUserId(userId);
        
        // Check if feedback exists
        if (!feedback.length) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }

        // Respond with the user's feedback
        res.status(200).json(feedback);
    } catch (err) {
        console.error('Error fetching feedback:', err);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
};
