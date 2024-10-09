// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const testRoutes = require('./routes/testRoutes');
const pool = require('./config/db'); // Import your MySQL connection pool

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON body parsing

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);  // Map question routes
app.use('/api/test', testRoutes);

// Error handling for database connection issues
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit if there is a DB connection issue
  } else {
    console.log('Connected to the MySQL database');
    connection.release(); // Release the connection back to the pool
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
