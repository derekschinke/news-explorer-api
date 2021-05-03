const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./users');
const articleRouter = require('./articles');

const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

module.exports = router;
