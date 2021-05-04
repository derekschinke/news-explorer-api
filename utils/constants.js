const { NODE_ENV, MONGO_SECRET } = process.env;

module.exports.BEARER_REGEX = /^(Bearer )[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;

module.exports.DEV_SECRET = 'dev-secret';

module.exports.MONGODB_URI =
  NODE_ENV === 'production'
    ? `mongodb+srv://derekschinke:${MONGO_SECRET}@practicum.0zhvm.mongodb.net/newsdb?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/newsdb';

module.exports.STATUS_CODES = {
  ok: 200,
  created: 201,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};
