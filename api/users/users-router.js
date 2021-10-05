const express = require('express');
const { logger } = require('../middleware/middleware');
const mw = require('../middleware/middleware')
const Posts = require('../posts/posts-model');
const Users = require('./users-model');


const router = express.Router();

router.get('/', (req, res) => {
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving users',
    });
  });
});

router.get('/:id',mw.validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user =>{
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving user',
      });
    })
});

router.post('/',mw.validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error creating user',
      });
    })

});

router.put('/:id',mw.validateUserId,mw.validateUser, (req, res) => {
  Users.update(req.params.id,req.body)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating user',
      });
    })
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id',mw.validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user =>{
      Users.remove(req.params.id)
        .then(users => {
          res.status(200).json(user)
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error deleting user',
          });
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving user',
      });
    })
  
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts',mw.validateUserId, (req, res) => {
  
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts',mw.validateUserId, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router

module.exports = router;