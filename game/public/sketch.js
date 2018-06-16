var player;
var zoom = 0;
var socket;
var players = new Map();
var foods = [];

function setup() {
    createCanvas(600, 600);
    socket = io.connect('http://localhost:3000');

    player = new Blob(0, 0, 64);

    let data = {
        x: player.pos.x,
        y: player.pos.y,
        r: player.r
    };

    socket.emit('start', data);

    //adding food
    for(let i = 0; i < 100; i++){
        var x = random(-width * 2, width * 2);
        var y = random(-height * 2, height * 2);
        var r = random(10, 25);
        let food = new Blob(x, y, r);
        foods.push(food);
        
    }
}

function draw() {
    background(150);

    // Moving background based on player psotion
    translation();

    /* Showing all the players, food and checking if player
     eats food*/
    rendering();

    // Doing all the surver stuff (emiting and receiveng messages)
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
    player.show();
    player.update();

    for(let i = foods.length - 1; i >= 0; i--){
        foods[i].show();
        if(player.eats(foods[i])){
            foods.splice(i, 1);
        }
    }


    // Adding food on random place
    if(random(1) < 0.01){
        var x = random(-width, width);
        var y = random(-height, height);
        var r = random(10, 25);
        var food = new Blob(x, y, r);
        foods.push(food);
    }
    
    // Showing other players
    for(let player of players){
        fill(80);
        if(player[1].id !== socket.id){
            ellipse(player[1].x, player[1].y, player[1].r*2, player[1].r*2);
        }
    }
}

function server(){
    var data = {
        x: player.pos.x,
        y: player.pos.y,
        r: player.r
    };

    socket.emit('update', data);
    socket.on('interval', (blobs) => {
        for(var [id, player] of blobs){      
            players.set(id, player);       
        }
    });
}