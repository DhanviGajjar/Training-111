var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/send', function(req, res, next) {
  console.log(req.body);
  const output = `<p>You have new contact request</p>
  <h3>Inquiry Contact Details</h3>
  <table style=" font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 80%;">
  <tr>
  <th style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: black;">Name</th>
  <th  style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: black;">Email</th>
  <th  style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: red;">Password</th>
  <th  style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: black;">Mobile</th>
  <th  style="padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: lightblue;
  color: black;">Gender</th>
  </tr>
  <tr>
  <td>${req.body.name}</td>
  <td>${req.body.email}</td>
  <td style="color: red;">${req.body.password}</td>
  <td>${req.body.phone}</td>
  <td>${req.body.gender}</td>
  </tr>
  </table>`;
  

// nodemailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testfor.dhanvigajjar@gmail.com',
    pass: 'Dhanvi@13'
  }
});
const mailOptions = {
  from: 'testfor.dhanvigajjar@gmail.com',
  to: 'gajjardhanvi456@gmail.com',
  subject: 'Test mail',
  text: 'Node.js testing mail for nodemailer',
  html: output, // html body
};
transporter.sendMail(mailOptions, function(err, info) {
  if (err)
      console.log(err)
  else
      console.log(info);
  console.log("MAIL SENT");
});
res.render('signup', { msg: 'Email has been sent successfully.' })
});
 
//email

router.get('/email', function(req, res, next) {
  res.render('email');
});

router.post('/email', function (req, res, next) {
  console.log(req.body);

  var email =req.body.email;
  var sub = req.body.sub;
  var body=req.body.body;
  let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: 'testfor.dhanvigajjar@gmail.com',
      pass: 'Dhanvi@13'
    },
  });

  var emailOptions = {
    from:'testfor.dhanvigajjar@gmail.com',
    to:email,
    subject:sub,
    text:body,

};
  transporter.sendMail(emailOptions, (err, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Message Sent: ' + info.response);
      console.log('Email Message: ' + emailMessage);
    }
  });

  res.render('sendto', {email: email, sub: sub, body: body});

});

module.exports = router;
