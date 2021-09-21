var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { peoples: [
    { name: 'user1'},
    { name: 'user2'},
    ]});
});
router.get('/home', function(req, res, next) {
  res.render('home');
});
router.get('/about1', function(req, res, next) {
  res.render('about1');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/form', function(req, res, next) {
  res.render('form', { title: 'Express' });
});

router.post('/formprocess', function(req, res, next) {
  console.log(req.files.file123);
  var fileobject=req.files.file123;//file object
  var filename = req.files.file123.name; //Get File Name
  var filesize = req.files.file123.size;
//File Upload Code
//Allow only JPG,PNG and GIF Files only
if(req.files.file123.mimetype == "image/jpeg" || req.files.file123.mimetype == "image/png"|| req.files.file123.mimetype == "image/gif" &&  req.files.file123.size < 2 * 1024 * 1024)
{
fileobject.mv("public/upload/"+filename, function(err) {
if (err)
return res.status(500).send(err);
res.send('File uploaded!');
});
}
else{
  res.send(' JPG,PNG and GIF Files only & Max File size 2 MB Only');
  }
});


//multer
router.get('/form1', function(req, res, next) {
  res.render('form1', { title: 'Express' });
});

router.post('/uploadfile', function(req, res, next) {
  //File Upload Code
  console.log(req.files.file1); //Print all File Information
  var myfile = req.files.file1; //File Object
  var myfilename = req.files.file1.name; //Get File Name
  //File Upload Code
  myfile.mv('public/upload/'+myfilename, function(err) {
  if (err)
  return res.status(500).send(err);
  //res.send('File uploaded!');
  });
  });
module.exports = router;
