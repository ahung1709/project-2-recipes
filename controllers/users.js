const User = require('../models/user')

module.exports = {
    index, 
    showRecipes
}

function index(req, res, next) {

    // console.log(`req.query is: ${req.query}`)
    // Make the query object to use with User.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // console.log(`modelQuery is: ${modelQuery}`)
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    // console.log(`sortKey is: ${sortKey}`)
    // console.log(`Before running User.find`)
    User.find(modelQuery)
    .sort(sortKey).exec(function(err, users) {
        // console.log(`Before running if (err)`)
        if (err) return next(err);
        // Passing search values, name & sortKey, for use in the EJS
        // console.log(`Before running res.render('users/index')`)
        // console.log(`req.user is: ${req.user} ; !req.user is: ${!req.user}`)
        let objLocals = {
            users, 
            user: req.user, 
            name: req.query.name, 
            sortKey
        }

        // let objLocals = getLocals(req, res, next)
        // let objLocals
        // getLocals(req, res, next, objLocals)

        // console.log(`outside getLocals - req.user is: ${req.user} ; !req.user is: ${!req.user}`)

        // console.log(`outside getLocals - objLocals is: ${objLocals}`)
        if (!req.user) {
            console.log(`No user`)
            res.redirect(`/`);
        }
        res.render('users/index', 
        // {
            // users, 
            // user: req.user, 
            // name: req.query.name, 
            // sortKey
        // }
            objLocals
        )
    })
}

function showRecipes(req, res, next) {
    // console.log(`req.query is: ${req.query}`)
    // console.log(`req.query.name is: ${req.query.name}`)
    // console.log(`req.query.sort is: ${req.query.sort}`)
    // // Make the query object to use with User.find based up
    // // the user has submitted the search form or now
    // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
    // console.log(`modelQuery is: ${modelQuery}`)
    // // Default to sorting by name
    // let sortKey = req.query.sort || 'name';
    // console.log(`sortKey is: ${sortKey}`)
    // console.log(`Before running User.find`)
    // User.find(modelQuery)
    // .sort(sortKey).exec(function(err, users) {
    //     console.log(`Before running if (err)`)
    //     if (err) return next(err);
    //     // Passing search values, name & sortKey, for use in the EJS
    //     console.log(`Before running res.render('users/index')`)
    //     console.log(`req.user is: ${req.user} ; !req.user is: ${!req.user}`)
    // User.find({}).exec(function(err, users) {
        
        if (!req.user) {
            // console.log(`No user`)
            res.redirect(`/`)
        }
        res.render('users/showRecipes', {user: req.user})
    // })

        // let objLocals = getLocals(req, res, next)
        // let objLocals
        // getLocals(req, res, next, objLocals)

        // console.log(`outside getLocals - req.user is: ${req.user} ; !req.user is: ${!req.user}`)

        // console.log(`outside getLocals - objLocals is: ${objLocals}`)


    // }
    // )
}

// == Helper function ==
// function getLocals(req, res, next, objLocals) {
//     console.log(`req.query is: ${req.query}`)
//     // Make the query object to use with User.find based up
//     // the user has submitted the search form or now
//     let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
//     console.log(`modelQuery is: ${modelQuery}`)
//     // Default to sorting by name
//     let sortKey = req.query.sort || 'name';
//     console.log(`sortKey is: ${sortKey}`)
//     console.log(`Before running User.find`)
    
//     // let objLocals

//     User.find(modelQuery)
//     .sort(sortKey).exec(function(err, users) {
//         console.log(`Before running if (err)`)
//         if (err) return next(err);
//         // Passing search values, name & sortKey, for use in the EJS
//         console.log(`Before running res.render('users/index')`)
//         console.log(`inside getLocals - req.user is: ${req.user} ; !req.user is: ${!req.user}`)
//         objLocals = {
//             users, 
//             user: req.user, 
//             name: req.query.name, 
//             sortKey
//         }
//         console.log(`inside getLocals inside cb - objLocals is: ${objLocals}`)
//     })
//     console.log(`inside getLocals outside cb - objLocals is: ${objLocals}`)
//     // return objLocals;
    
        
// }
