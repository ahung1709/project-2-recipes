const Recipe = require('../models/recipe') 
const Review = require('../models/review') 
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
    if (!req.user) {
        Recipe.find({private:false}, function(err, recipes) {
            res.render('recipes/index', {user: req.user, recipes})
        })
    } else {
        Recipe.find({private:false}, function(err, recipes) {
            res.render('recipes/index', {user: req.user, recipes})
        })
    }
}

function newRecipe(req, res, next) {
    if (!req.user) res.redirect(`/`)
    res.render('recipes/new', {user: req.user})
}

function create(req, res) {
    if (!req.user) res.redirect(`/`)

    req.body.createdByUserId = req.user.id

    req.body.servings = !req.body.servings ? 0 : req.body.servings
    req.body.prepTime = !req.body.prepTime ? 0 : req.body.prepTime
    req.body.cookTime = !req.body.cookTime ? 0 : req.body.cookTime
    req.body.private = req.body.private === 'on' ? true : false

    Recipe.create(req.body, function(err, recipe) {
        res.redirect(`/user/recipes`)
    })
}

function show(req, res) {
    Recipe.findById(req.params.id, function(err,recipe) {
        Review.find({recipeId: recipe._id}, function(err, reviews) {

            if (!req.user) {
                res.render('recipes/show', {user: req.user, recipe, reviews})
            } else {
                let userReview = reviews.find(rev => rev["createdByUserId"] == req.user.id )
                let otherReviews = reviews.filter(rev => rev["createdByUserId"] != req.user.id )
                
                res.render('recipes/show', {user: req.user, recipe, reviews, userReview, otherReviews})
            }    
        })
    })
}

function edit(req, res) {
    if (!req.user) res.redirect(`/`)

    Recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/edit', {user: req.user, recipe})
    })
}

function update(req, res) {
    if (!req.user) res.redirect(`/`)

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
        recipe.private = req.body.private === 'on' ? true : false
        recipe.save()
        res.redirect(`/recipes/${req.params.id}`)
    })
}

function deleteRecipe(req, res) {
    if (!req.user) res.redirect(`/`)

    Recipe.findByIdAndRemove(req.params.id, function(err, recipe) {
        res.redirect(`/user/recipes`)
    })
}

