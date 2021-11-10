var express = require('express');
var router = express.Router();

var StateModel=require('../model/State');
var CityModel=require('../model/city');


//city form
router.get('/cityreg', function(req, res, next) {

    StateModel.find(function(err, db_state_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_state_array);
            res.render('admin/city/cityreg', { mydata : db_state_array });
            
          }
      });  
  //res.render('add-category');
  });
  
  
  router.post('/cityreg', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      city_name: req.body.city_name,
      _state: req.body._state, 
    }
    console.log("Name is "  + req.body.city_name);
      console.log("ID is "  + req.body._state);
      var data = CityModel(mybodydata);
   data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.send("Data Added")
      }
  })
  });
  
  
  //city display
  router.get('/displaycity', function(req, res, next) {
  
    CityModel.find(function(err, db_city_array){
        
        console.log(db_city_array);
  
        if (err) res.json({message: 'There are no posts here.'});
  
        CityModel.find({})
        .populate('_state')
        .lean()
        
          .exec(function(err, db_city_array) {
  
            console.log(db_city_array);
         
            res.render("admin/city/displaycity", { city_array: db_city_array });
          })
      });
   
  });
  
  //city delete
  router.get('/deletecity/:id', function(req, res) {
    CityModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
  
          console.log("Error in Record Delete " + err);
            res.redirect('/display');
        } else {
  
          console.log(" Record Deleted ");
            res.redirect('/admin/city/displaycity');
        }
    });
  });
  
  
  
  //city edit
  router.get('/editcity/:id', function(req, res) {
  
    console.log(req.params.id);
    
    CityModel.findById(req.params.id, function(err, db_city_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_city_array);
  
            res.render('admin/city/editcity', { city_array: db_city_array });
        }
    });
  });
  router.post('/editcity/:id', function(req, res) {
  
    console.log("Edit ID is"+ req.params.id);
  
    const mybodydata = {
      city_name: req.body.city_name,
      _state: req.body._state,
     
    }
  
    CityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/city/displaycity');
        } else {
          
            res.redirect('/admin/city/displaycity');
        }
    });
  });
  









module.exports = router;