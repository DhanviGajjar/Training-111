var express = require('express');
var router = express.Router();


var CatModel=require('../model/category');

/*
 category start 
*/


//cat form
router.get('/add', function(req, res, next) {
    res.render('admin/category/catreg', { title: 'Express' });
  });
  router.post('/cat-process', function(req, res, next) {
    
    const mybodydata = {
      cat_name : req.body.cnm,
      
    }
    var data = CatModel(mybodydata);
  
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.send("Record Successfully Added")
      }
    })
    
  });
  
  //cat display
  router.get('/displaycat', function(req, res, next) {
    CatModel.find(function(err,data){
      if(err){
        console.log("Error in Fetch Data" + err);
      }else{
        console.log("Record Data is " + data);
        res.render('admin/category/displaycat',{mydata:data});
      }
    }).lean();
  });
  
  
  //cat delete
  router.get('/deletecat/:id', function(req, res, next) {
    var deleteid = req.params.id;
    CatModel.findByIdAndDelete(deleteid,function(err,data){
      if(err)
      {
        console.log("Error in Delete " + err);
      }else{
        console.log("Record Deleted " + deleteid);
        res.redirect('/admin/category/displaycat');
      }
    })
    
  });
  
  //cat edit
  router.get('/editcat/:id', function(req, res, next) {
    var editid = req.params.id;
    CatModel.findById(editid,function(err,data){
      if(err){
        console.log("Error in Edit" + err)
      }else{
        console.log(data);
        res.render('admin/category/editcat',{mydata:data})
      }
    }).lean();
  
  });
  router.post('/editcat/:id', function(req, res, next) {
    var editid = req.params.id;
    const mybodydata = {
      cat_name : req.body.cnm,
    }
  
    CatModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
      if(err){
        console.log("Error in Edit" + err)
      }else{
        console.log( "Record Updated" +  data);
  
        res.redirect('/admin/category/displaycat');
      }
    }).lean();
  
  });
  

module.exports = router;
