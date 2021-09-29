const User = require('../users/users-model');

function logger(req, res, next) {
  console.log(`Method: [${req.method}]`);
  console.log(`[url]: ${req.url}`);
  console.log(`[time]: ${new Date}`)
  next()
}

async function validateUserId(req, res, next) {
  const id = req.params.id;
  const UserId = await User.getById(id)
  try {
    if (!UserId) {
      res.status(404).json({ message: "user not found" })
    } else {
      req.user = UserId
      next()
    }
  } catch (err) {
    next({ message: err.message })
  }
}

async function validateUser(req, res, next) {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}



function validatePost(req, res, next) {
  const { text } = req.body;
  try {
    if (!text || !text.trim()) {
      res.status(400).json({ message: "missing required text field" })
    } else {
      req.text = text.trim()
      next()
    }
  } catch (error) {
    next(error)
  }
}

// do not forget to expose these functions to other modules


module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}