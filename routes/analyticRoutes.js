const express = require('express');
const router = express.Router();
const { Comment, Article } = require('../models');
const { Op } = require('sequelize');

// GET /analytic/comments/?dateFrom=#timestamp#&dateTo=#timestamp#
router.get('/comments', async (req, res) => {
  const { dateFrom, dateTo } = req.query;

  if (!dateFrom || !dateTo) {
    return res.status(400).json({ error: 'dateFrom and dateTo are required' });
  }

  try {
    const comments = await Comment.findAll({
      where: {
        createdAt: {
          [Op.between]: [new Date(Number(dateFrom)), new Date(Number(dateTo))]
        }
      },
      include: [{
        model: Article,
        attributes: ['id', 'title']
      }],
      attributes: ['id', 'content', 'createdAt', 'articleId'],
      order: [['articleId', 'ASC']]
    });

    const groupedComments = comments.reduce((acc, comment) => {
      const articleId = comment.articleId;
      if (!acc[articleId]) {
        acc[articleId] = {
          article: comment.Article.title,
          comments: []
        };
      }
      acc[articleId].comments.push({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt
      });
      return acc;
    }, {});

    res.json(groupedComments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;