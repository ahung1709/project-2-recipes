// var express = require('express');
// var router = express.Router();
var router = require('express').Router();
var usersCtrl = require('../controllers/users')
var recipesCtrl = require('../controllers/recipes')

// GET /users
router.get('/', usersCtrl.index)

// router.get('/:id/recipes', usersCtrl.showRecipes)
router.get('/recipes', usersCtrl.showRecipes)

// router.get('/:id/recipes/new', recipesCtrl.new)

// router.get('/:id/recipes/:id', recipesCtrl.show)


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
