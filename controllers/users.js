const User = require('../models/user')
const Recipe = require('../models/recipe')

module.exports = {
    index, 
    showRecipes
}

function index(req, res, next) {

    // Make the query object to use with User.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';

    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        if (err) return next(err);
        // Passing search values, name & sortKey, for use in the EJS
        let objLocals = {
            users, 
            user: req.user, 
            name: req.query.name, 
            sortKey
        }

        if (!req.user) res.redirect(`/`)

        res.render('users/index', 
            objLocals
        )
    })
}

function showRecipes(req, res, next) {
    if (!req.user) res.redirect(`/`)

    User.findById(req.user.id, function(err, user) {
        Recipe.find({createdByUserId:user._id}, function(err, recipes) {
            res.render('users/showRecipes', {user: req.user, user, recipes})
        })
    })
}

