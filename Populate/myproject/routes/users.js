var express = require('express');
var router = express.Router();


// Model Loading
var UserModel = require('../model/users');
var AreaModel = require('../model/area');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.get('/userform', function(req, res, next) {
        AreaModel.find(function(err, data) {
              if (err) {
                  console.log("Error in Fetch Data " + err);
                } else {
                  //Print Data in Console
                  console.log(data);
                  //Render User Array in HTML Table
                  res.render('admin/users/userform', { mydata : data });
                  
                }
            });
        //res.render('add-category');
        });
        
router.post('/userform', function(req, res, next) {
    console.log(req.body);
    const mybodydata = {
        user_name: req.body.user_name,
        user_gender: req.body.user_gender,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_address:req.body.user_address,
        user_photo: req.body.user_photo,
        _area: req.body._area

    }
    var data = UserModel(mybodydata);
    data.save(function(err) {
            if (err) {
                console.log("Error in Add Record" + err);
            } else {
                console.log("Record Added");
                res.send("Data Added")
            }
    });
});


router.get('/userdisplay', function(req, res, next) {
    UserModel.find(function(err, data) {
       console.log(data);
       if (err) res.json({message: 'There are no posts here.'});

       UserModel.find({})
       .populate('_area')
       .exec(function(err, data) {

        console.log(data);
        res.render("admin/users/userdisplay", { mydata: data });
       });
});
});



router.get('/user-delete/:id', function(req, res, next) {
    var deleteid = req.params.id;
    UserModel.findByIdAndDelete(deleteid, function(err, data) {
        if (err) {
            console.log("Error in Delete" + err);
            res.redirect('/userdisplay');
        } else {
            console.log("Record Deleted" + deleteid);
            res.redirect('/admin/users/userdisplay');
        }
    });
    
});  

router.get('/user-edit/:id', function(req, res, next) {
    var editid = req.params.id;
    UserModel.findById(editid, function(err, data) {
        if (err) {
            console.log("Error in Edit" + err)
        } else {
            console.log(data);
            res.render('admin/users/user-edit', { mydata: data })
        }
    }).lean();
});

router.post('/user-edit/:id', function(req, res, next) {
    var editid = req.params.id;
    const mybodydata = {
        user_name: req.body.name,
        user_email: req.body.email,
    }
    UserModel.findByIdAndUpdate(editid, mybodydata, function(err,data) {
        if (err) {
            console.log("Error in Edit" + err);
            res.redirect('/admin/user/userdisplay');
        } else {
            console.log(data);
            res.redirect('/admin/users/userdisplay');
        }
    }).lean();
});



module.exports = router;
