const Review = require('../models/review') 

// console.log('inside controller-reviews')

module.exports = {
    create, 
}

function create(req, res) {
    if (!req.user) res.redirect(`/`)

    console.log(req.params.id)
    req.body.recipeId = req.params.id
    req.body.createdByUserId = req.user.id
    req.body.rating = !req.body.rating ? 0 : req.body.rating
    req.body.liked = req.body.liked === 'on' ? true : false
    
    console.log(`inside controller-reviews create`)
    console.log(`req.body.id is: ${req.body.id}`)
    console.log(`req.body.content is: ${req.body.content}`)
    console.log(`req.body.rating is: ${req.body.rating}`)
    console.log(`req.body.liked is: ${req.body.liked}`)
    console.log(`req.body.recipeId is: ${req.body.recipeId}`)
    console.log(`req.body.createdByUserId is: ${req.body.createdByUserId}`)

    Review.create(req.body, function(err, review) {
        res.redirect(`/recipes/${req.params.id}`)
        // res.redirect(`/user/recipes`)
        
    })

}