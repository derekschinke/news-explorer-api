const { STATUS_CODES } = require('./constants');

module.exports = (err, res) => {
  const { statusCode = STATUS_CODES.internalServerError, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === STATUS_CODES.internalServerError
        ? 'An error occurred on the server'
        : message,
  });
};
