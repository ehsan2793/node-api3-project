const User = require('../users/users-model');


function logger(req, res, next) {
  console.log(`Method: [${req.method}], url: ${req.url}, timestamp: ${new Date}`);
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


  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules


module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}