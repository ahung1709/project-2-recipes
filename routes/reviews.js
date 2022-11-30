var router = require('express').Router();
var reviewsCtrl = require('../controllers/reviews')


console.log(`inside routes-reviews`)
router.post('/recipes/:id/reviews', reviewsCtrl.create)

module.exports = router;