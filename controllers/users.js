const User = require('../models/user');
const { STATUS_CODES } = require('../utils/constants');

const NotFoundError = require('../errors/NotFoundError');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(STATUS_CODES.ok).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'TypeError') {
        throw new NotFoundError('User not found');
      }
      next(err);
    })
    .catch(next);
};
