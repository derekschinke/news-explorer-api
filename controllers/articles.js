const Articles = require('../models/article');
const { STATUS_CODES } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Articles.find({})
    .then((articles) => {
      res.status(STATUS_CODES.ok).send(articles);
    })
    .catch(next);
};
