const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const pool = require('../config/db'); // MySQL connection pool
require('dotenv').config();

// Registration
exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Check if user already exists
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) {
      connection.release(); // Release connection back to the pool
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      name,
      email,
      phone,
      password: hashedPassword,
      confirmed: 0, // Initially not confirmed
    };

    // Insert new user into the database
    const [result] = await connection.query('INSERT INTO users SET ?', newUser);
    connection.release(); // Release connection after the query is complete

    // Generate email confirmation token
    const emailToken = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const url = `http://localhost:5000/api/auth/confirm/${emailToken}`;

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'no-reply@testplatform.com',
      to: email,
      subject: 'Confirm Email',
      html: `<h3>Click the link to confirm your email: <a href="${url}">${url}</a></h3>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }

      res.status(200).json({ message: 'Registration successful, check email to confirm' });
    });
  } catch (err) {
    console.error('Server error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Email Confirmation
exports.confirmEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Update user confirmation status
    await connection.query('UPDATE users SET confirmed = 1 WHERE id = ?', [userId]);
    connection.release(); // Release connection after the query

    res.status(200).json({ message: 'Email confirmed successfully' });
  } catch (err) {
    console.error('Error confirming email:', err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Check if the user exists
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      connection.release(); // Release connection back to the pool
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      connection.release(); // Release connection back to the pool
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the email is confirmed
    if (!user[0].confirmed) {
      connection.release(); // Release connection back to the pool
      return res.status(400).json({ message: 'Please confirm your email' });
    }

    // Generate a JWT token
    const payload = { user: { id: user[0].id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      connection.release(); // Release connection after the token is generated
      if (err) {
        console.error('Error generating token:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ token });
    });
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
