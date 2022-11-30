var router = require('express').Router();
var recipesCtrl = require('../controllers/recipes')

router.get('/recipes/new', recipesCtrl.new)
// :id/

router.get('/recipes/:id', recipesCtrl.show)

// router.get('/recipes/edit', recipesCtrl.edit)
router.get('/recipes/:id/edit', recipesCtrl.edit)

router.post('/recipes', recipesCtrl.create)
// /user/:id

router.put('/recipes/:id', recipesCtrl.update)

router.delete('/recipes/:id', recipesCtrl.delete)

module.exports = router;
