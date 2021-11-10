var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../schema/category');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function (req, res, next) {
  res.render('admin/category/add-category');
  console.log("my url is : ", req.url);
});


//Add Form Processing using Post Method 
router.post('/add', async function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    category_name: req.body.category_name


  }
  try {
    //get data from category model
    var data = CategoryModel(mybodydata);
    //data save 
    const category = await data.save()
    console.log(category);
    //response to category 
    res.render('admin/category/add-category');
  }
  //else err
  catch (error) {
    next(error);
  }
  // data.save(function(err) {
  //     if (err) {
  //        console.log("Error in Insert Record");
  //     } else {
  //         
  //     }
  // })

});

//display category model page
router.get('/display', function (req, res, next) {
  //find data from category model
  CategoryModel.find(function (err, db_users_array) {
    //if err
    if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('admin/category/display-category', { mydata: db_users_array });
    }
  }).lean();
});


//Get Single User By ID
router.get('/show/:id', function (req, res) {
  console.log(req.params.id);
  //find data from category model
  CategoryModel.findById(req.params.id, function (err, db_categor_array) {
    //if err
    if (err) {
      console.log("Error in Single Record Fetch" + err);
    } else {
      console.log(db_categor_array);
      //Render category Array in HTML Table
      res.render('admin/category/single-category-record', { category_array: db_categor_array });
    }
  });
});



//Delete User By ID
router.get('/delete/:id', function (req, res) {
  console.log("hiii");
  //var deleteid = req.params.id;
  //find data from category model
  CategoryModel.findByIdAndDelete(req.params.id, function (err, project) {
    //if err
    if (err) {
      console.log("Error in Record Delete " + err);
      //redirect to display page
      res.redirect('/admin/category/display');
    }
    //if not an err
    else {
      //record delete &
      console.log(" Record Deleted ");

      //redirect to display page
      res.redirect('/admin/category/display');
    }
  });
});



//Get Single User for Edit Record
router.get('/edit/:id', function (req, res) {
  console.log("edit id is : ", req.params.id);
   //find data from category model
  CategoryModel.findById(req.params.id, function (err, db_category_array) {
    //if err
    if (err) {
      console.log("Edit Fetch Error " + err);
    } else {
      console.log(db_category_array);
      //redirect to edit category page
      res.render('admin/category/edit-category', { category_array: db_category_array });
    }
  }).lean();
});


//Update Record Using Post Method
router.post('/edit/:id', function (req, res) {

  console.log("Edit ID is" + req.params.id);
  //create array
  const mybodydata = {
    category_name: req.body.category_name
  }
  //find data from CategoryModel & update
  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
    if (err) {
      console.log("Error in Record Update");
      res.redirect('/admin/category/display-category');
    } else {

      res.redirect('/admin/category/display');
    }
  });
});


module.exports = router;