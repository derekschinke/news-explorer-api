const express = require('express');

const { getUser } = require('../controllers/user');
const auth = require('../middleware/auth');
const { getUserCelebration } = require('../middleware/celebrations');

const router = express.Router();

router.get('/me', auth, getUserCelebration, getUser);

module.exports = router;
