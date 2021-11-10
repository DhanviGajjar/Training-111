var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
const Handlebars = require('handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const bodyParser= require('body-parser')
const multer = require('multer');
var mongoose = require('mongoose');
// const {check, validationResult} = require('express-validator/check');
const { check, validationResult } = require('express-validator');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
//app.use(bodyParser.urlencoded({extended: true}))
const app = express();



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'handlebars');


/*
//Using Shared Partials Handlebars Template
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
  }));

*/
//Use Partials Only not Default Layout

  app.engine('handlebars', exphbs({
    extname: '.handlebars',
    defaultLayout: false,
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    partialsDir : [
    // path to your partials
    path.join(__dirname, 'views/partials'),
    ]
    }));
  
    app.set('view engine', 'handlebars'); 
    
app.set('view engine', 'handlebars');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  maxAge:600000, httponly:true}
}))

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test23:test23@localhost:27017/test23')
    .then(() => console.log("Connection DB Open"))
    .catch((err) => console.error(err));





app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
