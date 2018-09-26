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

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
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
        from: req.body.email, // sender address (who sends)
        to: 'erwan.herledan@outlook.fr', // list of receivers (who receives)
        subject: 'Vous avez reçu un message de ' + req.body.name, // Subject line
        text: 'Hello world ', // plaintext body
        html: req.body.message // html body
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