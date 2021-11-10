var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/about", function (req, res, next) {
  res.render("about", { peoples: [{ name: "user1" }, { name: "user2" }] });
});
router.get("/home", function (req, res, next) {
  res.render("home");
});
router.get("/about1", function (req, res, next) {
  res.render("about1");
});

router.get("/contact", function (req, res, next) {
  res.render("contact");
});

// Get Form data
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
        res.render('err',{myerrors: errors });
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


router.get("/ajaxForm", function (req, res, next) {
  res.render("ajaxForm");
});


router.post('/ajaxForm',(req,res,next) => {
  let data = [];
  let category = req.body.category;
 

  console.log('From the ajax call, category is' + category);
  if(category = "Men") {
    data = [
      'Sneakers',
      'Boots',
      'High Heels',
      'Litas',
      'Timbs'
    ];
    res.status(200).json({data});
    res.end();
  }
  else if(category = "Women") {
    data = [ 
      'Timbs'
    ];
     res.status(200).json({data});
     res.end();
  }
   else if(category = "Sports") {
    data = [ 
      'Soccer Boots',
      'Rugby Boots'
    ];
     res.status(200).json({data});
     res.end();
  }



});


module.exports = router;
