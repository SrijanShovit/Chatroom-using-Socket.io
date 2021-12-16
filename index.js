var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(4000,function(){
    console.log('Listening to requests on port 4000')
})


//Static files  ---after port connection started will automatically look for index.html in public 
app.use(express.static('public'))


//Socket setup -- parameter is which server we wanna work with
var io = socket(server)

io.on('connection',function(socket) {
    console.log('made socket connection',socket.id)

    //listening to msgs being sent from clientside
    //Emit event 
    socket.on('chat',function(data) {
        io.sockets.emit('chat',data)  //emitting chat data to all clients
        
    })
    
    //Broadcasting msgs
    //These msgs will be visible to everyone except the one sent this data
    socket.on('typing',function(data) {
        socket.broadcast.emit('typing',data)
    })
})







