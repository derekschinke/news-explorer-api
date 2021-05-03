const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const UnauthorizedError = require('../errors/UnauthorizedError');

dotenv.config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization required');
  }

  const token = authorization.replace('Bearer ', '');
  // Checks if token is valid by trying to decode it
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    throw new UnauthorizedError('Authorization required');
  }
  // Includes user info from decoded token in req, passed to controller
  req.user = payload;

  next();
};
