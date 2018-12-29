var express = require('express');

var bodyParser = require('body-parser');

var session = require('express-session');

var flash = require('express-flash');

var app = express();

app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(flash());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/dist/public'));

require('./server/routes')(app);

app.listen(8000, () => {
    console.log("listening on port 8000")
})