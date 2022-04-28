//Agnes Ria Sitorus 119160076//
let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
  j=1
}

function draw() {
  background		(176,224,230);
  v.display()
  v.edges()
  v.update();
  v.wander();
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 50.0;
    this.maxspeed = 1;
    this.maxforce = 0.009;
    this.wanderTheta = 0;
  }
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location)
    let wanderRadius = 50;
    noFill()
    stroke(255)
    let theta = this.wanderTheta  + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    let debug = true 
    if (debug){
      push()  
      fill(205,92,92)
      circle (projPoint.x, projPoint.y, 50)
      circle (projPoint.x, projPoint.y, 25)
      pop()
    }
    let steeringforce = wanderPoint.sub(this.location);
    steeringforce.setMag(this.maxforce)
    this.applyForce(steeringforce)
    
    this.wanderTheta += random(-0.5, 0.5);  
    }
  seek(vektorTarget){
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  arrive(vektorTarget){
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
      strokeWeight(0)
  fill(294,204,255)
  strokeWeight(0)
  fill(294,204,255)
  ellipse(300,75,78,70) // badan atas
  ellipse(300,122,98,99) // badan bawah
  ellipse(250,80,30,60) // tangan kanan
  ellipse(340,80,30,60) // tangan kiri
  
  arc(310,150,45,100, radians(-30), radians(190)) // kaki kanan
  ellipse(300,35,45,30) // pala
 

  strokeWeight(1)
  fill(255,102,102)
  rect(250,180,86,15) // papan
  rect(245,170,20,30) // papan kiri
  rect(330,170,20,30) // papan kanan
  
  
  strokeWeight(6)
  point(290,33) // mata kiri
  point(310,33) // mata kanan
  strokeWeight(1)
  fill(0,0,0)
  line(295,33,305,33)

  strokeWeight(0.5)
  var y = 150 + 20*Math.sin(j/20);
  j += 0.3;
  fill(294,204,255)
  arc(285,y,45,100, radians(-10), radians(-150)) // kaki kiri;

    pop();
  }
  
  
  

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}