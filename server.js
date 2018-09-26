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
            res.send(error);
        }
        else {
            res.send('SUCCESS');
        }
    });
});