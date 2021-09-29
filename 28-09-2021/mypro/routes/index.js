var express = require('express');
var router = express.Router();

var UserModel = require('../model/user_model');
var StudModel = require('../model/user_student');
var EmpModel = require('../model/user_emp');
var CModel=require('../model/category');
var ProModel=require('../model/product');
var AdminModel = require('../model/admin');
var UserauthModel = require('../model/userauth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function(req, res, next) {
  res.render('form');
});

router.post('/form-process', function(req, res, next) {
  
  const mybodydata = {
    user_name : req.body.nm,
    user_mobile : req.body.mno
  }
  var data = UserModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.redirect("/form");
    }
  })

});

router.get('/display', function(req, res, next) {
  UserModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('display',{mydata:data});
    }
  }).lean();
});
router.get('/delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/display');
    }
  })
  
});
router.get('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('edit',{mydata:data})
    }
  }).lean();

});
router.post('/edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    user_name : req.body.nm,
    user_mobile : req.body.mno
  }

  UserModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/display');
    }
  }).lean();

});

//student start

router.get('/registration', function(req, res, next) {
  res.render('student/registration');
});

router.post('/std-process', function(req, res, next) {
  
  const mybodydata = {
    stud_name : req.body.nm,
    stud_mobile : req.body.mno,
    stud_email : req.body.email,
    stud_gender :req.body.gender,
    stud_dob :req.body.dob,
    stud_hobbies :req.body.hobbies,
  }
  var data = StudModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
      //res.redirect("/student/registartion");
    }
  })
  
});

router.get('/std-display', function(req, res, next) {
  StudModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('student/std-display',{mydata:data});
    }
  }).lean();
});
router.get('/deletestd/:id', function(req, res, next) {
  var deleteid = req.params.id;
  StudModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/std-display')
    }
  })
  
});
router.get('/std-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  StudModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('student/std-edit',{mydata:data})
    }
  }).lean();

});
router.post('/std-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    stud_name : req.body.nm,
    stud_mobile : req.body.mno,
    stud_email : req.body.email,
    stud_gender :req.body.gender,
    stud_dob :req.body.dob,
    stud_hobbies :req.body.hobbies,
  }

  StudModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/std-display');
    }
  }).lean();

});


//employee start

router.get('/emp-form', function(req, res, next) {
  res.render('employee/emp-form');
});
router.post('/emp-process', function(req, res, next) {
  
  const mybodydata = {
    emp_name : req.body.nm,
    emp_mobile : req.body.mno,
    emp_age:req.body.age,
    emp_salary:req.body.sal
  }
  var data = EmpModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
  
});
router.get('/emp-display', function(req, res, next) {
  EmpModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('employee/emp-display',{mydata:data});
    }
  }).lean();
});
router.get('/emp-delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  EmpModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/emp-display')
    }
  })
  
});
router.get('/emp-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  EmpModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('employee/emp-edit',{mydata:data})
    }
  }).lean();

});
router.post('/emp-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    emp_name : req.body.nm,
    emp_mobile : req.body.mno,
    emp_age:req.body.age,
    emp_salary:req.body.sal
  }

  EmpModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/emp-display');
    }
  }).lean();

});

//categoryModel start
router.get('/category-form', function(req, res, next) {
  res.render('category/category-form');
});
router.post('/category-process', function(req, res, next) {
  
  const mybodydata = {
    c_name : req.body.cname,
    
  }
  var data = CModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
});
router.get('/category-display', function(req, res, next) {
  CModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('category/category-display',{mydata:data});
    }
  }).lean();
});
router.get('/category-delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  CModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/category-display');
    }
  })
  
});

router.get('/category-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  CModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('category/category-edit',{mydata:data})
    }
  }).lean();

});

router.post('/category-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    c_name : req.body.cname,
  }

  CModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/category-display');
    }
  }).lean();

});


//product start
router.get('/pro-form', function(req, res, next) {
  res.render('product/pro-form');
});

router.post('/pro-process', function(req, res, next) {
  
  console.log("File Send Success")
  const mybodydata = {
    pro_name : req.body.pname,
    pro_details : req.body.pdetail,
    pro_price:req.body.pprice,
    pro_qty:req.body.pqty,
   
  }
  var data = ProModel(mybodydata);

  data.save(function(err){
    if(err){
      console.log("Error in Add Record" + err);
    }else{
      console.log("Record Added");
      res.send("Record Successfully Added")
    }
  })
  
});

router.get('/pro-display', function(req, res, next) {
  ProModel.find(function(err,data){
    if(err){
      console.log("Error in Fetch Data" + err);
    }else{
      console.log("Record Data is " + data);
      res.render('product/pro-display',{mydata:data});
    }
  }).lean();
});

router.get('/pro-delete/:id', function(req, res, next) {
  var deleteid = req.params.id;
  ProModel.findByIdAndDelete(deleteid,function(err,data){
    if(err)
    {
      console.log("Error in Delete " + err);
    }else{
      console.log("Record Deleted " + deleteid);
      res.redirect('/pro-display')
    }
  })
  
});
router.get('/pro-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  ProModel.findById(editid,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log(data);
      res.render('product/pro-edit',{mydata:data})
    }
  }).lean();

});
router.post('/pro-edit/:id', function(req, res, next) {
  var editid = req.params.id;
  const mybodydata = {
    pro_name : req.body.pname,
    pro_price:req.body.pprice,
    pro_qty:req.body.pqty,
  }
  ProModel.findByIdAndUpdate(editid,mybodydata,function(err,data){
    if(err){
      console.log("Error in Edit" + err)
    }else{
      console.log( "Record Updated" +  data);

      res.redirect('/pro-display');
    }
  }).lean();

});


router.get('/admin-form', function(req, res, next) {
  res.render('admin/admin-form');
});
router.post('/admin-process', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_isadmin: req.body.user_isadmin

  }
  var data = AdminModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      console.log("Record Added");
      res.redirect("/admin-form");
    }
  })

});
router.get('/admin-display', function (req, res, next) {

  AdminModel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('admin/admin-display', { user_array: db_users_array });

    }
  }).lean();

});


router.get('/admin-login', function(req, res, next) {
  res.render('admin/admin-login');
});

//Login Process  Method
router.post('/admin-login', function (req, res, next) {
  var email = req.body.user_email;
  var password = req.body.user_password;
  console.log(req.body);
  AdminModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email && db_password == password) {
            
      req.session.email = db_email;
      res.redirect('/admin-home');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
 });
});
router.get('/admin-home', function (req, res, next) {

  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  console.log(myemail);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('admin/admin-home', { myemail: myemail });
});


router.get('/admin-changepw', function (req, res, next) {
  var myemail = req.session.email;
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/admin-login');
  }

  res.render('admin/admin-changepw');
});


//Change Password Process Page

router.post('/admin-changepw', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('admin/admin-login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  AdminModel.findOne({ "user_email": myemail }, function (err, db_users_array) {
    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);


      if (opass == db_users_array.user_password) {

        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {

            AdminModel.findOneAndUpdate({ "user_email": myemail }, {$set: {"user_password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed");
              }
           
            });
          } else {
            res.end("New Password and Confirm Password not match");
          }
      }

      } else {
        res.end("Old Password Not Match");
      }
    }
  });

});

router.get('/admin-logout', function (req, res) {
  req.session.destroy();
  res.redirect('/admin-login');
});



//Forgot Password Get Method
router.get('/admin-forgotpw', function (req, res, next) {
  res.render('admin/admin-forgotpw');
});


//Login Process  Method
router.post('/admin-forgotpw', function (req, res, next) {

  var email = req.body.user_email; 

  console.log(req.body);
  AdminModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
     
      
      

      "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

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
    to: 'gajjardhanvi456@gmail.com', // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});


router.get('/admin-delete/:id', function (req, res) {
  AdminModel.findOneAndDelete(req.params.id, function (err, project) {
    if (err) {

      console.log("Error in Record Delete " + err);
      res.redirect('/admin-display');
    } else {

      console.log(" Record Deleted ");
      res.redirect('/admin-display');
    }
  });
});

router.get('/admin-edit/:id', function (req, res) {
  var editid = req.params.id;
  console.log(req.params.id);

  AdminModel.findById(req.params.id, function (err, db_users_array) {
    if (err) {
      console.log("Edit Fetch Error " + err);
    } else {
      console.log(db_users_array);

      res.render('admin/admin-edit', { user_array: db_users_array });
    }
  }).lean();
});


router.post('/admin-edit/:id', function (req, res) {
  var editid = req.params.id;
  console.log("Edit ID is" + req.params.id);

  const mybodydata = {
    user_name: req.body.user_name,
    user_mobile: req.body.user_mobile
  }

 AdminModel.findByIdAndUpdate(req.params.id, mybodydata, function (err,db_users_array) {
    if (err) {
      console.log("Error in Record Update");
    } else {
      console.log( "Record Updated" + db_users_array );
      res.redirect('/admin-display');
      
    }
  });
});



//user authentication start
router.get('/user-form', function(req, res, next) {
  res.render('userauth/user-form');
});
router.post('/user-process', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    user_name: req.body.user_name,
    user_gender: req.body.user_gender,
    user_dob: req.body.user_dob,
    user_mobile: req.body.user_mobile,
    user_email: req.body.user_email,
    user_password: req.body.user_password,
    user_isadmin: req.body.user_isadmin

  }
  var data = UserauthModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
    } else {
      console.log("Record Added");
      res.redirect("/user-form");
    }
  })

});
router.get('/user-display', function (req, res, next) {

  UserauthModel.find(function (err, db_users_array) {
    if (err) {
      console.log("Error in Fetch Data " + err);
    } else {
      //Print Data in Console
      console.log(db_users_array);
      //Render User Array in HTML Table
      res.render('userauth/user-display', { user_array: db_users_array });

    }
  }).lean();

});


router.get('/user-login', function(req, res, next) {
  res.render('userauth/user-login');
});


router.post('/user-login', function (req, res, next) {
  var email = req.body.user_email;
  var password = req.body.user_password;
  console.log(req.body);
  UserauthModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email && db_password == password) {
            
      req.session.email = db_email;
      res.redirect('/user-home');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
 });
});
router.get('/user-home', function (req, res, next) {

  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  console.log(myemail);

  //Auth
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.end("Login required to Access this page");
  }
  res.render('userauth/user-home', { myemail: myemail });
});



router.get('/user-changepw', function (req, res, next) {
  var myemail = req.session.email;
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/user-login');
  }

  res.render('userauth/user-changepw');
});


//Change Password Process Page

router.post('/user-changepw', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('userayth/user-login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  UserauthModel.findOne({ "user_email": myemail }, function (err, db_users_array) {
    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);


      if (opass == db_users_array.user_password) {

        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {

          if (npass == cpass) {

           UserauthModel.findOneAndUpdate({ "user_email": myemail }, {$set: {"user_password": npass}}, function (err) {
           
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 

                res.send("Password Changed");
              }
           
            });
          } else {
            res.end("New Password and Confirm Password not match");
          }
      }

      } else {
        res.end("Old Password Not Match");
      }
    }
  });

});

router.get('/user-logout', function (req, res) {
  req.session.destroy();
  res.redirect('/user-login');
});


//Forgot Password Get Method
router.get('/user-forgotpw', function (req, res, next) {
  res.render('userauth/user-forgotpw');
});


//Login Process  Method
router.post('/user-forgotpw', function (req, res, next) {

  var email = req.body.user_email; 

  console.log(req.body);
  UserauthModel.findOne({ "user_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
     
      
      

      "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(){

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
    to: 'gajjardhanvi456@gmail.com', // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});


router.get('/user-delete/:id', function (req, res) {
  UserauthModel.findOneAndDelete(req.params.id, function (err, project) {
    if (err) {

      console.log("Error in Record Delete " + err);
      res.redirect('/user-display');
    } else {

      console.log(" Record Deleted ");
      res.redirect('/user-display');
    }
  });
});

router.get('/user-edit/:id', function (req, res) {
  var editid = req.params.id;
  console.log(req.params.id);

  UserauthModel.findById(req.params.id, function (err, db_users_array) {
    if (err) {
      console.log("Edit Fetch Error " + err);
    } else {
      console.log(db_users_array);

      res.render('userauth/user-edit', { user_array: db_users_array });
    }
  }).lean();
});


router.post('/user-edit/:id', function (req, res) {
  var editid = req.params.id;
  console.log("Edit ID is" + req.params.id);

  const mybodydata = {
    user_name: req.body.user_name,
    user_mobile: req.body.user_mobile
  }

 UserauthModel.findByIdAndUpdate(req.params.id, mybodydata, function (err,db_users_array) {
    if (err) {
      console.log("Error in Record Update");
    } else {
      console.log( "Record Updated" + db_users_array );
      res.redirect('/user-display');
      
    }
  });
});


module.exports = router;
