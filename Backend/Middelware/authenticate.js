import { verifyToken } from('../utils/authUtils');

const authMiddleware = (req, res, next) => {
  verifyToken(req, res, next);
};

module.exports = authMiddleware;
