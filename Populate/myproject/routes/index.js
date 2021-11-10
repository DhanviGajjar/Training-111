var express = require('express');
var router = express.Router();

var CatModel=require('../model/category');
var SubcatModel=require('../model/subcategory');
var CountryModel=require('../model/country');
var StateModel=require('../model/State');
var CityModel=require('../model/city');
var ProductModel=require('../model/product')
var AreaModel=require('../model/area')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/*
 category start 
*/


//cat form
router.get('/catreg', function(req, res, next) {
  res.render('category/catreg', { title: 'Express' });
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
      res.render('category/displaycat',{mydata:data});
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
      res.redirect('/displaycat');
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
      res.render('category/editcat',{mydata:data})
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

      res.redirect('/displaycat');
    }
  }).lean();

});


/*
 
sub category start

*/


//sub cat form
router.get('/addsub', function(req, res, next) {

  CatModel.find(function(err, db_category_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_category_array);
          //Render User Array in HTML Table
          res.render('subcategory/addsub', { mydata : db_category_array });
          
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
       
          res.render("subcategory/displaysub", { subcategory_array: db_subcategory_array });
        })
    });
 
});

//sub cat delete
router.get('/deletesub/:id', function(req, res) {
  SubcatModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/displaye');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/displaysub');
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

          res.render('subcategory/editsub', { subcategory_array: db_subcategory_array });
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
          res.redirect('/subcategory/display');
      } else {
        
          res.redirect('/displaysub');
      }
  });
});


/*
 
product start

*/


//product form
router.get('/proreg', function(req, res, next) {

  SubcatModel.find(function(err, db_subcategory_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_subcategory_array);
          //Render User Array in HTML Table
          res.render('product/proreg', { mydata : db_subcategory_array });
          
        }
    });
//res.render('add-category');
});


router.post('/proreg', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    product_name: req.body.product_name,
    _subcategory: req.body._subactegory
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

  ProductModel.find(function(err, db_product_array){
      
      console.log(db_product_array);

      if (err) res.json({message: 'There are no posts here.'});

      ProductModel.find({})
      .populate('_subcategory')
    
        .exec(function(err, db_product_array) {

          console.log(db_product_array);
       
          res.render("product/displaypro", { product_array: db_product_array });
        })
    }).lean();
});

//product delete
router.get('/deletepro/:id', function(req, res) {
  ProductModel.findByIdAndDelete(req.params.id, function(err, project) {
      if (err) {

        console.log("Error in Record Delete " + err);
          res.redirect('/displaypro');
      } else {

        console.log(" Record Deleted ");
          res.redirect('/displaypro');
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

          res.render('product/editpro', { product_array: db_product_array });
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
          res.redirect('/product/displaypro');
      } else {
        
          res.redirect('/displaypro');
      }
  }).lean();
});



/*


Country start


*/

//country form
router.get('/stateregi', function(req, res, next) {
  res.render('state/stateregi', { title: 'Express' });
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
      res.render('state/displaystate',{mystate:data});
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
      res.redirect('/displaystate');
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
      res.render('state/editstate',{mystate:data})
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

      res.redirect('/displaystate');
    }
  }).lean();

});





/*
city start

*/

//city form
router.get('/cityreg', function(req, res, next) {

  StateModel.find(function(err, db_state_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_state_array);
          res.render('city/cityreg', { mydata : db_state_array });
          
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
       
          res.render("city/displaycity", { city_array: db_city_array });
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
          res.redirect('/displaycity');
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

          res.render('city/editcity', { city_array: db_city_array });
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
        
          res.redirect('/displaycity');
      }
  });
});


router.get('/areareg', function(req, res, next) {
CityModel.find(function(err, db_city_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_city_array);
          //Render User Array in HTML Table
          res.render('area/areareg', { mydata : db_city_array });
          
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
       
          res.render("area/areadisplay", { area_array: db_area_array });
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
          res.redirect('/areadisplay');
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

          res.render('area/areaedit', { area_array: db_area_array });
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
          res.redirect('/area/areadisplay');
      } else {
        
          res.redirect('/areadisplay');
      }
  });
});

module.exports = router;
