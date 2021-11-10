var express = require('express');
var router = express.Router();

//Call Database Model
var adminModel = require('../schema/admin');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//admin register  page
router.get('/register', function (req, res, next) {
  //res to admin register page
  res.render('admin/account/register', { layout: false });
});


router.post('/validate/:field', async function (req, res, next) {
  try {
    
    if(req.params.field == "email"){
      console.log("Email ")
      var condition = { "email": req.body.email}
    }else{

      var condition =  {"mobile" : req.body.mobile}
    }
    console.log("Find data ." ,condition)
    const adminData = await adminModel.findOne(condition)
    console.log("admin data type : -" , adminData)
    if(adminData){
      return res.send(false)
    }
    return res.send(true)
  }catch(error) {
      console.log("Error in fetch admin data " , error)
      res.send("Error in fetch data.")
  }
});

// route of admin register data save page
router.post('/register', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,

  }
  //bind the i/p data with admin model
  var data = adminModel(mybodydata);
  //save data into database
  data.save(function (err) {
    //if error occur
    if (err) {
      console.log("Error in Insert Record" + err);
      //redirect to login page
    } else {
      console.log("Record Added");
      res.redirect("/admin/account/login");
    }
  })

});

//admin login page
router.get('/login', function (req, res, next) {
  //res to admin login page
  res.render('admin/account/login', { layout: false });
});
/*
router.post('/login', function(req, res, next) {
    console.log("Login process")
    var email = req.body.email;
    var password = req.body.password;

    console.log(req.body);
    adminModel.findOne({ "email": email }, function(err, db_admin_data) {

        console.log("Find One " + db_admin_data);

        if (db_admin_data) {
            var db_id = db_admin_data._id;
            var db_email = db_admin_data.email;
            var db_password = db_admin_data.password;

        }
        console.log("db_admin_data._id " + db_id);
        console.log("db_admin_data.email " + db_email);
        console.log("db_admin_data.password " + db_password);

        if (db_email == null) {
            console.log("If");
            res.end("Email not Found");
        } else if (db_email == email && db_password == password) {
            console.log("i m inside....")
            req.session.email = db_email;
            req.session._id = db_id;
            res.redirect('/');
        } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
        }
    });
});
*/

// route of admin login data  page
router.post('/login', function (req, res, next) {
  //get the user data
  var emailOrmobile = req.body.emailOrmobile;
  var password = req.body.password;

  //find the data from admin model
  adminModel.findOne({ }, function (err, db_admin_data) {

    console.log("Find One ", db_admin_data);
    console.log(db_admin_data.email, 'Email');
    console.log(db_admin_data.mobile, 'mobile');
    console.log(db_admin_data.password == password, 'Password');
    //if data is match with condition 
    if ((db_admin_data && db_admin_data.email == emailOrmobile || db_admin_data.mobile == emailOrmobile) && db_admin_data.password == password) {
      req.session.email = db_admin_data.email;
      req.session._id = db_admin_data._id;
      //redirect to home page
      res.redirect('/');
      //else data is invalid 
    } else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});

//admin forgot-password page 
router.get('/forgot-password', function (req, res, next) {
  //res to admin forgot-password page
  res.render('admin/account/forgot-password', { layout: false });
});

// route of admin forgot-password data  page
router.post('/forgot-password', function (req, res, next) {
  //get the user data
  var email = req.body.email;
  console.log(req.body);

  //find the data from admin model
  adminModel.findOne({ "email": email }, function (err, db_admin_data) {

    console.log("Find One " + db_admin_data);
    //if data is match with condition 
    if (db_admin_data) {
      var db_email = db_admin_data.email;
      var db_password = db_admin_data.password;

    }

    console.log("db_admin_data.email " + db_email);
    console.log("db_admin_data.password " + db_password);
    //if data is null
    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    //if data is match 
    else if (db_email == email) {

      "use strict";
      const nodemailer = require("nodemailer");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: 'gmail', // true for 465, false for other ports
          auth: {
            user: 'testfor.dhanvigajjar@gmail.com',
            pass: 'Dhanvi@13'
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: 'testfor.dhanvigajjar@gmail.com', // sender address
          to: db_email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: "Hello your password is " + db_password, // plain text body
          html: "Hello your password is " + db_password // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.end("Password Sent on your Email");

      }

      main().catch(console.error);


      //else login invalid
    } else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});

// admin change-password  page
router.get('/change-password', function (req, res, next) {
  //if data is not undefind or null (if session email is not exists)
  if (!req.session.email) {
    console.log("Email Session is Set");
    //redirect to login page
    res.redirect('/admin/account/login');
  }
  //render to change -password page
  res.render('admin/account/change-password', { layout: false });
});

// admin change-password data save page
router.post('/change-password', function (req, res, next) {
  //if data is not undefind or null (if session email is not exists)
  if (!req.session.email) {
    console.log("Email Session is Set");
    //redirect to login page
    res.redirect('/admin/account/login');
  }
  console.log("Home Called " + req.session.email);
  //get the user data
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  //find the data from admin model
  adminModel.findOne({ "email": myemail }, function (err, db_admin_data) {
    //if old password in not match
    if (err) {
      console.log("Error in Old Password Fetch " + err);
      //else 
    } else {
      console.log(db_admin_data);

      //old password is match with the data
      if (opass == db_admin_data.password) {
        //if old password & new password is same 
        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {
          //new password & confirm the new password
          if (npass == cpass) {
            //find the data from admin model & update the new password 
            adminModel.findOneAndUpdate({ "email": myemail }, { $set: { "password": npass } }, function (err) {
              //if error occur
              if (err) {
                res.end("Error in Update" + err);
              } else {
                //else
                res.send("Password Changed");
              }

            });
          } else {
            //if new password & confirm  password is not matched
            res.end("New Password and Confirm Password not match");
          }
        }

      } else {
        //if old password not matched
        res.end("Old Password Not Match");
      }
    }
  });
});

//Logout Page
router.get('/logout', function (req, res) {
  //destroy the session
  req.session.destroy();
  //redirect to login page
  res.redirect("/admin/account/login");
});

//   myprofile
router.get('/myprofile/:myid', function (req, res) {
  console.log("my id json.. : ", req.params.myid);
  // console.log("my id object : ", JSON.parse(myid))
  //find the data from admin model
  adminModel.findById(req.params.myid, function (err, db_admin_data) {
    // if data is not fecth
    if (err) {
      console.log("display Fetch Error " + err);
    } else {
      console.log(db_admin_data);
      //response to myprofile data
      res.render('admin/account/myprofile', { admin_data: db_admin_data });
    }
  }).lean();
});

// router.get('/edit_myprofile/:myid', function(req, res) {
//     console.log("my id json : ",req.params.myid);
//     // console.log("my id object : ", JSON.parse(myid))

// adminModel.findById(req.params.myid, function(err, db_admin_data) {
//     if (err) {
//         console.log("display Fetch Error " + err);
//     } else {
//         console.log(db_admin_data);

//         res.render('admin/account/edit_myprofile', { admin_data: db_admin_data });
//     }
// }).lean();
// });



// router.post('/edit_myprofile/:myid', function(req, res) {

//     console.log("Edit ID is"+ req.params.myid);
//       var id = req.params.myid;
//         const mybodydata = {
//           email: req.body.email 
//         }

//         adminModel.findByIdAndUpdate(req.params.myid, mybodydata, function(err) {
//             if (err) {
//                 console.log("Error in Record Update");
//                 res.send("profile updated Failed... TRY AGAIN");
//                 // res.redirect('/admin/account/category');
//             } else {

//                 res.send("profile updated successfully...");
//             }
//         });
//       });


// edit myprofile page
router.get("/edit_myprofile/:myid", async function (req, res) {
  console.log("my id json : ", req.params.myid);
  // console.log("my id object : ", JSON.parse(myid))
  try {
    //find the data from admin model
    let db_admin_data = await adminModel.findById(req.params.myid).lean()
    console.log(db_admin_data);
    //response to myprofile data
    res.render("admin/account/edit_myprofile", {
      admin_data: db_admin_data,
    })
    //error in data fetch
  } catch (err) {
    console.log("display Fetch Error " + err);
  }
});

// edit myprofile data save page
router.post("/edit_myprofile/:myid", async function (req, res) {
  console.log("Edit ID is" + req.params.myid);
  //get the user data
  var id = req.params.myid;
  const mybodydata = {
    email: req.body.email,
  };
  try {
    //find the data from admin model
    let editdata = await adminModel.findByIdAndUpdate(req.params.myid)
    //response to myprofile data
    res.send("profile updated successfully...");
  }
  //error in data fetch
  catch (err) {
    console.log("Error in Record Update");
    res.send("profile updated Failed... TRY AGAIN");
    // res.redirect('/admin/account/category');
  }

});


module.exports = router;