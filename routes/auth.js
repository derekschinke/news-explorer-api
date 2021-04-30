const express = require('express');

const { signUp, signIn } = require('../controllers/auth');
const {
  signUpCelebration,
  signInCelebration,
} = require('../middleware/celebration');

const router = express.Router();

router.post('/signup', signUpCelebration, signUp);
router.post('/signin', signInCelebration, signIn);
