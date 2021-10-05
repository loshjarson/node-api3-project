const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(req.url,req.method,req._startTime)
  next()
}

function validateUserId(req, res, next) {
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if (!user) {
        res.status(404).json({message: "user not found"})
      } else {
        req.user = user
        next()
      }
    })
}

function validateUser(req, res, next) {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(400).json({message: "missing required name field"})
  } else {
    next()
  }
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  const newPost = req.body;
  if (!newPost.text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}