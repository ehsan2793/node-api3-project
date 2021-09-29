const express = require('express');
const User = require('./users-model');
const Post = require('../posts/posts-model')
const {
  logger, // eslint-disable-line
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.get();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', validateUser, async (req, res) => {
  const newUser = await User.insert(req.body)
  res.status(201).json(newUser)
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  const updated = await User.update(req.params.id, req.body)
  res.status(201).json(updated)
});

router.delete('/:id', validateUserId, async (req, res) => {
  const found = req.user
  await User.remove(found.id)
  res.status(200).json(found)


});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const allPost = await User.getUserPosts(req.params.id);
    res.status(200).json(allPost);
  } catch (error) {
    next(error);
  }
});


router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const { id } = req.params
    const newPost = req.text
    const postedNewPost = await Post.insert({ user_id: id, text: newPost })
    res.status(201).json(postedNewPost)
  }

  catch (error) {
    next(error);
  }


});

module.exports = router;






