import authConfig from '../../config/auth.js';
import jwt from 'jsonwebtoken';

const authVerification = async (req, res, next) => {
  const authVerification = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, authConfig.secret);

      req.userId = decoded.id;
      req.userIsAdmin = decoded.admin;

      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  };

  return next();
};

export default authVerification;
