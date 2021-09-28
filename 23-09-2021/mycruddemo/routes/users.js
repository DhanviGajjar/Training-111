var express = require('express');
var router = express.Router();

//4 add usermodel route
var UserModel=require('../models/user-model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//6.add-form get & post method
router.get('/add-form', function(req, res, next) {
  res.render('users/add-form');
});

router.post('/form-process', function(req, res, next) {
  const mybodydata={
    user_name:req.body.txt1,
    user_email:req.body.txt2,
  }
  var data =UserModel(mybodydata);
  data.save(function(err){
    if(err){
      console.log("Error in record" + err);
    }else
    {
      console.log("Record Added");
      res.redirect("/users/add-form");
    }
  })
});
//7 display page
router.get('/display-form', function(req,res,next){
  UserModel.find(function(err,data){
    if(err){
      console.log("error in record"+ err);
    }else{
      console.log("record add");
      res.render('users/display-form', {mydata:data});
    }
  }).lean();
});

//8 delete get 

router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/users/display-form');
    }
  })
  res.render('add-form');
});


//10 edit get post same as display get method
router.get('/edit-form/:id', function(req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
     console.log(data);
      res.render('users/edit-form',{mydata:data})
    }
  }).lean();

});

router.post('/edit-form/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    user_name : req.body.txt1,
    user_email : req.body.txt2
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/users/display-form');
    }
  }).lean();

});





module.exports = router;



















