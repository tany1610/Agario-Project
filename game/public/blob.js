function Blob(x, y, r, col, tag){
    this.pos = createVector(x,y);
    this.r = r;
    this.vel = createVector(0,0);
    if(col){
        this.col = col;
    }else{
        this.col = createVector(random(0, 255), random(0, 255), random(0, 255));
    }
    this.score = 0;
    if(tag){
        this.tag = 'player';
    }else{
        this.tag = 'food';
    }
    
}

Blob.prototype.eats = function(other){
    let d = p5.Vector.dist(this.pos, other.pos);
    if(d < this.r + other.r){
        let newr = PI * this.r * this.r + PI * other.r * other.r;
        newr = sqrt(newr / PI);
        this.r = lerp(newr, this.r, 0.1);
        return true;
    }else{
        return false;
    }
}

Blob.prototype.show = function(){
    stroke(0);
    strokeWeight(2);
    fill(this.col.x, this.col.y, this.col.z);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    if(this.tag === 'player'){
        textSize(this.r / 2);
        fill(0);
        text(this.score, this.pos.x, this.pos.y)
    }
}

Blob.prototype.update = function(){
    let newvel = createVector(mouseX - width/2, mouseY - height/2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
}