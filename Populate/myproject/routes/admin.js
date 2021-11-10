var express = require('express');
var router = express.Router();

var AdminModel=require('../model/admin');
  	

router.get('/login', function(req, res, next) {
    res.render('admin/account/login',{layout: false});
  });
  
  router.post('/login', function(req, res, next) {
    const mybodydata = {
   Email:req.body.email,
   Password:req.body.password
    }
    var data = AdminModel(mybodydata);
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.redirect("/");
      }
    });
});
router.get('/register', function(req, res, next) {
  res.render('admin/account/register',);
});

 


module.exports = router;