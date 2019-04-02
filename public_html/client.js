var socket = io.connect('http://localhost:5000');

var username = document.getElementById('username');
var message = document.getElementById('message');
var send = document.getElementById('send');
var chat = document.getElementById('chat');
var broadcast = document.getElementById('broad');

send.addEventListener('click', () => {
    socket.emit('message', {
        message: message.value,
        username:username.value,
    });
});

message.addEventListener('keypress', () => {
    socket.emit('broad', {
        username: username.value,
    });
});

socket.on('new_msg', (data) => { 
    broadcast.innerHTML = '';
    chat.innerHTML += '<div class="container"><strong>' + data.username + '</strong >' + data.message +' </div >';
});

socket.on('new_broad', (data) => {
    broadcast.innerHTML = "<strong>" + data.username + '</strong> Typing a message <img src="write.gif" style="width:50px; height:25px">';
});