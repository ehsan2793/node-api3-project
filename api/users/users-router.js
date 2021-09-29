const express = require('express');
const User = require('./users-model');
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', logger, async (req, res, next) => {
  try {
    const allUsers = await User.get();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', logger, validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/', logger, validateUser, async (req, res) => {
  const newUser = await User.insert(req.body)
  res.status(201).json(newUser)
});

router.put('/:id', logger, validateUserId, validateUser, async (req, res) => {
  const updated = await User.update(req.params.id, req.body)
  res.status(201).json(updated)
});

router.delete('/:id', logger, validateUserId, async (req, res) => {
  const found = req.user
  await User.remove(found.id)
  res.status(200).json(found)


});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
