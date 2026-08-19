const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_here', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    
    // decoded contains payload, e.g., { id, role: 'user' | 'shop' }
    req.auth = decoded;
    next();
  });
};

module.exports = {
  authenticateToken
};
