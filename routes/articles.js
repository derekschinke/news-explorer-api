const express = require('express');

const { getArticles } = require('../controllers/articles');

const auth = require('../middleware/auth');
const { getArticlesCelebration } = require('../middleware/celebrations');

const router = express.Router();

router.get('/', auth, getArticlesCelebration, getArticles);

module.exports = router;
