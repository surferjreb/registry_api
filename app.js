const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressError = require('./app_api/utils/ExpressError');
const db = require('./app_api/models/db.js');
const session = require('express-session');
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const user = require('./app_api/models/user');
const guest = require('./app_api/models/guest');


// used for authentication
const passport = require('passport');
const localStrategy = require('passport-local');


const indexRouter = require('./app_server/routes/index');
// const guestRouter = require('./app_server/routes/guest');
// const usersRouter = require('./app_server/routes/users');
const routesApi = require('./app_api/routes/index');

const app = express();

const sessionConfig = {
  secret: 'thisisabadsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false
  }
}

// view engine setup
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'app_server', 'views'));
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

// for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new localStrategy(user.authenticate()));
passport.use('local-guest', new localStrategy(guest.authenticate()));

passport.serializeUser(user.serializeUser((entity, cb) => {
  process.nextTick(() => {
    cb(null, {id: entity.id, username: entity.username });

  });

}));

passport.deserializeUser(user.deserializeUser((obj, cb) => {
  process.nextTick(() => {
    switch (obj.type) {
        case 'user': return cb(null, user);
        case 'guest': return cb(null, guest);
        default:
          cb(new Error('no entity type', obj.type), null);
    }


  });

}));


// makes the success flash available for all templates
app.use((req, res, next ) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/api', routesApi);
// app.use('/guests', guestRouter);
// app.use('/users', usersRouter);

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
