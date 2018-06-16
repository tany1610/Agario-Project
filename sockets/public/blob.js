function Blob(x, y, r, col){
    this.pos = createVector(x,y);
    this.r = r;
    this.vel = createVector(0,0);
    if(col){
        this.col = col;
    }else{
        this.col = createVector(random(0, 255), random(0, 255), random(0, 255));
    }
    this.score = 0;
}

Blob.prototype.constrain = function(){
    this.pos.x = constrain(this.pos.x, -200, 200);
    this.pos.y = constrain(this.pos.y, -200, 200);
}

Blob.prototype.show = function(){
    stroke(0);
    strokeWeight(2);
    fill(this.col.x, this.col.y, this.col.z);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
}

Blob.prototype.update = function(){
    let newvel = createVector(mouseX - width/2, mouseY - height/2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
}