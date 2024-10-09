const Score = require('../models/Score');
const Feedback = require('../models/Feedback');

exports.submitTest = async (req, res) => {
    const { userId, score, feedback } = req.body;

    try {
        // Validate the incoming data
        if (!userId || score === undefined || !feedback) {
            return res.status(400).json({ message: 'User ID, score, and feedback are required.' });
        }

        // Submit the test score for the user
        await Score.saveScore(userId, score, feedback); // Ensure this calls the correct save method

        // Respond with success message
        res.status(200).json({ message: 'Test submitted and feedback saved' });
    } catch (err) {
        console.error('Error submitting test or saving feedback:', err); // Log the error for debugging
        res.status(500).json({ message: 'Error submitting test or saving feedback' });
    }
};
