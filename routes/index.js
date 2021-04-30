const express = require('express');

const authRouter = require('./auth');
// const users = require('./users');

// const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', authRouter);
// router.use('/users', auth, users);

module.exports = router;
