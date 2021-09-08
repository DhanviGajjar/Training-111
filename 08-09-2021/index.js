var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/form', function(req, res, next) {
  res.render('form');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.post('/about', function(req, res, next) {
 // console.log(req.body);
 var a=req.body.txt1;
 res.render('ans',{msg:a});
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/dhanvi', function(req, res, next) {
  res.send("hello how r u?");
});

module.exports = router;
