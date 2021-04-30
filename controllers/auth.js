const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('../models/user');

dotenv.config();
// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .catch(next);
};
