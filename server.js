var express = require('express');

var bodyParser = require('body-parser');

var session = require('express-session');

var flash = require('express-flash');

var app = express();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(session({
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.use(flash());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public/dist/public'));

require('./server/routes')(app);

io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user connected');

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', {type:'new-message', text: message});    
    });
});

http.listen(8000, () => {
    console.log("listening on port 8000")
})