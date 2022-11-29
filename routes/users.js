// var express = require('express');
// var router = express.Router();
var router = require('express').Router();
var usersCtrl = require('../controllers/users')
var recipesCtrl = require('../controllers/recipes')

// GET /users
router.get('/user', usersCtrl.index)

router.get('/user/recipes', usersCtrl.showRecipes)

router.get('/user/:id/recipes/new', recipesCtrl.new)

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
