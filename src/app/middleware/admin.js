const adminMiddleware = async (req, res, next) => {
  const userIsAdmin = req.isUserAdmin;


  if (userIsAdmin) {
    return res.status(401).json();
  }

  return next();
};

export default adminMiddleware;
