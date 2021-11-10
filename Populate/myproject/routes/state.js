var express = require('express');
var router = express.Router();

var StateModel=require('../model/State');

router.get('/stateregi', function(req, res, next) {
    res.render('admin/state/stateregi', { title: 'Express' });
  });
  router.post('/s-process', function(req, res, next) {
    
    const mybodydata = {
      state_name : req.body.sname,
      
    }
    var data = StateModel(mybodydata);
  
    data.save(function(err){
      if(err){
        console.log("Error in Add Record" + err);
      }else{
        console.log("Record Added");
        res.send("Record Successfully Added")
      }
    })
    
  });
  
  
  // country display
  router.get('/displaystate', function(req, res, next) {
    StateModel.find(function(err,data){
      if(err){
        console.log("Error in Fetch Data" + err);
      }else{
        console.log("Record Data is " + data);
        res.render('admin/state/displaystate',{mystate:data});
      }
    }).lean();
  });
  
  
  //country delete
  router.get('/deletestate/:id', function(req, res, next) {
    var deleteid = req.params.id;
    StateModel.findByIdAndDelete(deleteid,function(err,data){
      if(err)
      {
        console.log("Error in Delete " + err);
      }else{
        console.log("Record Deleted " + deleteid);
        res.redirect('/admin/state/displaystate');
      }
    })
    
  });
  
  //country edit
  router.get('/editstate/:id', function(req, res, next) {
    var editid = req.params.id;
    StateModel.findById(editid,function(err,data){
      if(err){
        console.log("Error in Edit" + err)
      }else{
        console.log(data);
        res.render('admin/state/editstate',{mystate:data})
      }
    }).lean();
  
  });
  router.post('/editstate/:id', function(req, res, next) {
    var editid = req.params.id;
    const mybodydata = {
      state_name : req.body.sname,
    }
  
    StateModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
      if(err){
        console.log("Error in Edit" + err)
      }else{
        console.log( "Record Updated" +  data);
  
        res.redirect('/admin/state/displaystate');
      }
    }).lean();
  
  });
  
  






module.exports = router;