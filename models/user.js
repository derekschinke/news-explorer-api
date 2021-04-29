const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: { validator: (email) => validator.isEmail(email) },
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
});

module.exports = mongoose.model('user', schema);
