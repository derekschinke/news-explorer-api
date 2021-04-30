const express = require('express');

const users = require('./users');
const auth = require('../middleware/auth');

const router = express.Router();

router.use('/users', auth, users);

module.exports = router;
