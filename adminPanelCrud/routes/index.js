const { response } = require('express');
var express = require('express');
var router = express.Router();

const { check, validationResult } = require("express-validator");

var FormModel = require('../schema/form');
var UsercustomModel = require('../schema/usercustom');
var UsersModel = require('../schema/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("Index Called " + req.session);
  var myemail = req.session.email;
  var myid = req.session._id;
  console.log(myemail);
  console.log(myid);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  // res.render('admin-home', { myemail: myemail });
  res.render('index', { myemail: myemail, myid: myid });
});



router.get("/form", function (req, res, next) {
  res.render("form");
});

//Validate Form
router.post(
  "/form",
  [
    check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
    // check("email", "Email length should be 10 to 30 characters").custom(
    //   (value, { req }) => {
    //     if (value == req.body.email) {
    //       throw new Error("email confirmation does not match email");
    //     }

    //     // Indicates the success of this synchronous custom validator
    //     // return true;
    //   }
    // ),

    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("mobile", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    // check('password', 'Password length should be 8 to 10 characters').isLength({ min: 8, max: 10 })
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9][A-Z]")
      .withMessage(
        "Password Must Contain a Number  && Password Must Contain an Uppercase Letter"
      ),
  ],
  function (req, res, next) {

    console.log(req.body);

    const errors = validationResult(req).array();
    console.log(errors);
    // if (errors) {
    //     // res.json(errors);
    //     req.session.errors = errors;
    //     req.session.success =false;
    //     console.log(errors);
    //     console.log(req.session.errors);
    //     // res.redirect('/formcheck')
    //     res.render('form',{myerrors: errors });
    if (errors) {
      res.render('err', { myerrors: errors, layout: false });
      // return res.send(errors);
    }

    //       else {
    //         req.session.success =true;

    //         res.render('form',{myerrors: errors });
    //         // res.redirect('/formcheck')
    //           res.send("Successfully validated")
    //       }
    // // });
    else {
      res.send("Successfully validated");
      // res.redirect('/dashboard')
    }
  }
);

//Render the error in other page (here formcheck page)
router.get("/formcheck", function (req, res, next) {
  res.render("formcheck", {
    mysuccess: req.session.success,
    myerrors: req.session.errors,
  });
  req.session.myerrors = null;
});

// router.post('/formprocess', function(req, res, next) {
//   console.log(req.files.file123);
//   var fileobject=req.files.file123;//file object
//   var filename = req.files.file123.name; //Get File Name
//   var filesize = req.files.file123.size;
// //File Upload Code
// //Allow only JPG,PNG and GIF Files only
// if(req.files.file123.mimetype == "image/jpeg" || req.files.file123.mimetype == "image/png"|| req.files.file123.mimetype == "image/gif" &&  req.files.file123.size < 2 * 1024 * 1024)
// {
// fileobject.mv("public/upload/"+filename, function(err) {
// if (err)
// return res.status(500).send(err);
// res.send('File uploaded!');
// });
// }
// else{
//   res.send(' JPG,PNG and GIF Files only & Max File size 2 MB Only');
//   }
// });

//Get the form data
router.get("/form1", function (req, res, next) {
  res.render("form1");
});

//Validate form data
router.post(
  "/form1",
  [
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("mobile", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    check("password", "Password length should be 8 to 10 characters").isLength({
      min: 8,
      max: 10,
    }),

    check(
      "Confirm password",
      "Password length should be 8 to 10 characters"
    ).isLength({ min: 8, max: 10 }),
  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json(errors);
    } else {
      res.send("Successfully validated");
    }
  }
);

router.post("/uploadfile", function (req, res, next) {
  //File Upload Code
  console.log(req.files.file1); //Print all File Information
  var myfile = req.files.file1; //File Object
  var myfilename = req.files.file1.name; //Get File Name
  //File Upload Code
  myfile.mv("public/upload/" + myfilename, function (err) {
    if (err) return res.status(500).send(err);
    //res.send('File uploaded!');
  });
});

router.get("/formValid", function (req, res, next) {
  res.render("formValid");
});

router.post(
  "/formValid",
  [
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 10,
      max: 20,
    }),
    check("email", "Email length should be 10 to 30 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    //    check('email', 'Email length should be 10 to 30 characters')
    //   .custom((value, { req }) => {
    //     if (value == req.body.email) {
    //       throw new Error('email confirmation does not match email');
    //     }

    //     // Indicates the success of this synchronous custom validator
    //     // return true;
    //  }),

    check("mobile", "Mobile number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    // check('password', 'Password length should be 8 to 10 characters').isLength({ min: 8, max: 10 }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password Must Be at Least 8 Characters")
      .matches("[0-9][A-Z]")
      .withMessage(
        "Password Must Contain a Number  && Password Must Contain an Uppercase Letter"
      ),

    check("pancard")
      .isLength({ min: 10, max: 10 })
      .withMessage("Pancard length should be 10 characters")
      .matches("[A-Z]{5}[0-9]{4}[A-Z]{1}")
      .withMessage(
        "PanCard Must Contain a Number  && PanCard Must Contain an Uppercase Letter"
      ),

    check("aadharcard", "AadharCard length should be 12 characters").isLength({
      min: 12,
      max: 12,
    }),

    check("passport")
      .isLength({ min: 8, max: 8 })
      .withMessage("Passport length should be 8 characters")
      .matches("[A-Z]{1}[1-9]{1}[0-9]{1}[1-9]{5}")
      .withMessage(
        "Passport Must Contain a Number  && Passport Must Contain an Uppercase Letter"
      ),

    check("gst", "GST NO  length should be 15 characters")
      .isLength({ min: 15, max: 15 })
      .withMessage("gst length should be 15 characters")
      // .matches('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9][A-Z]{1}[Z]{1}[a-z][A-Z][0-9]{1}')
      .matches(
        "^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$"
      )
      .withMessage(
        "GST Must Contain a Number  && GST Must Contain an Uppercase Letter"
      ),
  ],
  function (req, res, next) {
    const errors = validationResult(req).array();
    console.log(errors);
    // if (errors) {
    //     // res.json(errors);
    //     req.session.errors = errors;
    //     req.session.success =false;
    //     console.log(errors);
    //     console.log(req.session.errors);
    //     // res.redirect('/formcheck')
    //     res.render('form',{myerrors: errors });
    if (errors) {
      // req.session.error = errors;
      // req.session.success = false;
      // res.render("formError" , {error : errors})

      console.log("Session  :-", req.session.error);

      const nameError = errors.find(function (val) {
        if (val.param == "name") {
          return val;
        }
      });

      const emailError = errors.find(function (val) {
        if (val.param == "email") {
          return val;
        }
      });

      const contactError = errors.find(function (val) {
        if (val.param == "mobile") {
          return val;
        }
      });

      const passwordError = errors.find(function (val) {
        if (val.param == "password") {
          return val;
        }
      });

      const pancardError = errors.find(function (val) {
        if (val.param == "pancard") {
          return val;
        }
      });

      const aadharcardError = errors.find(function (val) {
        if (val.param == "aadharcard") {
          return val;
        }
      });

      const passportError = errors.find(function (val) {
        if (val.param == "passport") {
          return val;
        }
      });

      const gstError = errors.find(function (val) {
        if (val.param == "gst") {
          return val;
        }
      });

      // const addressError = errors.find(function (val){
      // if(val.param == "address"){
      //   return val
      // }
      // })
      // console.log("Address Error :- " , addressError)
      console.log("Name Error :- ", nameError);

      console.log("Error object :- ", nameError);
      res.render("formValid", {
        nameError: nameError,
        emailError: emailError,
        contactError: contactError,
        passwordError: passwordError,
        pancardError: pancardError,
        aadharcardError: aadharcardError,
        passportError: passportError,
        gstError: gstError,
      });
    }

    //       else {
    //         req.session.success =true;

    //         res.render('form',{myerrors: errors });
    //         // res.redirect('/formcheck')
    //           res.send("Successfully validated")
    //       }
    // // });
    else {
      res.send("Successfully validated");
    }
  }
);


// router.get("/ajaxform", function (req, res, next) {
//   res.render("/ajaxform");
// });

// router.post("/ajaxform", function (req, res, next) {
//   console.log(req.params.id);
//   function load_json_data(id, parent_id)
// });


// router.get("/ajaxForm", function (req, res, next) {
//   res.render("ajaxForm");
// });


// router.post('/ajaxForm',(req,res,next) => {
//   let data = [];
//   let category = req.body.category;


//   console.log('From the ajax call, category is' + category);
//   if(category = "Men") {
//     data = [
//       'Sneakers',
//       'Boots',
//       'High Heels',
//       'Litas',
//       'Timbs'
//     ];
//     res.status(200).json({data});
//     res.end();
//   }
//   else if(category = "Women") {
//     data = [ 
//       'Timbs'
//     ];
//      res.status(200).json({data});
//      res.end();
//   }
//    else if(category = "Sports") {
//     data = [ 
//       'Soccer Boots',
//       'Rugby Boots'
//     ];
//      res.status(200).json({data});
//      res.end();
//   }



// });
//Display country route.
router.get('/displaycountry', async function (req, res, next) {
  try {
    //Find country data from countryModel.
    let countryData = await countryModel.find().lean()
    res.render('Country/displaycountry', { countryData: countryData })
  } catch (error) {
    console.log("Error in fetch country data.", error)
  }
});

//Display state route.
router.post('/displaystate', async function (req, res, next) {
  try {
    //Find state data from database.
    let dbStateData = await stateModel.find().populate('_country').lean()
    /**create an array for display only  required data
     * beacause in dbStateData contains all the data of state table
     * but we want to print only selected country data
    **/
    let stateData = []
    //Store required state data in stateData from dbStateData.
    for (const iterator of dbStateData) {
      /** Check country id with state data
       * of country id if both are same then we push
       * into the sateData and send to the client.
       */
      if (iterator._country._id == req.body._id) {
        stateData.push(iterator)
      }

    }
    res.render('state/displaystate', { stateData: stateData })
  } catch (error) {
    //Display errors.
    console.log("Error in fetch state data.", error)
  }
});



//Route for display city data.
router.post('/displaycity', async function (req, res, next) {
  try {
    //Find the all city data from database.
    let dbCityData = await cityModel.find().populate('_state').lean()
    /**create an array for display only  required data
     * beacause in dbCityData contains all the data of city table
     * but we want to print only selected country data
    **/
    let cityData = []
    /** Check state id with city data
     * of state id if both are same then we push
     * into the cityData and send to the client.
     */
    for (const iterator of dbCityData) {
      if (iterator._state._id == req.body._id) {
        cityData.push(iterator)
      }

    }
    res.render('city/displaycity', { cityData: cityData })
    //Display errors.
  } catch (error) {
    console.log("Error in fetch city data.", error)
  }
});
// //country form
// router.get('/countryreg', function(req, res, next) {
//   res.render('country/countryreg', { title: 'Express' });
// });
// router.post('/c-process', function(req, res, next) {

//   const mybodydata = {
//     c_name : req.body.cname,

//   }
//   var data = CountryModel(mybodydata);

//   data.save(function(err){
//     if(err){
//       console.log("Error in Add Record" + err);
//     }else{
//       console.log("Record Added");
//       res.send("Record Successfully Added")
//     }
//   })

// });



// /*
// state start
// */

// //state form
// router.get('/statereg', function(req, res, next) {

//   CountryModel.find(function(err, db_country_array) {
//       if (err) {
//           console.log("Error in Fetch Data " + err);
//         } else {
//           //Print Data in Console
//           console.log(db_country_array);
//           //Render User Array in HTML Table
//           res.render('state/statereg', { mydata : db_country_array });

//         }
//     });
// //res.render('add-category');
// });

// router.post('/statereg', function(req, res, next) {
//   console.log(req.body);

//   //Create an Array 
//   const mybodydata = {
//     state_name: req.body.state_name,
//     _country: req.body._country

//     }

//     console.log("Name is "  + req.body.state_name);
//     console.log("ID is "  + req.body._country);

// var data = StateModel(mybodydata);

// data.save(function(err) {
//     if (err) {
//        console.log("Error in Insert Record");
//     } else {
//         res.send("Data Added")
//     }
// })

// });

// //state display
// router.get('/displaystate', function(req, res, next) {

//   StateModel.find(function(err, db_state_array){

//       console.log(db_state_array);

//       if (err) res.json({message: 'There are no posts here.'});

//       StateModel.find({})
//       .populate('_country')

//         .exec(function(err, db_state_array) {

//           console.log(db_state_array);

//           res.render("state/displaystate", { state_array: db_state_array });
//         })
//     });

// });


// //state delete
// router.get('/deletestate/:id', function(req, res) {
//   StateModel.findByIdAndDelete(req.params.id, function(err, project) {
//       if (err) {

//         console.log("Error in Record Delete " + err);
//           res.redirect('/display');
//       } else {

//         console.log(" Record Deleted ");
//           res.redirect('/displaystate');
//       }
//   });
// });

// //state edit
// router.get('/editstate/:id', function(req, res) {

//   console.log(req.params.id);

//   StateModel.findById(req.params.id, function(err, db_state_array) {
//       if (err) {
//           console.log("Edit Fetch Error " + err);
//       } else {
//           console.log(db_state_array);

//           res.render('state/editstate', { state_array: db_state_array });
//       }
//   });
// });
// router.post('/editstate/:id', function(req, res) {

//   console.log("Edit ID is"+ req.params.id);

//   const mybodydata = {
//     state_name: req.body.state_name,
//     _country: req.body._country
//   }

//   StateModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
//       if (err) {
//           console.log("Error in Record Update");
//           res.redirect('/state/displaystate');
//       } else {

//           res.redirect('/displaystate');
//       }
//   });
// });



// /*
// city start
// */

// //city form
// router.get('/cityreg', function(req, res, next) {

//   StateModel.find(function(err, db_state_array) {
//       if (err) {
//           console.log("Error in Fetch Data " + err);
//         } else {
//           //Print Data in Console
//           console.log(db_state_array);

//           CountryModel.find(function(err, db_country_array) {
//             if (err) {
//                 console.log("Error in Fetch Data " + err);
//               } else {
//                 //Print Data in Console
//                 console.log(db_country_array);
//                 //Render User Array in HTML Table
//                 return res.render('city/cityreg', { mydata : db_state_array, mycountry : db_country_array });


//               }
//           });
//         }
//     });  
// //res.render('add-category');
// });

// router.post('/cityreg', function(req, res, next) {
//   console.log(req.body);
//   //Create an Array 
//   const mybodydata = {
//     city_name: req.body.city_name,
//     _state: req.body._state,
//     _country: req.body._country
//   }
//     console.log("Name is "  + req.body.city_name);
//     console.log("ID is "  + req.body._state);
//     console.log("ID is "  + req.body._country)

// var data = CityModel(mybodydata);

// data.save(function(err) {
//     if (err) {
//        console.log("Error in Insert Record");
//     } else {
//         res.send("Data Added")
//     }
// })

// });

// //city display
// router.get('/displaycity', function(req, res, next) {

//   CityModel.find(function(err, db_city_array){

//       console.log(db_city_array);

//       if (err) res.json({message: 'There are no posts here.'});

//       CityModel.find({})
//       .populate('_state')

//         .exec(function(err, db_city_array) {

//           console.log(db_city_array);

//           res.render("city/displaycity", { city_array: db_city_array });
//         })
//     });

// });

// //city delete
// router.get('/deletecity/:id', function(req, res) {
//   CityModel.findByIdAndDelete(req.params.id, function(err, project) {
//       if (err) {

//         console.log("Error in Record Delete " + err);
//           res.redirect('/display');
//       } else {

//         console.log(" Record Deleted ");
//           res.redirect('/displaycity');
//       }
//   });
// });



// //city edit
// router.get('/editcity/:id', function(req, res) {

//   console.log(req.params.id);

//   CityModel.findById(req.params.id, function(err, db_city_array) {
//       if (err) {
//           console.log("Edit Fetch Error " + err);
//       } else {
//           console.log(db_city_array);

//           res.render('city/editcity', { city_array: db_city_array });
//       }
//   });
// });
// router.post('/editcity/:id', function(req, res) {

//   console.log("Edit ID is"+ req.params.id);

//   const mybodydata = {
//     city_name: req.body.city_name,
//     _state: req.body._state,
//     _country:req.body._country
//   }

//   CityModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
//       if (err) {
//           console.log("Error in Record Update");
//           res.redirect('/city/displaycity');
//       } else {

//           res.redirect('/displaycity');
//       }
//   });
// });




router.get("/formvalidation", function (req, res, next) {
  res.render("formvalidation");
});

router.post("/formvalidation", async function (req, res, next) {
  try {

    console.log("email is", req.body.email)
    let email = await FormModel.findOne({ 'email': req.body.email })
    if (email) {
      console.log("email:", email)
      res.send(false);
    }
    res.send(true);

  } catch (error) {
    console.log("Error in email:", error);
  }

});


// router.post("/formvalidation/:field",async function (req, res, next) {
//   try{

//    console.log("email is",req.body.email)
//   //  console.log("mobile is",req.body.mobile)
//    let email = await UserModel.findOne({'email':req.body.email})
//    if(email){
//      console.log("email:",email)
//      res.send(false);
//    }
//    res.send(true);

//   }catch(error){
//  console.log("Error in email:",error);
//   }

//  });

router.get("/formcustom", function (req, res, next) {
  res.render("formcustom");
});



router.post("/formcustom", async function (req, res, next) {
  try {

    console.log("firstname is", req.body.firstname)
    let firstname = await UsercustomModel.findOne({ 'firstname': req.body.firstname })
    if (firstname) {
      console.log("firstname:", firstname)
      res.send(true);
    }
    res.send(false);

  } catch (error) {
    console.log("Error in email:", error);
  }

});
router.get("/form11", function (req, res, next) {
  res.render("form11");
});




router.get("/users", function (req, res, next) {
  UsersModel.find(function (err, data) {
    if (err) {
      console.log("Edit Fetch Error " + err);
    }
    else {
      res.render("users", { mydata: data });
      // res.render('useredit', { mydata: data });
    }
  }).lean();
});

router.post("/users", async function (req, res, next) {
  console.log(req.body);
  var fileobject = req.files.photo;
  var filename = req.files.photo.name;
  //Create an Array 
  const mybodydata = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
    gender: req.body.gender,
    hobby: req.body.hobby,
    interestArea: req.body.interestArea,
    photo: filename,
  }
  try {
    var users = await UsersModel(mybodydata).save();
    // res.render("users");
    console.log(users);
    // fileobject.mv("public/productUploads/" + filename, function(err) {
    //   if (err) throw err;
    //   // res.send("File Uploaded");
    // // res.redirect('users');
    // });

    // res.send( { "data": mybodydata });
    fileobject.mv("public/productUploads/" + filename, function (err) {
      if (err) throw err;

      res.send({ "data": mybodydata });
    });
  }
  catch (error) {
    next(error);
  }

});

//Get Single User for Edit Record
router.get('/useredit/:id',async function (req, res) {
  var editid = req.params.id;
  console.log("edit id is : ", req.params.id);
  //find data from category models
try{
    var users = await UsersModel.findById(editid).lean()
  // UsersModel.findById(editid, function (err, data) {
    //if err
    res.send({
      type: 'success',
      message: 'Record Deleted',
     "users":users,
    })
    console.log(users);
    // res.send({ mydata: users });
    } catch (err) {
      console.log("display Fetch Error " + err);
    }
});

// router.put('/useredit/:id', async function (req, res) {
//   var editid = req.params.id;
//   var fileobject = req.files.photo;
//   var filename = req.files.photo.name;
//   console.log("Edit ID is" + req.params.id);
//   const mybodydata = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     address: req.body.address,
//     gender: req.body.gender,
//     hobby: req.body.hobby,
//     interestArea: req.body.interestArea,
//     photo: filename,
//   }

//   try {
//     var users = await UsersModel.findByIdAndUpdate(editid, mybodydata, function (err, data) {
//       fileobject.mv("public/productUploads/" + filename, function (err) {
//         if (err) {
//           console.log("Error in Record Update" + err);
//         } else {
//           console.log(data);
//           res.redirect('/users');
//         }
//       });
//     }).lean();
//   }
//   catch (error) {
//     console.log(error)
//     res.send({
//       type: 'error',
//       message:'error while edit record'
//     })
  
//   }
// });

router.put('/useredit/:id',  async function(req, res) {
  try {
      let { firstname, lastname, address, gender, interestarea } = req.body;

      var userdata = { firstname, lastname, hobby: req.body['hobby'], address, gender, interestarea }
      if (req.file) {
          userdata.image = req.file.filename
      }
      let user = await UsersModel.findByIdAndUpdate(req.params.id, userdata, { new: true })


      console.log(user);
      res.json(user);
  } catch (err) {
      res.json({ message: "Something Went Wrong" });
      console.log(err);
  }
})




//Delete User By ID
router.delete('/userdelete/:id', async function (req, res) {
  var deleteid = req.params.id;
  //find data from category model
  try {
    let result = await UsersModel.deleteOne({ _id: deleteid })
    console.log("result");
    console.log(result);
    res.send({
      type: 'success',
      message: 'Record Deleted'
    })
  } catch (error) {
    console.log(error)
    res.send({
      type: 'error',
      message: 'Error while delete record'
    })
  }

});


module.exports = router;







