// var express = require('express');
// var router = express.Router();

var router = require('express').Router();
const passport = require('passport')
const indexesCtrl = require('../controllers/indexes')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// route to index controller
router.get('/', indexesCtrl.index)

// index view
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Recipers'})
// })

// The root route renders our only view
// router.get('/', function(req, res) {
//   res.redirect('/index');
// })

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google', 
  {scope: ['profile', 'email']}
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/user', 
    failureRedirect : '/user'
  }
))

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    res.redirect('/');
  });
})

module.exports = router;
