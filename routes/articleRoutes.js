const express = require('express');
const router = express.Router();
const { Article } = require('../models/article');

//Create
router.post('/', async(req, res) => {
    try {
        const { title, content } = req.body;
        const article = await Article.create({ title, content });
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Read 
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).send('Article nof found')
        } 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const article = await Article.findAll();
      res.json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Update
router.patch('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const article = await Article.findByPk(req.params.id);
      if (article) {
        article.title = title || article.title;
        article.content = content || article.content;
        await article.save();
        res.json(article);
      } else {
        res.status(404).send('Article not found');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete
  router.delete('/:id', async (req, res) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (article) {
        await article.destroy();
        res.status(204).send();
      } else {
        res.status(404).send('Article not found');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;