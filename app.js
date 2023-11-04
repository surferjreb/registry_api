const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressError = require('./utils/ExpressError');
const db = require('./models/db.js');
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
//const usersRouter = require('./routes/users');

const app = express();

const sessionConfig = {
  secret: 'thisisabadsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

// view engine setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(session(sessionConfig));
app.use(flash());

// makes the success flash available for all templates
app.use((req, res, next ) => {

  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch un-recognized page
app.all('*', (req, res, next) => {
  next(new expressError('Page Not Found', 404))
});

// catch all unrecognized errors
app.use((err, reg, res, next) => {
  const { statusCode=500 } = err;
  if(!err.message) err.message = "Run!!, Things went sideways...";
  res.status(statusCode).render('error', { title: 'Error', err});
});

module.exports = app;
