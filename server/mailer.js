// WOULD LIKE TO IMPLEMENT IN REFACTOR / POSSIBLY REDUNDANT
var nodemailer = require('nodemailer');

exports.send = function(req,res){

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '****@gmail.com', // *Admin Email
        pass: '****' // *Admin Pass
    }
});

var mailOptions = {
    from: 'kshore2k18@gmail.com',
    to: 'kshore2k18@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }
    else {
        console.log('Email sent: ' + info.response);
    }
});

}
