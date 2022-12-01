const Recipe = require('../models/recipe') 
const Review = require('../models/review') 
// const user = require('../models/user')
const User = require('../models/user')

module.exports = {
    index, 
    show, 
    new: newRecipe, 
    create, 
    edit, 
    update, 
    delete: deleteRecipe,
}

function index(req, res, next) {
    // let recipeViewOnly = true

    if (!req.user) {
        console.log(req.user)
        // res.redirect(`/`)
        Recipe.find({private:false}, function(err, recipes) {
            res.render('recipes/index', {user: req.user, recipes})
        })
    } else {
        // User.findById(req.user.id, function(err, user) {
            Recipe.find({private:false}, function(err, recipes) {
                // createdByUserId:user._id
                res.render('recipes/index', {user: req.user, recipes})
                // , user
                // res.render('recipes/index', {user: req.user})
            })
        // })
    }
}

function newRecipe(req, res, next) {
    if (!req.user) res.redirect(`/`)

    console.log(`inside newRecipe`)
    res.render('recipes/new', {user: req.user})
    // , uId: req.user.id
    // params
}

function create(req, res) {
    if (!req.user) res.redirect(`/`)

    req.body.createdByUserId = req.user.id
    // console.log(`req.params.id is: ${req.params.id}`)

    req.body.servings = !req.body.servings ? 0 : req.body.servings
    req.body.prepTime = !req.body.prepTime ? 0 : req.body.prepTime
    req.body.cookTime = !req.body.cookTime ? 0 : req.body.cookTime
    req.body.private = req.body.private === 'on' ? true : false

    Recipe.create(req.body, function(err, recipe) {
        res.redirect(`/user/recipes`)
        // ${req.params.id}
    })
}

function show(req, res) {
    // console.log(`inside controllers-recipes-show req.user.id is: ${req.user._id}`)
    // console.log(`inside controllers-recipes-show req.params.id is: ${req.params.id}`)
    
    // if (!req.user) {
        // res.redirect(`/`)
    // }

    Recipe.findById(req.params.id, function(err,recipe) {
        console.log(`inside controllers-recipes-show typeof Reviews is: ${typeof Review}`)
        Review.find({recipeId: recipe._id}, function(err, reviews) {

            if (!req.user) {
                console.log('inside controllers-recipes-show no-user')
                res.render('recipes/show', {user: req.user, recipe, reviews})
            } else {
                // console.log(`inside controllers-recipes-show recipe is: ${recipe}`)
                // reviews.find({createdByUserId: req.user.id}, function(err, review) {
                console.log(`inside controllers-recipes-show reviews is: ${typeof reviews}`)
                console.log(`inside controllers-recipes req.user.id is: ${req.user.id}`)
                let userReview = reviews.find(rev => rev["createdByUserId"] == req.user.id )
                let otherReviews = reviews.filter(rev => rev["createdByUserId"] != req.user.id )
                
                console.log(`inside controllers-recipes userReview of type ${typeof userReview} is: ${userReview}`)
                console.log(`inside controllers-recipes otherReviews of type ${typeof otherReviews} is: ${otherReviews}`)
                    // reviews.find(rev => rev["createdByUserId"] == user.id )
                res.render('recipes/show', {user: req.user, recipe, reviews, userReview, otherReviews})
                // })
            }    
        })
    })
}

function edit(req, res) {
    if (!req.user) res.redirect(`/`)

    console.log(`inside controller-recipes edit`)
    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {user: req.user, recipe})
    })
}

function update(req, res) {
    if (!req.user) res.redirect(`/`)

    console.log(`inside controller-recipes update`)
    Recipe.findById(req.params.id, function(err, recipe) {
        recipe.title = req.body.title
        recipe.desc = req.body.desc
        recipe.coverPicture = req.body.coverPicture
        recipe.meals = req.body.meals
        recipe.ingredients = req.body.ingredients
        recipe.directions = req.body.directions
        recipe.servings = req.body.servings
        recipe.prepTime = req.body.prepTime
        recipe.cookTime = req.body.cookTime
        recipe.notes = req.body.notes
        console.log(`inside controller-recipes update req.body.private is: ${req.body.private}`)
        recipe.private = req.body.private === 'on' ? true : false
        // recipe.createdByUserId = req.user.id
        recipe.save()
        res.redirect(`/recipes/${req.params.id}`)
    })
}

function deleteRecipe(req, res) {
    if (!req.user) res.redirect(`/`)

    console.log(`inside deleteRecipe`)
    console.log(`inside deleteRecipe - req.params.id is: ${req.params.id}`)
    Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
        res.redirect(`/user/recipes`)
        // ${req.user.id}/
    })
    // Recipe.deleteOne({_id: req.params.id})
    // Recipe.findById(req.params.id, function(err, recipe) {
        // recipe.
    // })
}

