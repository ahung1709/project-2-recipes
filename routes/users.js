var router = require('express').Router();
var usersCtrl = require('../controllers/users')
var recipesCtrl = require('../controllers/recipes')

// GET /users
router.get('/', usersCtrl.index)

router.get('/recipes', usersCtrl.showRecipes)

module.exports = router;
