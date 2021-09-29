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

router.put('/:id', logger, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', logger, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', logger, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
