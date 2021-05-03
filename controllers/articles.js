const Article = require('../models/article');

const { STATUS_CODES } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.status(STATUS_CODES.ok).send(articles);
    })
    .catch(next);
};

module.exports.postArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(STATUS_CODES.created).send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Unable to save article');
      }
    })
    .catch(next);
};
