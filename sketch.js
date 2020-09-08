var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;


var divisions = []; 
var particles = [];
var plinkos = [];

var particle;

var gameState = "Play";

var divisionHeight=300;
var score = 0;
var turn = 0;
function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  
  background('Black');


  Engine.update(engine);
 
    if(gameState == "Play"){
      
      if(frameCount%60===0){
        particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
      }
    
     for (var j = 0; j < particles.length; j++){
        particles[j].display();
      }
  
     for (var i = 0; i < plinkos.length; i++) {
       plinkos[i].display();
     }
   
     for (var k = 0; k < divisions.length; k++) {
       divisions[k].display();
     }
     
   increaseScore();
   stroke("Yellow");
   textSize(20)
   text("Score : "+score,20,30);
   line(0,500,800,500);

}
   
   if(gameState == "End"){
    gameOver();
   }
  
   

   console.log(turn);
  
}

function mousePressed(){
  gameState = "Play"
  if(gameState !== "end"){
     turn++;
     particle = new Particle(mouseX,10,10,10);
  }
}

function increaseScore(){
  if(particle!=null && gameState == "Play"){
    particle.display();
    if(particle.body.position.x < 300){
      score = score + 500;
      if(turn >= 5) gameState = "end";
    }
    if(particle.body.position.x > 301 && particle.body.position.x < 600){
      score = score +  100;
      if(turn >= 5) gameState = "end";
    }
    if(particle.body.position.x > 601 && particle.body.position.x < 900){
      score = score + 200;
      if(turn>=5) gameState = "end";
    }
  }
}

function gameOver(){
  if(turn == 5){
    textSize(20);
    text("GAME OVER",200,200);
  }
}
