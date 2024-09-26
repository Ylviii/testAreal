const express = require('express');
const router = express.Router();
const { Comment } = require('../models/comment');

//Create
router.post('/', async(req, res) => {
    try {
        const { title, content } = req.body;
        const comment = await Comment.create({ title, content });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Read 
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).send('Comment nof found')
        } 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const comment = await Comment.findAll();
      res.json(comment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Update
router.patch('/:id', async (req, res) => {
    try {
      const { title, content } = req.body;
      const comment = await Comment.findByPk(req.params.id);
      if (comment) {
        comment.title = title || comment.title;
        comment.content = content || comment.content;
        await comment.save();
        res.json(comment);
      } else {
        res.status(404).send('Comment not found');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete
  router.delete('/:id', async (req, res) => {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (comment) {
        await comment.destroy();
        res.status(204).send();
      } else {
        res.status(404).send('Comment not found');
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;