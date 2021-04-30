const express = require('express');

const { signUp } = require('../controllers/auth');
const { signUpCelebration } = require('../middleware/celebration');

const router = express.Router();

router.post('/signup', signUpCelebration, signUp);
