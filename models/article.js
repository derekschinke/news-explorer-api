const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: { validator: (url) => validator.isUrl(url) },
  },
  image: {
    type: String,
    required: true,
    validate: { validator: (url) => validator.isUrl(url) },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', schema);
