console.log("final is here adjust 3");

// Tim Hass // Feb 2018 // GA - Project 1
// Dedication: Brian Lifton Aug 2008 - May 2017

// Game Name: Pooper Scooper
// Your dog Brian likes to have a clean area to run, play, and jump in
// the objective of the game is to keep the area clean, so you and
// Brian can have a nice place to have fun in


/////////// CODE START /////////////
/////////////////////////////////
// canvas object
var canvas = document.getElementById("canvas");
var ctx =  canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/////////// GAMEBOARD //////////////
// set up the game board variables
// start a game timer
// create the gameboard objectvar
Gameboard = {
  name: "Pooper Scooper",
  src: "imageLink",
  gameStartTime: Date.now(),
  gamePause: false,
  gameWinScore: 1000,
  gameStopTime: null,
  gameCounter: 0,
  frameCount: 0,
  level: 1,
  speed: 1
}

/////////// GAMEBOARD PIECES //////////////
// load game board images
var Img = {};
Img.dog = new Image();
Img.dog.src = "./images/Dog.png";
// Img.dog.width;
// Img.dog.heigth;
Img.boy = new Image();
Img.boy.src = "./images/Sprite.png";
Img.poop = new Image();
// Img.poop.src = "./images/Poops_Sheet.png";
Img.poop.src = "./images/Poopie1.png";

// Img.dogHouse = new Image();
// Img.dogHouse.src = "./images/Dog.png";
Img.tree = new Image();
Img.tree.src = "./images/Tree1.png";
Img.tree2 = new Image();
Img.tree2.src = "./images/Tree2.png";
Img.rock = new Image();
Img.rock.src = "./images/Rock1.png";
Img.trashCan = new Image();
Img.trashCan.src = "./images/Trash_Can.png";

Img.upgrade1 = new Image();
Img.upgrade1.src = "./images/Pumpkin1.png";
Img.upgrade2 = new Image();
Img.upgrade2.src = "./images/Grass1.png";
Img.upgrade3 = new Image();
Img.upgrade3.src = "./images/Apple.png";

///////// UTILITIES /////////
var testCollisionRectRect = function(rect1, rect2){
  // return distance
  return rect1.x <= rect2.x + rect2.width
    && rect2.x <= rect1.x + rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height;
}


///////// ENTITY ///////
var Entity = function(type,id,x,y,speedX,speedY,width,height,img){
  var self = {
    type:type,
    x:x,
    y:y,
    speedX:speedX,
    speedY:speedY,
    width:width,
    height:height,
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
    ctx.drawImage(self.img,0,0,self.img.width,self.img.height,x,y,self.width,self.height);
    ctx.restore();
  }
  self.getDistance = function(entity2){
    var vx = self.x - entity2.x;
    var vy = self.y - entity2.y;
    return Math.sqrt(vx * vx + vy * vy);
  }
  self.testCollision = function(entity2){
    // return distance
    var rect1 = {
      x:self.x-self.width/2,
      y:self.y-self.height/2,
      width:self.width,
      height:self.height
    }
    var rect2 = {
      x:entity2.x-entity2.width/2,
      y:entity2.y-entity2.height/2,
      width:entity2.width,
      height:entity2.height
    }
    return testCollisionRectRect(rect1,rect2);
  }
  self.updatePosition = function(){
    // update self
    self.x += self.speedX;
    self.y += self.speedY;
    // if greater than screen size change direction
    if (self.x < 0 || self.x > canvas.width){
      self.speedX = -self.speedX;
    }
    if (self.y > canvas.height || self.y < 0){
      self.speedY = -self.speedY;
    }
  }
// return
  return self;
}
///////// ENTITY ///////

///////// ACTOR ///////
Actor = function(type,id,x,y,speedX,speedY,width,height,hp,stkSp,img){
  var self = Entity(type,id,x,y,speedX,speedY,width,height,img);
  self.hp = hp;
  self.stkSp = stkSp;
  self.stkCounter = 0;
  self.spriteAnimeCounter = 0;
  self.aimAngle = 0;

  // SUPER UPDATE //
  var super_update = self.update;
  self.update = function(){
      super_update();
      self.stkCounter += self.stkSp;
      if (player.hp <= 0 || player.score > 100){
        self.onDeath();
      }
    }
    // STANDARD
    self.preformAttack = function(){
      if (self.stkCounter > 50){
        if (Math.random() < 0.5){
          generatePoop(self);
        } else {
          generatePoop(self,self.aimAngle - 5);
          generatePoop(self,self.aimAngle);
          generatePoop(self,self.aimAngle + 5);
          self.stkCounter = 0;
        }

        self.stkCounter = 0;
      }
// make this more flexible
    }
    // SPECIAL
    self.preformSpecialAttack = function(){
      // if (self.stkCounter > 150){
        // different scenarios
        if (Math.random() < 0.5){
          for (var angle = 0; angle < 360; angle++){
            generatePoop(actor,angle);
          }
        } else {
          generatePoop(self,self.aimAngle - 5);
          generatePoop(self,self.aimAngle);
          generatePoop(self,self.aimAngle + 5);
          self.stkCounter = 0;
        }
      // }
/// LOOK AT
    }
    // to be used within specific entity determines
    // what happens to entity at end of life
    self.onDeath = function(){}
    self.draw = function(){
      ctx.save();
      var x = self.x - self.width / 2;
      var y = self.y - self.height / 2;
//       // for spriteSheet
      var frameWidth = self.img.width / self.spriteFrameCols;
      var frameHeight = self.img.height / self.spriteSheetRows;
//       // use the mouse to determine direction of player
      var aimAngle = self.aimAngle;
      if (aimAngle < 0){
        aimAngle = 360 + aimAngle;
      }
      var directionMod = self.right;
      if (aimAngle >= 45 && aimAngle < 135){
        directionMod = self.down;
      } else if (aimAngle >= 135 && aimAngle < 225){
        directionMod = self.left;
      } else if (aimAngle >= 255 && aimAngle < 315){
        directionMod = self.up;
      }
      var walkingMod = Math.floor(self.spriteAnimeCounter) % 4;
      ctx.drawImage(self.img,
        walkingMod*frameWidth,directionMod*frameHeight,
        frameWidth,frameHeight,x,y,self.width,self.height);
      ctx.restore();
// // issues with moble here
    }
//return
    return self;
}
///////// ACTOR END ///////

/////////// PLAYER //////////////
var player;
// // create the player list
var playerList = {};
// // player object
var Player = function(){
  var x = canvas.width / 2;
  var y = 0;
  var self = Actor("player","id",x,y,30,5,60,80,5,1,Img.boy);
  self.pressingDown = false;
  self.pressingUp = false;
  self.pressingRight = false;
  self.pressingLeft = false;
  self.poopsCollected = 0;
  self.poopBagArray = [];
  self.score = 0;
  self.spriteFrameCols = 4;
  self.spriteSheetRows = 8;
  self.right = 3;
  self.left = 2;
  self.down = 1;
  self.up = 4;
// SUPER UPDATE //
  var super_update = self.update;
  self.update = function(){
    super_update();
    if (self.pressingRight || self.pressingLeft || self.pressingUp || self.pressingDown){
      self.spriteAnimeCounter += .2;
    }
  }
  self.updatePosition = function(){
    // override test
      if (self.pressingRight){
        self.x += 10;
      }
      if (self.pressingLeft){
        self.x -= 10;
      }
      if (self.pressingDown){
        self.y += 10;
      }
      if (self.pressingUp){
        self.y -= 10;
      }
    // repostion mouse with player
    if (self.x < self.width / 2){
        self.x = self.width / 2;
      }
      if(self.x > canvas.width - self.width / 2){
        self.x = canvas.width - self.width / 2;
      }
      if(self.y < self.height / 2){
        self.y = self.height / 2;
      }
      if(self.y > canvas.height - self.height / 2){
        self.y = canvas.height - self.height / 2;
      }
  }
  self.onDeath = function(){
    ////<<<< GAME OVER >>>>/////
    ////////////////////////////
    var timeSurvived = Date.now() - Gameboard.gameStartTime;
    console.log("Your time is " + timeSurvived + " ms.");
    startNewGame();
  }
// return self
    return self;
}
/////////// PLAYER END //////////////

/////////// DOG //////////////
// create the doggy list object
var doggyList = {};
// create the doggy object
var Dog = function(id,x,y,speedX,speedY,width,height){
  var self = Actor("dog",id,x,y,speedX,speedY,width,height,100,1,Img.dog);
  self.spriteFrameCols = 4;
  self.spriteSheetRows = 9;
  self.spriteAnimeCounter += .2;
  self.right = 2;
  self.left = 4;
  self.down = 1;
  self.up = 3;
  // SUPER UPDATE //
  var super_update = self.update;
  self.update = function(){
    super_update();
    var isColliding = self.testCollision(player);
      if (isColliding) {
        player.hp -= 1;
      }
  }
  doggyList[id] = self;
}
// set up and placement for dog object
var randomlyGenerateDog = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var width = 50;
  var height = 50;
  var speedX = 1 + Math.random() * 3;
  var speedY = 1 + Math.random() * 3;
  Dog(id,x,y,speedX,speedY,width,height);
}
/////////// DOG END //////////////

/////////// UPGRADES //////////////
// list of upgrades
var upgradeList = {};
var Upgrade = function(category,id,x,y,speedX,speedY,width,height,img){
  var self = Entity(category,id,x,y,speedX,speedY,width,height,img);
  self.category = category;
  self.toBeRemoved = false;
  self.spriteFrameCols = 1;
  self.spriteSheetRows = 1;
  self.spriteAnimeCounter += .2;
  self.right = 1;
  self.left = 1;
  self.down = 1;
  self.up = 1;
  self.onDeath = function(){
    // set logic
      self.toBeRemoved = true;
  }
  upgradeList[id] = self;
}

randomlyGenerateUpgrade = function(){
  var x = Math.random() * canvas.width;
  var speedX = 0;
  var y = Math.random() * canvas.height;
  var speedY = 0;
  var id = Math.random();
  var width = 20;
  var height = 20;
  var category;
  var color;
  var random = Math.random();
    if (random < 0.3){
      var category = "score";
      var img = Img.upgrade1;
    } else if (random < 0.7) {
      var category = "speed";
      var img = Img.upgrade2;
    } else {
      var category = "health";
      var img = Img.upgrade3;
    }
  Upgrade(category,id,x,y,speedX,speedY,width,height,img);
}
/////////// UPGRADES END //////////////

/////////// POOPIE //////////////
// create poopy list
var poopieList = {};
// create poop object
var Poopy = function(id,x,y,speedX,speedY,width,height,combatType){
  var self = Actor("poopie",id,x,y,speedX,speedY,width,height,10,1,Img.poop);
  self.okayToRemove = false;
  self.toBeRemoved = false;
  self.timer = 0;
  self.spriteFrameCols = 1;
  self.spriteSheetRows = 1;
  self.spriteAnimeCounter += .2;
  self.right = 1;
  self.left = 1;
  self.down = 1;
  self.up = 1;
  // this extra var is for extending enemy types
  // this is a game upgrade example
  self.combatType = combatType;
  self.onDeath = function(){
  // set logic
    self.okayToRemoved = true;
    self.toBeRemoved = true;
  }
// FIX THIS
  var super_update = self.update;
  self.update = function(){
    super_update();
    self.timer++;
    if (self.timer > 75){
      self.okayToRemove = true;
    }
    var isColliding = self.testCollision(player);
      if (isColliding) {
        // player can only carry 5 objects
        if (player.poopArray.length < 5){
          // push the object to the player array
          player.poopArray.push(self);
          self.onDeath();
        }
      }
  }
  self.draw = function(){
    ctx.save();
    var x = self.x - self.width / 2;
    var y = self.y - self.height / 2;
    ctx.drawImage(self.img,0,0,self.img.width,self.img.height,x,y,self.width,self.height);
    ctx.restore();
  }
  poopieList[id] = self;
}

// randomly generate poop
var generatePoop = function(actor,overrideAngle){
  var id = Math.random();
  var x = actor.x;
  var y = actor.y;
  var width = 15;
  var height = 15;
  var angle;
  if (overrideAngle !== undefined){
    angle = overrideAngle;
  } else {
    angle = actor.aimAngle;
  }
  var speedX = 1;
  var speedY = 1;
// FIX THIS
// var speedX = Math.cos(angle/100*Math.PI)*5;
// var speedY = Math.sin(angle/100*Math.PI)*5;
  Poopy(id,x,y,speedX,speedY,width,height,actor.type);
}
/////////// POOPIE END //////////////

/////////// UPGRADES //////////////
// list of upgrades
var obstacleList = {};
var Obstacle = function(category,id,x,y,speedX,speedY,width,height,img){
  var self = Entity(category,id,x,y,speedX,speedY,width,height,img);
  // SUPER UPDATE //
  var super_update = self.update;
  self.update = function(){
    super_update();
    var isColliding = self.testCollision(player);
      if (isColliding) {
        player.score -= 1;
        player.stkSp -= 1;
      }
  }
  obstacleList[id] = self;
}

randomlyGenerateObstacle = function(){
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var id = Math.random();
  var width = 30 + Math.random() * 60;
  var height = 30 + Math.random() * 80;
  var speedX = 0;
  var speedY = 0;
  var img;
  var random = Math.random();
  if (random < 0.3){
    var category = "tree";
    var img = Img.tree;
  } else if (random < 0.7) {
    var category = "tree2";
    var img = Img.tree2;
  } else {
    var category = "rock";
    var img = Img.rock;
  }
  Obstacle(category,id,x,y,speedX,speedY,width,height,img);
}
/////////// UPGRADES END //////////////


/////////// TRASHCAN //////////////
// list of trash cans
var trashCanList = {};
var TrashCan = function(category,id,x,y,speedX,speedY,width,height,img){
  var self = Entity(category,id,x,y,speedX,speedY,width,height,img);
  self.trashCanCapacity = 2;
  self.trashCanArray = [];
  // SUPER UPDATE //
  var super_update = self.update;
  self.update = function(){
    super_update();
    var isColliding = self.testCollision(player);
      if (isColliding) {
        player.poopArray = [];
      }
  }
  trashCanList[id] = self;
}

randomlyGenerateTrashCan = function(){
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var id = Math.random();
  var width = 20;
  var height = 20;
  var speedX = 0;
  var speedY = 0;
  var img = Img.trashCan;
  var category = "trashCan";

  // extend functionality
  // decide on 1 or 2 trash cans
  var random = Math.random();
  if (random < 0.5){
    TrashCan(category,id,x,y,speedX,speedY,width,height,img);
  } else {
    TrashCan(category,id,x,y,speedX,speedY,width,height,img);
    TrashCan(category,id,x,y,speedX,speedY,width,height,img);
  }
  // TrashCan(category,id,x,y,speedX,speedY,width,height,img);
}

/////////// TRASHCAN END //////////////


///////////GAME EVENT FUNCTIONS//////////////
document.onmousemove = function(mouse){
  var mouseX = mouse.clientX - 8;
  var mouseY = mouse.clientY - 8;

  ////////////  this isn't working for me ? ///////////////
  // var mouseX = mouse.clientX - document.getElementById('ctx').getBoundingClientRect().left;
  // var mouseY = mouse.clientY - document.getElementById('ctx').getBoundingClientRect().top;
  ////////////  this isn't working for me  ///////////////

  // adjust to relative to the position of the player
  mouseX -= player.x;
  mouseY -= player.y;
  player.aimAngle = Math.atan2(mouseY,mouseX) / Math.PI * 180;
}

// when key is released
document.onkeydown = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    player.pressingRight = true;
  }
  else if (event.keyCode === 83 || event.keyCode === 40){
    player.pressingDown = true;
  }
  else if (event.keyCode === 65 || event.keyCode === 37){
    player.pressingLeft = true;
  }
  else if (event.keyCode === 87 || event.keyCode === 38){
    player.pressingUp = true;
  }
  else if (event.keyCode === 80){
    Gameboard.gamePause = !Gameboard.gamePause;
  }
}

// when key is pressed
document.onkeyup = function(event){
  if (event.keyCode === 68 || event.keyCode === 39){
    player.pressingRight = false;
  }
  else if (event.keyCode === 83 || event.keyCode === 40){
    player.pressingDown = false;
  }
  else if (event.keyCode === 65 || event.keyCode === 37){
    player.pressingLeft = false;
  }
  else if (event.keyCode === 87 || event.keyCode === 38){
    player.pressingUp = false;
  }
}

// on click
document.onclick = function(event){
  // if (dog.counter > 25){
  //   generateBullets(dog);
  //   dog.counter = 0;
  // }
  // console.log("regular attack");

// FIX ACTION
  // dog.preformAttack();
}

// hide right click
document.oncontextmenu = function(event){

// FIX ACTION
  // dog.preformSpecialAttack();
  event.preventDefault();
}
///////////GAME EVENT FUNCTIONS END//////////////


///////////UPDATE GAME//////////////
// update game
var update = function(){
  if (Gameboard.gamePause) {
    ctx.fillText("PAUSED",canvas.width/2,canvas.height/2);
    return;
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  Gameboard.frameCount++;
  // player.score++;

  //////// GENERATE NEW ITEMS ////////
  // add another dog
  if (Gameboard.frameCount % 2000 === 0){
    randomlyGenerateDog();
  }
  // add an upgrade
  if (Gameboard.frameCount % 1000 === 0){
    randomlyGenerateUpgrade();
  }
  // add an obstacle
  if (Gameboard.frameCount % 1000 === 0){
    randomlyGenerateObstacle();
  }

    //////// PLAYER ////////
    player.update();

    //////// DOG ////////
    updateDoggie();

    //////// UPGRADES ////////
    updateUpgrade();

    //////// OBSTACLE ////////
    updateObstacle();

    //////// POOPIE ////////
    updatePoopie();

    //////// TRASHCAN ////////
    updateTrashCan();

    //////// PLAYER INFO ////////
    updateGameData();
}

var updateDoggie = function(){
  for (var key in doggyList){
    doggyList[key].update();
    doggyList[key].preformAttack();
  }
}

var updateUpgrade = function(){
  for (var key in upgradeList){
    upgradeList[key].update();
// move this to upgrade override
    var isColliding = player.testCollision(upgradeList[key]);
      if (isColliding) {
        if (upgradeList[key].category === "score"){
          console.log("YEAH...score++!!");
          player.score += 10;
        }
        if (upgradeList[key].category === "speed") {
          console.log("YEAH... speed bonus!!");
          player.stkSp += 3;
        }
        if (upgradeList[key].category === "health") {
          console.log("YEAH... health bonus!!");
          player.hp += 3;
        }
        // delete the upgrade
        delete upgradeList[key];
      }
  }
}

var updateObstacle = function(){
  for (var key in obstacleList){
    obstacleList[key].update();
  }
}

var updatePoopie = function(){
  for (var key in poopieList){
    poopieList[key].update();
  }
  for (var key in poopieList){
    if (poopieList[key].toBeRemoved){
      // toBeRemoved logic
      delete poopieList[key];
      player.score += 10;
    }
  }
}

var updateTrashCan = function(){
  for (var key in trashCanList){
    trashCanList[key].update();
  }
}

var updateGameData = function(){
  $("#game_level").text(Gameboard.level);
  $("#player_score").text(player.score);
  $("#player_health").text(player.hp);
  $("#player_poo_count").text(player.poopArray.length.toString());
}
///////////UPDATE//////////////

/////////// END GAME //////////////
var pauseGame = function(){
  Gameboard.gamePause = !Gameboard.gamePause;
}

/////////// START GAME //////////////
var startNewGame = function(){
  Gameboard.gamePause = false;
  Gameboard.gameCounter++;
  player.hp = 10;
  player.stkSp = 1;
  player.score = 0;
  player.poopArray = [];

  Gameboard.gameStartTime = Date.now();
  Gameboard.frameCount = 0;
  Gameboard.score = 0;

  doggyList = {};
  upgradesList = {};
  obstacleList = {};
  poopieList = {};
  trashCanList = {};

  randomlyGenerateUpgrade();
  randomlyGenerateDog();
  randomlyGenerateObstacle();
  randomlyGenerateTrashCan();
}

player = Player();
startNewGame();

setInterval(update, 40);

///////////LETS GO//////////////
///////// document ready ///////
$(document).ready(function(){

  // for mouse move events
  // window.addEventListener("mousemove", function(event){
  //   mouse.x = event.x;
  //   mouse.y = event.y;
  //
  // });

  // event listener for resize of the screen
  // window.addEventListener("resize", function(){
  //     // when the screen resizes redraw the image
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  //     // init();
  //     update();
  // });

  // for click events
  // canvas.addEventListener("click", function(event) {
  //     // drawRectangle(ctx, event.offsetX, event.offsetY);
  //     console.log("click is called");
  //   });

  // the "href" attribute of the modal trigger
  // must specify the modal ID
  // that wants to be triggered
    $('.modal').modal();
});
