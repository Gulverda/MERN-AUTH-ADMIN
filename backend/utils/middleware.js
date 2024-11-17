import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
