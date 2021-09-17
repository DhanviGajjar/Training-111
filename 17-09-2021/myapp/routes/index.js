var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.post('/about', function(req, res, next) {
 console.log(req.body);
  var a=parseInt(req.body.txt1);
  var b=parseInt(req.body.txt2);
  var c= a + b;
  var msg="";

  res.render('ans',{mya:a,myb:b,myc:c,mymsg:msg});
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/sign', function(req, res, next) {
  console.log(req.body);
   var Name =req.body.name;
   var Email=req.body.email;
   var Password= req.body.password;
   
   var msg="";
 
   res.render('sign',{mya:Name,myb:Email,myc:Password,mymsg:msg});
 });
 
 router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/log', function(req, res, next) {
  console.log(req.body);
   var Username =req.body.username;
   var Password= req.body.password;
   
   var msg="";
 
   res.render('log',{mya:Username,myb:Password,mymsg:msg});
 });

 router.get('/mark', function(req, res, next) {
  res.render('mark');
});
router.post('/mark1', function(req, res, next) {
  console.log(req.body);
  var maths = parseInt(req.body.maths);
  var english =parseInt(req.body.english);
  var hindi =parseInt(req.body.hindi); 
  var gujarati =parseInt(req.body.gujarati);
  var science  =parseInt(req.body.science);
  var total = maths+english+gujarati+science+hindi;
  var per = (total*100)/500;
  var msg="";
  if (per>=35 && per<=60) {
    msg = 'F';
    } 
    
    else if(per>=61 && per<=70){
    msg = 'D';
    }
    
    else if(per>=71 && per<=80){
    msg = 'C';
    }
    
    else if(per>=81 && per<=90){
    msg = 'B';
    }
    
    else if(per>=91 && per<=100){
    msg = 'A';
    }
    
    else{
    msg = "Invalid or Failed";
    }
  res.render('mark1', { maths:maths, english:english, hindi:hindi, gujarati:gujarati,science:science,total:total,msg:msg});
});
  module.exports = router;

