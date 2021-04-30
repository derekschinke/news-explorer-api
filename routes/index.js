const express = require('express');

const auth = require('./auth');
// const users = require('./users');

// const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', auth);
// router.use('/users', auth, users);

module.exports = router;
