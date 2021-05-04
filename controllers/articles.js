const Article = require('../models/article');

const { STATUS_CODES } = require('../utils/constants');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.status(STATUS_CODES.ok).send(articles);
    })
    .catch(() => {
      throw new InternalServerError('An error has occurred on the server');
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

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .select('+owner')
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(STATUS_CODES.ok).send(deletedArticle);
        });
      } else if (!article) {
        throw new NotFoundError('Article not found');
      } else {
        throw new ForbiddenError('Insufficient rights to article');
      }
    })
    .catch((err) => {
      if (err.statusCode === STATUS_CODES.notFound) {
        throw new NotFoundError('Article not found');
      }
    })
    .catch(next);
};
