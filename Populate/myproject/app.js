var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs =require('express-handlebars');
var mongoose = require('mongoose');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category');
var SubcategoryRouter = require('./routes/subcategory');
var ProductRouter = require('./routes/product');
var StateRouter = require('./routes/state');
var CityRouter = require('./routes/city');
var AreaRouter = require('./routes/area');
var UserRouter = require('./routes/users');
var AdminRouter = require('./routes/admin');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test1234:test1234@localhost:27017/test1234')

.then(()=>console.log("Connection open"))
.catch(()=>console.log("Error"))

var app = express();
/*
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({
  defaultLayout:'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
*/
/*
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  extname: '.handlebars',
  defaultLayout: false,
  partialsDir : [
  // path to your partials
  path.join(__dirname, 'views/partials'),
  ]
  }));
*/


app.engine( 'handlebars', exphbs( {
  extname: 'handlebars',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  // partialsDir: __dirname + '/views/partials/'
}));
  app.set('view engine', 'handlebars'); 


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users',usersRouter);
app.use('/admin/category',categoryRouter);
app.use('/admin/subcategory',SubcategoryRouter);
app.use('/admin/product',ProductRouter);
app.use('/admin/state',StateRouter);
app.use('/admin/city',CityRouter);
app.use('/admin/area',AreaRouter);
app.use('/admin/users',UserRouter);
app.use('/admin/account',AdminRouter);


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
