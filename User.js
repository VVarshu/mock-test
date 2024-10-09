const pool = require('../config/db'); // MySQL connection pool

class User {
  // Create a new user
  static async create(userData) {
    const query = 'INSERT INTO users (name, email, phone, password, confirmed) VALUES (?, ?, ?, ?, ?)';
    try {
      const [result] = await pool.query(query, [
        userData.name,
        userData.email,
        userData.phone,
        userData.password,
        userData.confirmed,
      ]);
      return result; // Return the result of the insertion
    } catch (error) {
      console.error('Error creating user:', error); // Log the error
      throw new Error('Database insertion error'); // Throw an error for further handling
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    try {
      const [rows] = await pool.query(query, [email]);
      return rows; // Return the found user(s)
    } catch (error) {
      console.error('Error finding user by email:', error); // Log the error
      throw new Error('Database query error'); // Throw an error for further handling
    }
  }

  // Confirm user's email
  static async confirmEmail(userId) {
    const query = 'UPDATE users SET confirmed = 1 WHERE id = ?';
    try {
      const [result] = await pool.query(query, [userId]);
      return result; // Return the result of the update
    } catch (error) {
      console.error('Error confirming email:', error); // Log the error
      throw new Error('Database update error'); // Throw an error for further handling
    }
  }
}

module.exports = User;
