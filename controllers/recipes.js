const Recipe = require('../models/recipe') 

module.exports = {
    index, 
    new: newRecipe, 
    create
}

function index(req, res, next) {

}

function newRecipe(req, res, next) {
    res.render('recipes/new', {user: req.user, uId: req.params.id})
}

function create(req, res) {
    req.body.createByUserId = req.params.id
    console.log(`req.params.id is: ${req.params.id}`)
    Recipe.create(req.body, function(err, recipe) {
        res.redirect(`/user/recipes`)
    })
}