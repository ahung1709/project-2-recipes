// var express = require('express');
// var router = express.Router();

var router = require('express').Router();
const passport = require('passport')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// The root route renders our only view
router.get('/', function(req, res) {
  res.redirect('/users');
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google', 
  {scope: ['profile', 'email']}
))

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users', 
    failureRedirect : '/users'
  }
))

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    res.redirect('/users');
  });
})

module.exports = router;
