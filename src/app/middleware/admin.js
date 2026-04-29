const adminMiddleware = async (req, res, next) => {
  if (!req.userIsAdmin) {
    console.log('Token recebido:', req.headers.authorization);
    return res.status(401).json({ message: 'Admin only' });
  }

  return next();
};

export default adminMiddleware;