var router = require('express').Router();
var recipesCtrl = require('../controllers/recipes')

router.get('/', recipesCtrl.index)

router.get('/new', recipesCtrl.new)
// router.get('/recipes/new', recipesCtrl.new)
// :id/

router.get('/:id', recipesCtrl.show)
// router.get('/recipes/:id', recipesCtrl.show)

router.get('/:id/edit', recipesCtrl.edit)
// router.get('/recipes/:id/edit', recipesCtrl.edit)
// router.get('/recipes/edit', recipesCtrl.edit)

router.post('/', recipesCtrl.create)
// router.post('/recipes', recipesCtrl.create)
// /user/:id

router.put('/:id', recipesCtrl.update)
// router.put('/recipes/:id', recipesCtrl.update)

router.delete('/:id', recipesCtrl.delete)
// router.delete('/recipes/:id', recipesCtrl.delete)

module.exports = router;
