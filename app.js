/*
02:06
05:25 fully working
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
//const computePic = require('./routes/computePic');
var helmet = require('helmet');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// /const autoIncrement = require('mongoose-auto-increment');
// Init App
var app = express();
app.locals.io = require('socket.io')();
const computePic = require('./routes/computePic')(app.locals.io);
// Good headers for security
app.use(helmet());

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Logger
app.use(logger('dev'));
// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Express Session
app.use(require('express-session')({
    secret: 'EBA',
    resave: true,
    saveUninitialized: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Routes
app.use('/', index);
app.use('/users', users);
app.use('/computePic', computePic);
// Passport Config from model
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate())); //foloseste strategia din passport-local-mongoose
//ce i-am dat in plugin
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Mongoose
mongoose.connect('mongodb://localhost/dbApp');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
