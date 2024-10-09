const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Import the MySQL connection pool
const mysql = require('mysql2/promise');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Check if the user already exists
        const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            connection.release(); // Release connection back to the pool
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await connection.query('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', 
            [name, email, phone, hashedPassword]);

        connection.release(); // Release connection after the queries

        res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
        // Here, you would send a verification email
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Check if the user exists
        const [userResult] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userResult.length === 0) {
            connection.release(); // Release connection back to the pool
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = userResult[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            connection.release(); // Release connection back to the pool
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        connection.release(); // Release connection after the queries

        res.json({ token, userId: user.id }); // Return valid JSON
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
