const express = require('express');

const {
  getArticles,
  postArticle,
  deleteArticle,
} = require('../controllers/articles');

const auth = require('../middleware/auth');
const {
  getArticlesCelebration,
  postArticleCelebration,
  deleteArticleCelebration,
} = require('../middleware/celebrations');

const router = express.Router();

router.get('/', auth, getArticlesCelebration, getArticles);
router.post('/', auth, postArticleCelebration, postArticle);
router.delete('/:articleId', auth, deleteArticleCelebration, deleteArticle);

module.exports = router;
