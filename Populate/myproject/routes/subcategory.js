var express = require('express');
var router = express.Router();

var CatModel=require('../model/category');
var SubcatModel=require('../model/subcategory');



router.get('/addsub', function(req, res, next) {
 CatModel.find(function(err, db_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_category_array);
            //Render User Array in HTML Table
            res.render('admin/subcategory/addsub', { mydata : db_category_array });
            
          }
      });
  //res.render('add-category');
  });
  router.post('/addsub', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      sub_category_name: req.body.sub_category_name,
      _category: req.body._category
     }
     console.log("Name is "  + req.body.sub_category_name);
      console.log("ID is "  + req.body._category);
  var data = SubcatModel(mybodydata);
   data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.send("Data Added")
      }
  })
  });
  
  //sub cat display
  router.get('/displaysub', function(req, res, next) {
  
    SubcatModel.find(function(err, db_subcategory_array){
        
        console.log(db_subcategory_array);
  
        if (err) res.json({message: 'There are no posts here.'});
  
        SubcatModel.find({})
        .populate('_category')
      
          .exec(function(err, db_subcategory_array) {
  
            console.log(db_subcategory_array);
         
            res.render("admin/subcategory/displaysub", { subcategory_array: db_subcategory_array });
          })
      });
   
  });
  
  //sub cat delete
  router.get('/deletesub/:id', function(req, res) {
    SubcatModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
  
          console.log("Error in Record Delete " + err);
            res.redirect('/displaysub');
        } else {
  
          console.log(" Record Deleted ");
            res.redirect('/admin/subcategory/displaysub');
        }
    });
  });
  
  
  //sub cat edit
  router.get('/editsub/:id', function(req, res) {
    console.log(req.params.id); 
    SubcatModel.findById(req.params.id, function(err, db_subcategory_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_subcategory_array);
            res.render('admin/subcategory/editsub', { subcategory_array: db_subcategory_array });
        }
    });
  });
  router.post('/editsub/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
      sub_category_name: req.body.sub_category_name,
      _category: req.body._category
    }
    SubcatModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/admin/subcategory/displaysub');
        } else {
          res.redirect('/admin/subcategory/displaysub');
        }
    });
  });
  








module.exports = router;