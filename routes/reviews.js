var router = require('express').Router();
var reviewsCtrl = require('../controllers/reviews')

console.log(`inside routes-reviews`)

router.get('/recipes/:recId/reviews/:revId/edit', reviewsCtrl.edit)

router.post('/recipes/:id/reviews', reviewsCtrl.create)

router.put('/recipes/:recId/reviews/:revId', reviewsCtrl.update)

router.delete('/recipes/:recId/reviews/:revId', reviewsCtrl.delete)
// recipes/<%= recipe.id %>/reviews/<%= userReview.id %>

module.exports = router;