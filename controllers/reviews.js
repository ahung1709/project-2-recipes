const Review = require('../models/review') 
const Recipe = require('../models/recipe') 

module.exports = {
    create, 
    edit, 
    update, 
    delete: deleteReview, 
}

function create(req, res) {
    if (!req.user) res.redirect(`/`)

    req.body.recipeId = req.params.id
    req.body.createdByUserId = req.user.id
    req.body.rating = !req.body.rating ? 0 : req.body.rating
    req.body.liked = req.body.liked === 'on' ? true : false
    
    Review.create(req.body, function(err, review) {
        res.redirect(`/recipes/${req.params.id}`)
    })
}

function edit(req, res) {
    if (!req.user) res.redirect(`/`)

    Recipe.findById(req.params.recId, function(err, recipe) {
        Review.findById(req.params.revId, function(err, review) {
            res.render('reviews/edit', {user: req.user, recipe, review})
        })
    })
}

function update(req, res) {
    if (!req.user) res.redirect(`/`)

    Review.findById(req.params.revId, function(err, review) {
        review.content = req.body.content
        review.rating = req.body.rating
        review.liked = req.body.liked === 'on' ? true: false
        review.save()
        res.redirect(`/recipes/${req.params.recId}`)
    })
}

function deleteReview(req, res) {
    if (!req.user) res.redirect(`/`)

    Review.findByIdAndRemove(req.params.revId, function(err, recipe) {
        res.redirect(`/recipes/${req.params.recId}`)
    })
}