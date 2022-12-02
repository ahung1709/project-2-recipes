var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
let methodOverride = require('method-override')
var cookieParser = require('cookie-parser');
// require Session middleware
var session = require('express-session')
// require Passport middleware
var passport = require('passport')

// load the env vars
require('dotenv').config();

var app = express();

// connect to the MongoDB with mongoose
require('./config/database')
// require passport configuration
require('./config/passport')

// require our routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recipesRouter = require('./routes/recipes')
var reviewsRouter = require('./routes/reviews')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // set urlencoded to true
app.use(cookieParser());
// mount Session Middleware
app.use(session({
  secret: 'SEIRocks!', 
  resave: false, 
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/recipes', recipesRouter)
app.use('/', reviewsRouter)
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
  // .send('Cant find that!');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
