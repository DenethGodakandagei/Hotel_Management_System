import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate a JWT token
export const generateToken = (userId, role) => {
  const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '1m', // Token expires in 1 hour
  });
  
  return token;
};

// Verify JWT token (middleware will use this)
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
  
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid Token' });
    req.user = decoded; // Attach decoded user info to the request object
    next();
  });
};
