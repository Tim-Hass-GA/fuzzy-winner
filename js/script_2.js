console.log("script_2.js is here");

// Tim Hass // Feb 2018 // GA - Project 1
// Dedication: Brian Lifton Aug 2008 - May 2017

// Game Name: Pooper Scooper
// Your dog Brian likes to have a clean area to run, play, and jump in
// the objective of the game is to keep the area clean, so
// Brian can have a nice place to have fun

// the game begins with one poop on the board
// there are 3 levels to the current version of the game
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

///////////GAME EVENT FUNCTIONS//////////////
// on mouse over
document.onmouseover = function(mouse){};
// on game click events
document.onclick = function(mouse){};
// on key down event
document.onkeydown = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    Player.pressingRight = true;
  } else if (event.keyCode === 83 || event.keyCode === 40){
    Player.pressingDown = true;
  } else if (event.keyCode === 65 || event.keyCode === 37){
    Player.pressingLeft = true;
  } else if (event.keyCode === 87 || event.keyCode === 38){
    Player.pressingUp = true;
  }
};
// on key up event
document.onkeyup = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    Player.pressingRight = false;
  } else if (event.keyCode === 83 || event.keyCode === 40){
    Player.pressingDown = false;
  } else if (event.keyCode === 65 || event.keyCode === 37){
    Player.pressingLeft = false;
  } else if (event.keyCode === 87 || event.keyCode === 38){
    Player.pressingUp = false;
  }
};

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
Img.dog.src = "./images/Dog.png";
Img.boy = new Image();
Img.boy.src = "./images/Boyrun.png";

// Img.dogHouse = new Image();
// Img.dogHouse.src = "./images/Dog.png";
Img.tree1 = new Image();
Img.tree1.src = "./images/Apple_Tree/Dog.png";
Img.tree2 = new Image();
Img.tree2.src = "./images/Cherry_Tree.png";
Img.rock = new Image();
Img.rock.src = "./images/Rock.png";
// Img.trashCan = new Image();
// Img.trashCan.src = "./images/Dog.png";

Img.pumpkin = new Image();
Img.pumpkin.src = "./images/Pumpkin.png";
// Img.star = new Image();
// Img.star.src = "./images/Dog.png";
// Img.heart = new Image();
// Img.heart.src = "./images/Dog.png";

Img.house = new Image();
Img.house.src = "./images.Dog.png";
Img.park = new Image();
Img.park.src = "./images/Park.png";

///////////GAMEBOARD PIECES//////////////
var Entity = function(type,id,x,y,speedX,speedY,width,height,img){
  // And the computer said...create this
  var self = {
    type:type,
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

var Actor = function(type,id,x,y,speedX,speedY,width,height,stkSp,img){
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
    self.updatePostion();
    self.draw():
    self.stkCounter += self.stkSp;
  }
  self.performAttack = function(){
    if (self.stkCounter > 25){
      generatePoop(self);
      self.stkCouter = 0;
    }
  }
  self.performSpecialAttack = function(){
    if (self.stkCouter > 50){
      generatePoop(self,self.aimAngle - 5);
      generatePoop(self,self.aimAngle);
      generatePoop(self,self.aimAngle + 5);
      self.counter = 0;
    }
  }
// return the Actor
// which further describe
// the entities in the game
  return self;
}

// create the doggy list object
var doggyList = {};
// create the doggy object
var Dog = function(id,x,y,speedX,speedY,width,height){
  var self = Actor("dog","myId",)
  // Actor = function(type,id,x,y,speedX,speedY,width,height,stkSp,img)

  // dog object
  var dog = {
    id: Math.random(),
    name: "Brian",
    timer: 0,
    counter: 0,
    hp: 10,
    color: "red",
    action: {
      sit: function(){return this.speed},
      run: function(){return this.speed},
      bark: function(){return this.speed},
      redirect: function(){return this.speed},
      dropPoop: function(){return this.speed + this.poop}
      }
  }
  doggyList[id] = dog;
}
// set up and place dog object
var randomlyGenerateDog = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var width = 30;
  var height = 30;
  var speedX = 3 + Math.random() * 3;
  var speedY = 3 + Math.random() * 3;

  Dog(id,x,y,speedX,speedY,width,height)
}

// create the upgrades list
// this is a extra feature
var upgradesList = {};
// create upgrade object
// Actor = function(type,id,x,y,speedX,speedY,width,height,stkSp,img)

var Upgrade = function(id,x,y,speedX,speedY,width,height,category,color){
  var upgradeItem = {
    id:id,
    x:x,
    y:y,
    speedX:speedX,
    speedY:speedY,
    width:width,
    height:height,
    category:category,
    color:color,
    timer:0
  };
  // add the item to the list
  upgradesList[id] = upgradeItem;
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
  var color;

  if (Math.random() < 0.5){
    category = "score";
    color = "blue";
  } else {
    category = "speed";
    color = "rebeccapurple";
  }
  // make a new upgrade
  Upgrade(id,x,y,speedX,speedY,width,height,category,color);
};
// create additional enemies for the game
// this is extra
// crows

// create the player list
var playerList = {};
// player object
var Player = function(){
  var self = Actor("player","myId",50,40,30,5,20,20,1,Img.Boyrun)
  // Actor = function(type,id,x,y,speedX,speedY,width,height,stkSp,img)
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
  var super_update = self.update;
  self.update = function(){
    super_update();
    if (self.hp <= 0){
      var timeSurvied = Date.now() - Gameboard.gameStartTime;
      Gameboard.gameStopTime = timeSurvied;
      console.log("you lost @ " +timeSurvied+ " ms.");
      startNewGame();
    }
  }
  self.pressingDown = false;
  self.pressingUp = false;
  self.pressingLeft = false;
  self.pressingRight = false;
// return the Player object
  return self;
}

// create the obstacle list
var obstacleList = {};
// create the obstacle object
var Obstacle = function(){
  // create tree
  var tree = {
    id: Math.random(),
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: 0,
    speedY: 0,
    width: 15,
    height: 15,
    color: "black",
    src: "imageLink",
    level: Gameboard.level,
    action: {
      blockMove: function(){return this.level},
      dropPoop: function(){return this.level}
    }
  }
  // create dog house
  var dogHouse = {
    id: Math.random(),
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: 0,
    speedY: 0,
    width: 15,
    height: 15,
    color: "gray",
    src: "imageLink",
    level: Gameboard.level,
    action: {
      blockMove: function(){return this.level},
      dropPoop: function(){return this.level}
    }
  }
  // create trash can
  var trashCan = {
    id: Math.random(),
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speedX: 0,
    speedY: 0,
    width: 15,
    height: 15,
    color: "pink",
    src: "imageLink",
    level: Gameboard.level,
    capacity: 10,
    action: {
      checkFull: function(){return this.capacity, this.level},
      emptyCan: function(){return this.capacity}
    }
  }

  // add to obstacleList
  obstacleList[tree.id] = tree;
  obstacleList[trashCan.id] = trashCan;
  obstacleList[dogHouse.id] = dogHouse;
};

// create poopy list
var poopyList = {};
// create poop object
var Poopy = function(id,x,y,width,height,scoops){
  // Actor = function(type,id,x,y,speedX,speedY,width,height,stkSp,img)

  var poop = {
    id: id,
    x: x,
    y: y,
    width: width,
    height: height,
    scoops: scoops,
    src: "imageLink",
    color: "yellow",
    timer:0
  }
  poopyList[id] = poop;
}

// randomly generate poop
var randomlyGeneratePoop = function(){
  for (var key in doggyList){
    var id = Math.random();
    var x = doggyList[key].x;
    var y = doggyList[key].y;
    var width = 5;
    var height = 5;
    var scoops = Gameboard.level;
  }
  Poopy(id,x,y,width,height,scoops);
}
///////////GAMEPLAY//////////////

// get the distance between entities
var distanceBetweenEntity = function(entity1,entity2){
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

// test for collision
var testCollisionEntity = function(entity1, entity2){
  var rect1 = {
    x: entity1.x - entity1.width / 2,
    y: entity1.y - entity1.height / 2,
    width: entity1.width,
    height: entity1.height
  }
  var rect2 = {
    x: entity2.x - entity2.width / 2,
    y: entity2.y - entity2.height / 2,
    width: entity2.width,
    height: entity2.height
  }
  return testCollisionRect(rect1,rect2);
};

// test for collision rectangle
var testCollisionRect = function(rect1, rect2){
  return rect1.x <= rect2.x + rect2.width
    && rect2.x <= rect1.x + rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height
};

var safeZone = function(){};
///////////UPDATE ANIMATION//////////////
// this will update the game for the game loop
// draw the animations
var drawEntity = function(entityToDraw){
  ctx.save();
  ctx.fillStyle = entityToDraw.color;
  ctx.fillRect(entityToDraw.x - entityToDraw.width / 2,
      entityToDraw.y - entityToDraw.height / 2,
      entityToDraw.width, entityToDraw.height);
  ctx.restore();
};
// update the animations
var updateEntity = function(entityToUpdate){
  updateEntityPosition(entityToUpdate);
  drawEntity(entityToUpdate);
};
// update the position of the entity
var updateEntityPosition = function(entityPos){
  entityPos.x += entityPos.speedX;
  entityPos.y += entityPos.speedY;
  // if greater than screen size change direction
  if (entityPos.x < 0 || entityPos.x > canvas.width){
    entityPos.speedX = -entityPos.speedX;
  }
  if (entityPos.y < 0 || entityPos.y > canvas.height){
    entityPos.speedY = -entityPos.speedY;
  }
};

// update player
// var updatePlayer = function(){
//   playerX.x += playerX.speedX;
//   playerX.y += playerX.speedY;
//   ctx.fill
// };

// update player position
var updatePlayerPosition = function(){
  if (Player.pressingRight){
    Player.x += 10;
  }
  if (Player.pressingLeft){
    Player.x -= 10;
  }
  if (Player.pressingDown){
    Player.y += 10;
  }
  if (Player.pressingUp){
    Player.y -= 10;
  }
  // reposition
  if (Player.x < Player.width / 2){
    Player.x = Player.width / 2;
  }
  if (Player.x > canvas.width - Player.width / 2){
    Player.x = canvas.width - Player.width / 2;
  }
  if (Player.y < Player.height / 2){
    Player.y = Player.height / 2;
  }
  if (Player.y > canvas.height - Player.height / 2){
    Player.y = canvas.height - Player.height / 2;
  }
};


// EXAMPLE //
// var updateObstacle = function(){};
// var updatePlayerPosition = function(){};

///////////GAME ANIMATION//////////////

var updateGame = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  Gameboard.frameCount++;
  Gameboard.score++;

  // create new upgrade every 4 seconds
  if (Gameboard.frameCount % 100 === 0) {
    randomlyGenerateUpgrade();
  }

  // create poop every 3 seconds
  if (Gameboard.frameCount % 75 === 0){
    randomlyGeneratePoop();
  }

  // for the player
  updatePlayerPosition();
  drawEntity(Player);

  // for the poops
  for (var key in poopyList){
    drawEntity(poopyList[key]);
    // check to see if the player collects upgrade
    var isColliding = testCollisionEntity(poopyList[key],Player);
        if (isColliding){
          console.log("player stepped in it");
          // console.log("score subtraction");
          // console.log("player speed subtraction");
          // increase dog score
        }
    // check to see if the dog collides with object
    for (var key2 in doggyList){
      var isColliding = testCollisionEntity(poopyList[key],doggyList[key2]);
          if (isColliding){
            console.log("dog collides with poop");
            // console.log("redirect dog");
          }
    }
  }

  // for the dog
  for (var key in doggyList){
    updateEntity(doggyList[key]);
    // check to see if the player collects upgrade
    var isColliding = testCollisionEntity(doggyList[key],Player);
        if (isColliding){
          console.log("dog collides with player");
          // console.log("score subtraction");
          // console.log("player speed subtraction");
        }
    // check to see if the dog collides with object
    for (var key2 in obstacleList){
      var isColliding = testCollisionEntity(doggyList[key],obstacleList[key2]);
          if (isColliding){
            console.log("dog collides with obstacle");
            // console.log("redirect dog");
          }
    }
  }

  // for obstacleList
  for (var key in obstacleList){
    updateEntity(obstacleList[key]);
    // check to see if the player collects upgrade
    var isColliding = testCollisionEntity(obstacleList[key],Player);
        if (isColliding){
          console.log("player collides with obstacle");
          // console.log("score subtraction");
          // console.log("player drops any held objects");
        }
  }

  // for upgradesList
  for (var key in upgradesList){
    updateEntity(upgradesList[key]);
    // set a timer on the upgrade
    upgradesList[key].timer++;
    // remove the upgrade after so many frames
    if (upgradesList[key].timer > 100){
      delete upgradesList[key];
      continue;
    }
    // check to see if the player collects upgrade
    var isColliding = testCollisionEntity(upgradesList[key],Player);
        if (isColliding){
          console.log("you collected the upgrade");
          if (upgradesList[key].category === "score"){
            console.log("score bonus");
          }
          if (upgradesList[key].category === "speed"){
            console.log("upgrade speed")
          }
          delete upgradesList[key];
          break;
        }
    }



};





///////////NEW GAME//////////////

// clear the game
var startNewGame = function(){
  // player.hp = 10;
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
startNewGame();

// set temp animation
setInterval(updateGame, 40);

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
