
const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testfor.dhanvigajjar@gmail.com',
        pass: 'Dhanvi@13'
    }
});
let mailDetails = {
    from: 'testfor.dhanvigajjar@gmail.com',
    to: 'gajjardhanvi456@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for nodemailer',
    attachments: [
        {
         filename: 'image1.jpg',
          path: __dirname + '/image1.jpg',
          cid: 'uniq-image1.jpg'
    }
    ]
    
};
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
    } else {
        console.log('Email sent successfully');
    }
});

