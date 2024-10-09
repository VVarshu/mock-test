const jwt = require('jsonwebtoken');
require('dotenv').config(); // To load environment variables

module.exports = function (req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization');
  
  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user info to the request object for access in the next middleware/controller
    req.user = decoded.user;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid, return 401 (Unauthorized) status
    res.status(401).json({ message: 'Token is not valid' });
  }
};
