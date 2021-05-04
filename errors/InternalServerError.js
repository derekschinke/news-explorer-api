const { STATUS_CODES } = require('../utils/constants');

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.internalServerError;
  }
}

module.exports = InternalServerError;
