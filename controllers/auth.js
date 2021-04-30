const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

dotenv.config();
// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const cleanedUser = user.toObject();
      delete cleanedUser.password;
      res.status(STATUS_CODES.created).send(cleanedUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Unable to create user');
      } else if (err.name === 'MongoError') {
        throw new ConflictError('User already exists');
      }
      next(err);
    })
    .catch(next);
};
