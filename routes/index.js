const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./user');

const auth = require('../middleware/auth');

const router = express.Router();

router.use('/', authRouter);
router.use('/users', auth, userRouter);

module.exports = router;
