const { STATUS_CODES } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.badRequest;
  }
}

module.exports = BadRequestError;
