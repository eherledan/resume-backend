var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cred = require('./credentials');
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(8000, () => {
    console.log('Server started!');
});

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.post('/api/email', function (req, res) {
    let options, transport;
    transport = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: cred.EMAIL, 
            pass: cred.PASSWORD 
        }
    });

    options = {
        from: req.body.name,
        to: 'erwan.herledan@outlook.fr',
        subject: 'Vous avez reçu un message de ' + req.body.name,
        html: "From: " + req.body.name + "<br>" +
        "Email: " + req.body.email + "<br>" +     "Message: " + req.body.message
    };

    transport.sendMail(options, function (error, response) {
        if (error) {
            res.send({response: 'ERROR'});
        }
        else {
            res.send({response: 'SUCCESS'});
        }
    });
});