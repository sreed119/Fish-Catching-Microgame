let fishNum = 8

//Piranha Function
function Fish(posX, posY, piranha, speed, colorR, colorG, colorB) {
   this.posX = posX;
   this.posY = posY;
   this.piranha = piranha;
   this.caught = false;
   this.speed = speed;
   this.colorR = colorR;
   this.colorG = colorG;
   this.colorB = colorB;
   //make Piranha shape
   this.makeFish = function() {
     if (piranha === true) {
       stroke(0);
       strokeWeight(2);
       //fill(183, 128, 255);
       fill(colorR, colorG, colorB);
       ellipse(posX,posY,50,50);
       triangle(posX-60,posY-30,posX-25,posY,posX-60,posY+30)
       fill(0)
       ellipse(posX+10,posY-10,4,4)
     }
     if (piranha === false) {
       stroke(0);
       strokeWeight(2);
       fill(235, 131, 52);
       ellipse(posX, posY, 50, 50);
       triangle(posX-60,posY-30,posX-25,posY,posX-60,posY+30)
       fill(0)
       ellipse(posX+10,posY-10,4,4)
     }
   }

   //move piranha forward
   this.moveFish = function() {
     posX += speed;
     //set the start y of goodFish to random before it goes on the screen
     if (piranha === false && posX <= -40) {
       posY = random(0,700);
     }
   }
   //check for restart
   this.checkRestart = function() {
     if (posX >= 1100) {
       posX = -50;
       posY = random(700);
     }
   }
   //check if piranha touches the bucket (when the distance between the mouse and the fish is less than or equal to 50)
    this.checkCaught = function() {
      if (dist(posX,posY,mouseX,mouseY) <= 50) {
        this.caught = true;
        gameOver = true;
        endTime = frameCount;
        if (piranha === true) {
          console.log("Oh no! You lost at " + endTime/70 + " seconds.")
        } else {
          console.log("Congrats! You won at " + endTime/70 + " seconds.")
        }
      }
    }
}


//Bucket function
function Bucket(x,y) {
  this.x = x;
  this.y = y;
  this.makeBucket = function(){
    stroke(100);
    strokeWeight(7);
    line(x-50, y-10, x, y-30);
    line(x, y-30, x+50, y-10);
    stroke(0);
    strokeWeight(5);
    fill(100);
    quad(x-50, y-10, x+50, y-10, x+25, y+30, x-25, y+30);
  }
  //check if a fish has been caught
  this.fillBucket = function(){
    //will show a purple fish in the bucket
    for (i=0; i<piranhas.length; i++) {
      if (piranhas[i].caught === true) {
        stroke(0);
        strokeWeight(2);
        //matches color of the piranha
        fill(piranhas[i].colorR, piranhas[i].colorG, piranhas[i].colorB);
        triangle(mouseX-30,mouseY-45,mouseX+30,mouseY-45,mouseX,mouseY-10);
      }
    }
    //will show the orange fish in the bucket
    if (goodFish.caught === true) {
      stroke(0);
      strokeWeight(2);
      fill(235, 131, 52);
      triangle(mouseX-30,mouseY-45,mouseX+30,mouseY-45,mouseX,mouseY-10);
    }
  }
}

//defining variables
let gameOver = false;
let piranhas = [];
let startx = -50;
let goodFish = new Fish(-50, 0, false, 5, 0, 0, 0);

function setup() {
  createCanvas(1000,700);
  //random value for when the orange fish shows up
  ran = random(100,400);
  for (i=0; i<fishNum; i++) {
    //a random purple color value for each fish
    fishR = random(50,170);
    fishG = random(22,70);
    fishB = random(107,255);
    piranhas[i] = new Fish(startx, random(100,700), true, random(3,10), fishR, fishG, fishB);
    startx -= 100;
  }
}

//draw function
function draw() {
  //changes background based on status of the game (playing - blue, lost - red, won - green)
  if (goodFish.caught === true) {
    background(88, 209, 23)
  } else if (gameOver === true) {
    background(150, 32, 32)
  } else{
    background(128, 177, 255);
  }
  //draw Piranha using constructor function
  for (i=0; i<piranhas.length; i++) {
    if (piranhas[i].caught === false && goodFish.caught === false && gameOver === false) {
      piranhas[i].makeFish();
      piranhas[i].moveFish();
      piranhas[i].checkRestart();
      piranhas[i].checkCaught();
    }
  }
  //draw bucket using contructor
  let bucket = new Bucket(mouseX, mouseY);
  bucket.makeBucket();
  bucket.fillBucket();

  //draw the good fish using contructor
  if (frameCount >= ran && goodFish.caught === false && gameOver === false) {
    goodFish.makeFish();
    goodFish.moveFish();
    goodFish.checkRestart();
    goodFish.checkCaught();
  }
  //display seconds in the console
  if (frameCount % 70 === 0 && gameOver === false) {
    console.log(frameCount/70);
  }
}
