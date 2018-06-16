var player;
var zoom = 0;
var socket;
var players = new Map();

function setup() {
    createCanvas(600, 600);
    socket = io.connect('http://localhost:65530');

    player = new Blob(0, 0, 64);

    let data = {
        x: player.pos.x,
        y: player.pos.y,
        r: player.r
    };

    socket.emit('start', data);
}

function draw() {
    background(150);

    translation();
    rendering();
    server();
}

function translation(){
    translate(width / 2, height / 2);
    var newzoom = 64 / player.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-player.pos.x,-player.pos.y);
}

function rendering(){
    for(let player of players){
        fill(80, 0, 0);
        ellipse(player[1].x, player[1].y, player[1].r*2, player[1].r*2);
    }

    player.show();
    player.update();
    player.constrain();
}

function server(){
    var data = {
        x: player.pos.x,
        y: player.pos.y,
        r: player.r
    };

    socket.emit('update', data);
    socket.on('interval', addBlobs);
}

function addBlobs(blobs){
    for(var [id, player] of blobs){
        if(!players.has(id)){
            players.set(id, player);
        }
    }
}