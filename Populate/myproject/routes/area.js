var express = require('express');
var router = express.Router();

var CityModel=require('../model/city');
var AreaModel=require('../model/area');

router.get('/areareg', function(req, res, next) {
    CityModel.find(function(err, db_city_array) {
          if (err) {
              console.log("Error in Fetch Data " + err);
            } else {
              //Print Data in Console
              console.log(db_city_array);
              //Render User Array in HTML Table
              res.render('admin/area/areareg', { mydata : db_city_array });
              
            }
        });
    //res.render('add-category');
    });
    
    
router.post('/areareg', function(req, res, next) {
      console.log(req.body);
     //Create an Array 
      const mybodydata = {
        area_name: req.body.area_name,
        _city: req.body._city 
        }
        console.log("Name is "  + req.body.area_name);
        console.log("ID is "  + req.body._city);
    var data = AreaModel(mybodydata);
    data.save(function(err) {
        if (err) {
           console.log("Error in Insert Record");
        } else {
            res.send("Data Added")
        }
    });
    });
    
    router.get('/areadisplay', function(req, res, next) {
    
      AreaModel.find(function(err, db_area_array){
          
          console.log(db_area_array);
    
          if (err) res.json({message: 'There are no posts here.'});
    
          AreaModel.find({})
          .populate('_city')
          .lean()
          
            .exec(function(err, db_area_array) {
    
              console.log(db_area_array);
           
              res.render("admin/area/areadisplay", { area_array: db_area_array });
            })
        });
     
    });
    
    //city delete
    router.get('/deletearea/:id', function(req, res) {
      AreaModel.findByIdAndDelete(req.params.id, function(err, project) {
          if (err) {
    
            console.log("Error in Record Delete " + err);
              res.redirect('/areadisplay');
          } else {
    
            console.log(" Record Deleted ");
              res.redirect('/admin/area/areadisplay');
          }
      });
    });
    
    
    
    //city edit
    router.get('/areaedit/:id', function(req, res) {
    console.log(req.params.id);
        AreaModel.findById(req.params.id, function(err, db_area_array) {
          if (err) {
              console.log("Edit Fetch Error " + err);
          } else {
              console.log(db_area_array);
    res.render('admin/area/areaedit', { area_array: db_area_array });
          }
      });
    });
    router.post('/areaedit/:id', function(req, res) {
        console.log("Edit ID is"+ req.params.id);
      const mybodydata = {
        area_name: req.body.area_name,
        _city: req.body._city,
      }
      AreaModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
          if (err) {
              console.log("Error in Record Update");
              res.redirect('/admin/area/areadisplay');
          } else {
               res.redirect('/admin/area/areadisplay');
          }
      });
    });




module.exports = router;