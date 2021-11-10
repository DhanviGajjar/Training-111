var express = require('express');
var router = express.Router();


var ProductModel=require('../model/product')
var SubcatModel=require('../model/subcategory');

//product form
router.get('/proreg', function(req, res, next) {

    SubcatModel.find(function(err, db_subcategory_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_subcategory_array);
            //Render User Array in HTML Table
            res.render('admin/product/proreg', { mydata : db_subcategory_array });
            
          }
      });
  //res.render('add-category');
  });
  
  
  router.post('/proreg', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      product_name: req.body.product_name,
      _subcategory: req.body._subcategory
         }
      console.log("Name is "  + req.body.product_name);
      console.log("ID is "  + req.body._subcategory);
   
  var data = ProductModel(mybodydata);
  data.save(function(err) {
      if (err) {
         console.log("Error in Insert Record");
      } else {
          res.send("Data Added")
      }
  })
  });
  
  //product display
  router.get('/displaypro', function(req, res, next) {    
    ProductModel.find({})
    .populate('_subcategory')
    .lean()
    .exec(function(err, db_product_array) {
    console.log(db_product_array);
        res.render("admin/product/displaypro", { product_array: db_product_array });
    });
  });

  
  
  //product delete
  router.get('/deletepro/:id', function(req, res) {
    ProductModel.findByIdAndDelete(req.params.id, function(err, project) {
        if (err) {
  
          console.log("Error in Record Delete " + err);
            res.redirect('/displaypro');
        } else {
  
          console.log(" Record Deleted ");
            res.redirect('/admin/product/displaypro');
        }
    });
  });
  
  //product edit
  router.get('/editpro/:id', function(req, res) {
    console.log(req.params.id);
    ProductModel.findById(req.params.id, function(err, db_product_array) {
        if (err) {
            console.log("Edit Fetch Error " + err);
        } else {
            console.log(db_product_array);
            res.render('admin/product/editpro', { product_array: db_product_array });
        }
    }).lean();
  });
  
  router.post('/editpro/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
    const mybodydata = {
      product_name: req.body.product_name,
      _subcategory: req.body._subcategory
    }
    ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
        if (err) {
            console.log("Error in Record Update");
            res.redirect('/admin/product/displaypro');
        } else {
          
            res.redirect('/admin/product/displaypro');
        }
    }).lean();
  });
 









module.exports = router;