const express = require('express');

const { getArticles, postArticle } = require('../controllers/articles');

const auth = require('../middleware/auth');
const {
  getArticlesCelebration,
  postArticleCelebration,
} = require('../middleware/celebrations');

const router = express.Router();

router.get('/', auth, getArticlesCelebration, getArticles);
router.post('/', auth, postArticleCelebration, postArticle);

module.exports = router;
