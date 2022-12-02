const User = require('../models/user')

module.exports = {
    index
}

function index(req, res, next) {
    console.log(`req.query is: ${req.query}`)
    // Make the query object to use with User.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    console.log(`modelQuery is: ${modelQuery}`)
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    console.log(`sortKey is: ${sortKey}`)
    console.log(`Before running User.find`)
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        console.log(`Before running if (err)`)
        if (err) return next(err);
        // Passing search values, name & sortKey, for use in the EJS
        let objVariables = {
            users, 
            user: req.user, 
            name: req.query.name, 
            sortKey
        }
        res.render('index', 
            objVariables
        )
    })
}