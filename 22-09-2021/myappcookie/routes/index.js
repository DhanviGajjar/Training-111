var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login-process', function(req, res, next) {
  //Get Value From Textbox
  var a = req.body.txt1;
  //Session Variable Create
  req.session.username = a;
  //Cookie Create
  res.cookie('username',a,{expire : new Date() + 100,httpOnly:true});
  //Check
  console.log( "Sesion Value in Login Process " +  req.session.username);
  //Redirect
  res.redirect('/home');
  
});

router.get('/home', function(req, res, next) {
  //Check Session Variable 
  console.log( "Sesion Value in Home" +  req.session.username);
  if(req.session.username){
    //Get Value from Session
    var user = req.session.username;
    //Render Page with Username
    res.render('home',{myuser:user});
    console.log(req.cookies);
  }else{
    //res.send("<h1>Login Required</h1>");
    res.redirect('/login');
  }
});


router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err){
    res.clearCookie('username');
    res.redirect('/login');
  });
});

//session counter
router.get('/counter', function(req, res, next) {
  if (req.session.views) {
  req.session.views++
  res.setHeader('Content-Type', 'text/html')
  res.write('<p>views: ' + req.session.views + '</p>')
  res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + '</p>')
  res.end()
  } else {
  req.session.views = 1
  res.end('welcome to the session demo. refresh!')
  }
  })

  //Create Route for Cookie
  //Create Cookie With Expire Time
  router.get('/create-cookie',function(req, res){
    res.cookie('user','Dhanvi');
    res.cookie('admin','node js');
    res.cookie('rememberme','1', {expire : new Date(Date.now() + 600000),httpOnly:true});
    res.send('Cookie is created');
    });

  //Print Cookie as Json Response
  router.get('/get-cookie', function(req, res, next) {
     let cookies =JSON.stringify(req.cookies)
     return res.send(cookies);
    });  
    
//Delete Cookie  
  router.get('/clear-cookie', function(req,res){
      res.clearCookie('user');
      res.clearCookie('admin');
      res.send('Cookie deleted');
      });
      
//counter demo cookie
router.get('/count', function(req, res) {
  if (req.cookies.count) {
      var count = parseInt(req.cookies.count);
  } else {
      var count = 0;
  }
  var counter = count + 1;
  res.cookie('count', counter);
  res.send('Count Cookie is : ' + counter);
});

router.get('/color', function(req, res, next) {
  res.render('color');
});

router.post('/color', function(req, res, next) {
  //Get Value From Textbox
  var c = req.body.color;
  //Session Variable Create
  req.session.colorname = c;
  //Cookie Create
  res.cookie('username',c,{expire : new Date() + 100,httpOnly:true});
  //Check
  console.log( "color is " +  req.session.colorname);
  //Redirect
  res.redirect('/page');

});



router.get('/page', function(req, res, next) {
  //Check Session Variable 
  console.log( "Sesion Value in Home" +  req.session.colorname);
  if(req.session.colorname){
    //Get Value from Session
    var user = req.session.colorname;
    //Render Page with Username
    res.render('page',{mycolor:user});
    console.log(req.cookies);
  }else{
    //res.send("<h1>Login Required</h1>");
    res.redirect('/page');
  }
});


module.exports = router;
