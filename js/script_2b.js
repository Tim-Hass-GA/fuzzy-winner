console.log("script_2b.js is here player control");

// Tim Hass // Feb 2018 // GA - Project 1
// Dedication: Brian Lifton Aug 2008 - May 2017

// Game Name: Pooper Scooper
// Your dog Brian likes to have a clean area to run, play, and jump in
// the objective of the game is to keep the area clean, so
// Brian can have a nice place to have fun

// the game begins with one dog on the board
// the game is over if more than x# of poops are left on the GameBoard (varies per level)
// the game is over when a player reaches 10 points 3 times or the game reaches 10 points
// the game is timed every 2 minutes the game gets a point
// the game moves to the next level when PlayerX reaches 10 points (timers reset for each level)

// player must move around all obstacles in the game
//    if player hits the same obstable twice
//        while poop in hand the poop will drop
// player must pick up poop again
// player must move to the poop safeZone
// player must click on poop object to collect it (clicks vary per level)
//    if player collides with a single poop object
//        the stepped in poop becomes an obstable (but can be stepped in again)
//    if stepped in =2 the poop is destroyed and game gets 5 points
// player must move to trashCan safeZone
// player must click to dispose (one click)
// be careful you can full into the trashcan (gameover)

// Brain will run around and play in the area
// Brain is set on a 30 second timer
// Brian moves at a set set interal
// Brain randomly drops poop
// Brain is redirected when he collides with and obstacle

// to do
// resize canvasSize
// 2 clicks outside of obstacle when not in safeZone
// 2 clicks on poop collects the poop
// 1 click on trashCan collects the poop
// safeZone for click
// crash on poop collision
// extensions
// playBall
//
// for each object
// the width and height of the spritesheet
// specify row and column
// track right movement
// track left movement
// for the width num of sprites divided by the width of the spritesheet
// for the hieght height of sprites divided by the num of the rows
// first row will start at index 0
// each row only contains 8 images frameCount
// x and y coordinates for the sprites
// srcX coordinates to get the frame
// tracking movement left
// assuming the the start direction is right
// speed of movement

// create the player object
// set the source of the player objects


///////////CODE START/////////////
// bring in the canvas object
/////////////////////////////////
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var header = document.getElementById("header");
// var headerHeight = header.hasOwnProperty("scrollHeight");
// canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.width = 500;
// canvas.height = 500;

///////////GAMEBOARD//////////////
// set up the game board variables
// start a game timer
// create the gameboard object
var Gameboard = {
  name: "Pooper Scooper",
  src: "imageLink",
  gameStartTime: Date.now(),
  gameScoreWin: 10,
  gameScore: 0,
  playerArray: [],
  playerScore: [],
  playerHighScore: [],
  gameStopTime: null,
  gameTimer: 0,
  gameCounter: 0,
  frameCount: 0,
  level: 1,
  speed: 1
}

// load game board images
var Img = {};
Img.dog = new Image();
Img.dog.src = "./images/Dog1.png";
Img.boy = new Image();
Img.boy.src = "./images/Boyrun.png";
Img.poop = new Image();
Img.poop.src = "./images/emeny.png";

// Img.dogHouse = new Image();
// Img.dogHouse.src = "./images/Dog.png";
Img.tree = new Image();
Img.tree.src = "./images/Apple_Tree1.png";
Img.tree2 = new Image();
Img.tree2.src = "./images/Cherry_Tree.png";
Img.rock = new Image();
Img.rock.src = "./images/Rock.png";
// Img.trashCan = new Image();
// Img.trashCan.src = "./images/Dog.png";

Img.upgrade1 = new Image();
Img.upgrade1.src = "./images/Pumpkin1.png";
Img.upgrade2 = new Image();
Img.upgrade2.src = "./images/Apple.png";
Img.upgrade3 = new Image();
Img.upgrade3.src = "./images/Grass1.png";

// Img.house = new Image();
// Img.house.src = "./images.Dog.png";
// Img.park = new Image();
// Img.park.src = "./images/Park.png";

///////////GAMEBOARD PIECES//////////////
///////////Entity//////////////
var Entity = function(type,id,x,y,speedX,speedY,width,height,img){
  // And the computer said...create this
  var self = {
    type:type,
    id:id,
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height,
    img:img
  };
  self.update = function(){
    self.updatePosition();
    self.draw();
  }
  self.draw = function(){
    ctx.save();
    var x = self.x - self.width / 2;
    var y = self.y - self.height / 2;
    ctx.drawImage(self.img,x,y);

    // ctx.drawImage(image,
    //   cropStartX, cropStartY, cropWidth, cropHeight,
    //   drawX,drawY,drawWidth,drawHeight);

    ctx.restore();
  }
  self.getDistance = function(entity2){
    var vx = self.x - entity2.x;
    var vy = self.y - entity2.y;
    return Math.sqrt(vx * vx + vy * vy);
  }
  self.testCollision = function(entity2){
    var rect1 = {
      x: self.x - self.width / 2,
      y: self.y - self.height / 2,
      width: self.width,
      height: self.height
    }
    var rect2 = {
      x: entity2.x - entity2.width / 2,
      y: entity2.y - entity2.heigth / 2,
      width: entity2.width,
      height: entity2.height
    }
    return testCollisionRect(rect1,rect2);
  }
  if (self.testCollision){
    console.log(self.type + " hit something");
  }
  self.updatePosition = function(){
    self.x += self.speedX;
    self.y += self.speedY;
    // if greater than screen size change direction
    if (self.x < 0 || self.x > canvas.width){
      self.speedX = - self.speedX;
    }
    if (self.y < 0 || self.y > canvas.height){
      self.speedY = - self.speedY;
    }
  }
// return the Entity
// representing an object
// in the game
  return self;
}

///////////Actor//////////////
var Actor = function(type,id,x,y,speedX,speedY,width,height,hp,stkSp,img){
  // Make myself
  var self = Entity(type,id,x,y,speedX,speedY,width,height,img);
  // Set common attributes for the actors
  self.hp = hp;
  self.stkSp = stkSp;
  self.stkCounter = 0;
  self.aimAngle = 0;

  var super_update = self.update;
  self.update = function(){
    super_update();
    self.stkCounter += self.stkSp;
  }
  self.performAttack = function(){
    if (self.stkCounter > 50){
      generatePoop(self);
      self.stkCounter = 0;
    }
  }
  self.performSpecialAttack = function(){
    if (self.stkCounter > 150){
      generatePoop(self,self.aimAngle - 5);
      generatePoop(self,self.aimAngle);
      generatePoop(self,self.aimAngle + 5);
      self.stkCounter = 0;
    }
  }
// return the Actor
// which further describe
// the entities in the game
  return self;
}

///////////Enemy//////////////
// create the doggy list object
var doggyList = {};
// create the doggy object
var Dog = function(id,x,y,speedX,speedY,width,height){
  var self = Actor("dog",id,x,y,speedX,speedY,width,height,10,1,Img.dog);

  // var super_update = self.update;
  // self.update = function(){
  //   super_update();
  //   self.performAttack(self);
  // }
  // check to see if the dog collides with object

  // FIX THIS
  // var isColliding = player.testCollision(self);
  // if (isColliding){
  //   console.log("OUCH...!! dog hit player");
  //   player.hp = player.hp - 1;
  // }
  // for (var key in obstacleList){
  //   var isColliding = self.testCollision(obstacleList[key]);
  //       if (isColliding){
  //         console.log("dog collides with obstacle");
  //         // console.log("redirect dog");
  //       }
  // }

  doggyList[id] = self;
}
// set up and place dog object
var randomlyGenerateDog = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var width = 30;
  var height = 30;
  var speedX = 3 + Math.random() * 5;
  var speedY = 3 + Math.random() * 5;

  Dog(id,x,y,speedX,speedY,width,height)
}

///////////Player//////////////
var player;
// create the player list
var playerList = {};
// player object
var Player = function(){
  var id = Math.random();
  var self = Actor("player",id,50,40,30,5,20,20,10,1,Img.boy);
  self.updatePosition = function(){
    if (self.pressingRight){
      self.x += 10;
    }
    if (self.pressingLeft){
      self.x -= 10;
    }
    if (self.pressingUp){
      self.y -= 10;
    }
    if (self.pressingDown){
      self.y += 10;
    }
    // reposition the mouse
    // in relation to player
    if (self.x < self.width / 2){
      self.x = self.width / 2;
    }
    if (self.x > canvas.width - self.width / 2){
      self.x = canvas.width - self.width / 2;
    }
    if (self.y < self.height / 2){
      self.y = self.height / 2;
    }
    if (self.y > canvas.height - self.height / 2){
      self.y = canvas.height - self.height / 2;
    }
  }
  // super update overriding default functionality
  var super_update = self.update;
  self.update = function(){
    super_update();
    if (self.hp <= 0){
      var timeSurvied = Date.now() - Gameboard.gameStartTime;
      Gameboard.gameStopTime = timeSurvied;
      console.log("you lost @ " +timeSurvied+ " ms.");
      // player.performSpecialAttack();
      startNewGame();
    }
  }
  var super_collision = self.testCollision;
  self.testCollision = function(entity2){
    super_collision();
    console.log(entity2.type);
    if (entity2.type === "dog"){
      console.log("Player hit dog");
      player.hp -= 5;
      player.stkSp -= 1;
    }
  }
  self.pressingDown = false;
  self.pressingUp = false;
  self.pressingLeft = false;
  self.pressingRight = false;

// return the Player object
  playerList[id] = self;
  return self;

}

///////////Upgrades//////////////
// create the upgrades list
// this is a extra feature
var upgradesList = {};
// create upgrade object
var Upgrade = function(id,x,y,speedX,speedY,width,height,category,img){
  var self =  Actor("upgrade",id,x,y,speedX,speedY,width,height,10,1,img);
  self.toRemove = false;
  var super_update = self.update;
  self.update = function(){
    super_update();
    // self.timer++;
    if (self.stkCounter > 100){
      self.toRemove = true;
    }
    if (self.toRemove){
      delete upgradesList[self.id];
    }
  }
  // FIX THIS
  // var isColliding = player.testCollision(self);
  // if (isColliding){
  //   toRemove = true;
  //   if (self.category === "score"){
  //     console.log("YEAH score bonus");
  //     player.score += 1000;
  //   }
  //   if (self.category === "health"){
  //     console.log("YEAH health bonus");
  //     player.hp += 10;
  //   }
  //   if (self.category === "speed"){
  //     console.log("YEAH speed bonus");
  //     player.stkSp += 3;
  //   }
  // }
  // FIX THIS
  var super_collision = self.testCollision;
  self.testCollision = function(entity2){
    super_collision();
    console.log(entity2.type);
      if (entity2.type === "player"){
        self.toRemove = true;
        if (entity2.category === "score"){
          console.log("YEAH score bonus");
          player.score += 1000;
        }
        if (entity2.category === "health"){
          console.log("YEAH health bonus");
          player.hp += 10;
        }
        if (entity2.category === "speed"){
          console.log("YEAH speed bonus");
          player.stkSp += 3;
        }
      }
  }
  self.category = category;
  // self.timer++;
  // add the item to the list
  upgradesList[id] = self;
};

// setup and place upgrades on the board
var randomlyGenerateUpgrade = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var speedX = 0;
  var speedY = 0;
  var width = 10;
  var height = 10;
  var category;
  var img;

  var random = Math.random();
  if (random < 0.5){
    var category = "score";
    var img = Img.upgrade1;
  }
  // else if (random < 0.5) {
  //   var category = "speed";
  //   var img = Img.upgrade2;
  // }
  else {
    var category = "health";
    var img = Img.upgrade3;
  }
  // make a new upgrade
  Upgrade(id,x,y,speedX,speedY,width,height,category,img);
};

///////////Obstacle//////////////
// create the obstacle list
var obstacleList = {};
// create the obstacle object
var Obstacle = function(){
  // create tree
  // Entity = function(type,id,x,y,speedX,speedY,width,height,img)
  var tree = Entity("tree","myId",(Math.random() * canvas.width),
  (Math.random() * canvas.height),0,0,15,15,Img.tree);
  // var tree = Entity("trashCan",id,x,y,speedX,speedY,width,height,img);
  // var dogHouse = Entity("dogHouse",id,x,y,speedX,speedY,width,height,img);
  // var trashCan = Entity("trashCan",id,x,y,speedX,speedY,width,height,img);
  // var rock = Entity("rock",id,x,y,speedX,speedY,width,height,img);

  // {
  //   id: Math.random(),
  //   x: Math.random() * canvas.width,
  //   y: Math.random() * canvas.height,
  //   speedX: 0,
  //   speedY: 0,
  //   width: 15,
  //   height: 15,
  //   color: "black",
  //   src: "imageLink",
  //   level: Gameboard.level
  // }
  // // create dog house
  // var dogHouse = {
  //   id: Math.random(),
  //   x: Math.random() * canvas.width,
  //   y: Math.random() * canvas.height,
  //   speedX: 0,
  //   speedY: 0,
  //   width: 15,
  //   height: 15,
  //   color: "gray",
  //   src: "imageLink",
  //   level: Gameboard.level
  // }
  // // create trash can
  // var trashCan = {
  //   id: Math.random(),
  //   x: Math.random() * canvas.width,
  //   y: Math.random() * canvas.height,
  //   speedX: 0,
  //   speedY: 0,
  //   width: 15,
  //   height: 15,
  //   color: "pink",
  //   src: "imageLink",
  //   level: Gameboard.level,
  //   capacity: 10
  // }
  //
  // // check to see if the player collects upgrade
  // var isColliding = testCollisionEntity(obstacleList[key],Player);
  //     if (isColliding){
  //       console.log("player collides with obstacle");
  //       // console.log("score subtraction");
  //       // console.log("player drops any held objects");
  //     }

  // add to obstacleList
  obstacleList[tree.id] = tree;
  // obstacleList[trashCan.id] = trashCan;
  // obstacleList[dogHouse.id] = dogHouse;
};

///////////Poop//////////////
// create poopy list
var poopyList = {};
// create poop object
var Poopy = function(id,x,y,speedX,speedY,width,height,scoops){
  var self = Actor("poop",id,x,y,speedX,speedY,width,height,2,0,Img.poop);
  // Actor = function(type,id,x,y,speedX,speedY,width,height,hp,stkSp,img)
  var super_update = self.update;
  self.update = function(){
    super_update();
    var toRemove = false;
    // if (self.timer > 75){
    //   toRemove = true;
    // }
    // if (player.poopCollected){
    //   toRemove = true;
    //   console.log("player has poop");
    //   // do some other stuff
    //   // remove but do not delete
    //   // if player drops place back on board
    //   // doc player set safety time out
    // }
    // test for collision with player
    // doc points for steppig in it
    var isColliding = self.testCollision(player);
        if (isColliding){
          console.log("player stepped in me");
          toRemove = true;
          // console.log("score subtraction");
          // console.log("player speed subtraction");
          // increase dog speed
        }
    // check to see if the dog collides with object
    for (var key2 in doggyList){
      var isColliding = self.testCollision(doggyList[key2]);
          if (self.isColliding){
            console.log("dog collides with poop");
            // console.log("redirect dog");
          }
    }
    if (toRemove){
      delete poopyList[self.id];
    }
  }
  self.timer = 0;
  poopyList[id] = self;
}

// randomly generate poop
var generatePoop = function(actor,overrideAngle){
  var id = Math.random();
  var x = actor.x;
  var y = actor.y;
  var width = 5;
  var height = 5;
  var scoops = Gameboard.level;
  var angle;
  if (overrideAngle !== undefined){
    angle = overrideAngle;
  } else {
    angle = actor.aimAngle;
  }
  var speedX = 0;
  var speedY = 0;
  Poopy(id,x,y,speedX,speedY,width,height,scoops);
}
///////////GAMEPLAY//////////////
// test for collision rectangle
var testCollisionRect = function(rect1, rect2){
  return rect1.x <= rect2.x + rect2.width
    && rect2.x <= rect1.x + rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height
};

var safeZone = function(){};
///////////UPDATE ANIMATION//////////////
var updateGame = function(){
  // clear the board
  ctx.clearRect(0,0,canvas.width,canvas.height);
  Gameboard.frameCount++;
  // create new upgrade every 8 seconds
  if (Gameboard.frameCount % 200 === 0) {
    randomlyGenerateUpgrade();
  }
  // create poop every 3 seconds
  if (Gameboard.frameCount % 75 === 0){
    for (dog in doggyList){
      doggyList[dog].performAttack();
    }
  }
  // for the player
  Gameboard.score++;
  player.update();
  ctx.fillText(player.hp + " HP", 0, 30);
  ctx.fillText("Score: " + Gameboard.score, 200, 30);

  // for the poops
  for (var key in poopyList){
    poopyList[key].update();
  }
  // for the dog
  // for (var key in doggyList){
  //   doggyList[key].update();
  // }
  // for obstacleList
  for (var key in obstacleList){
    obstacleList[key].update();
  }
  // for upgradesList
  for (var key in upgradesList){
    upgradesList[key].update();
  }
};

///////////NEW GAME//////////////
// clear the game
var startNewGame = function(){
  player.hp = 10;
  Gameboard.gameStartTime = Date.now();
  Gameboard.frameCount = 0;
  Gameboard.score = 0;
  upgradesList = {};
  poopyList = {};
  playerList = {};
  obstacleList = {};
  doggyList = {};

  randomlyGenerateUpgrade();
  randomlyGenerateDog();
  Obstacle();
};

// start the game
player = Player();
Gameboard.playerArray.push(player);
startNewGame();

// set temp animation
setInterval(updateGame, 40);
///////////GAME EVENT FUNCTIONS//////////////
// on mouse over
document.onmouseover = function(mouse){
  var mouseX = mouse.clientX - 8;
  var mouseY = mouse.clientY - 8;

  ////////////  this isn't working for me  ///////////////
  // var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
  // var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;

  // adjust to relative to the position of the player
  mouseX -= player.x;
  mouseY -= player.y;
  player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
};
// on game click events
document.onclick = function(event){
  // for (dog in doggyList){
  //   // performAttack(dog);
  // }
  // generatePoop(dog);
  console.log("fix attack");
  console.log("mouse click");
};
// on game click events
document.oncontextmenu = function(event){
  // performSpecialAttack(dog);
  event.preventDefault();
  console.log("mouse DOUBLE click");

};
// on key down event
document.onkeydown = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    player.pressingRight = true;
  } else if (event.keyCode === 83 || event.keyCode === 40){
    player.pressingDown = true;
  } else if (event.keyCode === 65 || event.keyCode === 37){
    player.pressingLeft = true;
  } else if (event.keyCode === 87 || event.keyCode === 38){
    player.pressingUp = true;
  }
};
// on key up event
document.onkeyup = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    player.pressingRight = false;
  } else if (event.keyCode === 83 || event.keyCode === 40){
    player.pressingDown = false;
  } else if (event.keyCode === 65 || event.keyCode === 37){
    player.pressingLeft = false;
  } else if (event.keyCode === 87 || event.keyCode === 38){
    player.pressingUp = false;
  }
};

///////////LETS GO//////////////
// document ready statement
$(document).ready(function(){
  // event listen for window click on window
  // canvas.addEventListener("click", function(event) {
  //     // drawRectangle(ctx, event.offsetX, event.offsetY);
  //     console.log("click called document ready");
  //   });

    // event listen for window size
    // window.addEventListener("resize", function(){
        // canvas.width = window.innerWidth;
        // canvas.height = window.innerHeight;
        // init();
        // update();
    // });

  // the "href" attribute of the modal trigger
  // must specify the modal ID
  // that wants to be triggered
    $('.modal').modal();
});
