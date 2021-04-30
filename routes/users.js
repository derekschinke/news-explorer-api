const express = require('express');

const { getUser } = require('../controllers/users');

const router = express.Router();

router.get('/me', getUser);

module.exports = router;
