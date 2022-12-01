const Review = require('../models/review') 
const Recipe = require('../models/recipe') 

// console.log('inside controller-reviews')

module.exports = {
    create, 
    edit, 
    update, 
    delete: deleteReview, 
}

function create(req, res) {
    if (!req.user) res.redirect(`/`)

    // console.log(req.params.id)
    req.body.recipeId = req.params.id
    req.body.createdByUserId = req.user.id
    req.body.rating = !req.body.rating ? 0 : req.body.rating
    req.body.liked = req.body.liked === 'on' ? true : false
    
    // console.log(`inside controller-reviews create`)
    // console.log(`req.body.id is: ${req.body.id}`)
    // console.log(`req.body.content is: ${req.body.content}`)
    // console.log(`req.body.rating is: ${req.body.rating}`)
    // console.log(`req.body.liked is: ${req.body.liked}`)
    // console.log(`req.body.recipeId is: ${req.body.recipeId}`)
    // console.log(`req.body.createdByUserId is: ${req.body.createdByUserId}`)

    Review.create(req.body, function(err, review) {
        res.redirect(`/recipes/${req.params.id}`)
        // res.redirect(`/user/recipes`)
        
    })

}

function edit(req, res) {
    if (!req.user) res.redirect(`/`)

    console.log(`inside controller-reviews edit`)
    Recipe.findById(req.params.recId, function(err, recipe) {
        Review.findById(req.params.revId, function(err, review) {
            res.render('reviews/edit', {user: req.user, recipe, review})
        })
    })
}

function update(req, res) {
    if (!req.user) res.redirect(`/`)

    // console.log(`inside controller-reviews update`)
    // console.log(`inside controller-reviews req.params.recId is: ${req.params.recId}`)
    // console.log(`inside controller-reviews req.params.revId is: ${req.params.revId}`)
    // console.log(req.body)
    // console.log(req.body._id)
    // console.log(req.body.content)
    // console.log(req.body.rating)
    // console.log(req.body.liked)
    // console.log(req.body.recipeId)
    // console.log(req.body.createdByUserId)
    // console.log(req.body.createdAt)
    // console.log(req.body.updatedAt)
    Review.findById(req.params.revId, function(err, review) {
        console.log(review)
        review.content = req.body.content
        review.rating = req.body.rating
        review.liked = req.body.liked === 'on' ? true: false
        review.save()
        res.redirect(`/recipes/${req.params.recId}`)
    })
}

function deleteReview(req, res) {
    if (!req.user) res.redirect(`/`)
    // console.log(`inside controllers-reviews deleteReview`)
    // console.log(`inside controllers-reviews deleteReview - req.params.recId is: ${req.params.recId}`)

    Review.findByIdAndRemove(req.params.revId, function(err, recipe) {
        res.redirect(`/recipes/${req.params.recId}`)
    })
}