var express = require('express');
var socket = require('socket.io');
const port = 5000;
var app = express();

var server = app.listen(port, () => {
    console.log('Server is running at loclhost:' + port );
});


app.use(express.static('public_html'));

var sio = socket(server);

sio.on('connection', (visitor) => {

    console.log('we have a new visitor with id ', visitor.id);

    visitor.on('message', (data) => {
        sio.sockets.emit('new_msg', data);
    });

    visitor.on('broad', (data) => {
        visitor.broadcast.emit('new_broad', data);
    });

});