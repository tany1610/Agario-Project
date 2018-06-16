var blobs = new Map();

function Blob(x, y, r, id){
    this.x = x;
    this.y = y;
    this.id = id;
    this.r = r;
}

var express = require('express');
var app = express();
var port = 65530;
var server = app.listen(port);


app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

setInterval(sendBlobs, 1000);

function sendBlobs(){
    io.sockets.emit('interval', [...blobs]);
}

io.sockets.on('connection', (socket) => { 
    // console.log(socket.id);

    socket.on('start', (data) => {
        var blob = new Blob(data.x, data.y, data.r, socket.id)
        blobs.set(socket.id, blob);
    }); 

    socket.on('update', (data) => {
        var blob = blobs.get(socket.id);
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
        // console.log(blob.id);
        // console.log(blob.x + blob.y);
    });
});

console.log("server is running on port " + port);