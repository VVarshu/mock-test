const mysql = require('mysql2/promise');

// Create the connection pool using the promise wrapper
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Ahsrav@218',
  database: 'mock_test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
