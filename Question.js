const pool = require('../config/db'); // MySQL connection pool

class Question {
  static async getRandomQuestions(limit) {
    const query = 'SELECT * FROM questions ORDER BY RAND() LIMIT ?';
    try {
      const [rows] = await pool.query(query, [limit]);
      return rows; // Return the fetched questions
    } catch (error) {
      console.error('Error fetching random questions:', error);
      throw new Error('Database query error'); // Throw error for further handling
    }
  }
}

module.exports = Question;
