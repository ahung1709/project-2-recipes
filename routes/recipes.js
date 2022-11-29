var router = require('express').Router();
var recipesCtrl = require('../controllers/recipes')



router.post('/user/:id/recipes', recipesCtrl.create)

module.exports = router;
