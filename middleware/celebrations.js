const { celebrate, Joi } = require('celebrate');

const { BEARER_REGEX } = require('../utils/constants');

module.exports.signUpCelebration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.signInCelebration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.getUserCelebration = celebrate({
  headers: Joi.object()
    .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
    .options({ allowUnknown: true }),
});

module.exports.getArticlesCelebration = celebrate({
  headers: Joi.object()
    .keys({ authorization: Joi.string().regex(BEARER_REGEX).required() })
    .options({ allowUnknown: true }),
});
