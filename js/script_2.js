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
// canvas.height = window.innerHeight;
canvas.width = 500;
canvas.height = 500;

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
// set up the game variables for the game pieces
//
///////////GAMEBOARD//////////////
// create the gameboard list
// can hold player data
// var gameBoardList = {};
// start a game timer
var gameStartTime = Date.now();
// create the gameboard object
var Gameboard = {
  name: "Pooper Scooper",
  src: "imageLink",
  gameScoreWin: 10,
  gameScore: 0,
  playerArray: [],
  playerScore: [],
  gameStopTime: null,
  gameTimer: 0,
  gameCounter: 0,
  level: 1,
  speed: 1
}

// create the doggy list object
var doggyList = {};
// create the doggy object
var Dog = {
  id: Math.random(),
  name: "dogsName",
  speed: Gameboard.speed,
  ctx: [],
  action: {
    sit: function(){return this.speed},
    run: function(){return this.speed},
    bark: function(){return this.speed},
    redirect: function(){return this.speed},
    dropPoop: function(){return this.speed + this.poop}
    }
}

// create the upgrades list
// this is a extra feature
var upgradesList = {};
// create upgrade object
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
    color:color
  };
  // add the item to the list
  upgradesList[id] = upgradeItem;
};
// setup and place upgrades on the board
var randomlyGenerateUpgrade = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.width;
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
// var playerList = {};
// player object
var Player = {
  id:Math.random(),
  name:"name",
  x:50,
  y:40,
  speedX:30,
  speedY:5,
  width:20,
  height:20,
  hp:10,
  strikeSpeed:1,
  counter:0,
  pressingUp:false,
  pressingDown:false,
  pressingLeft:false,
  pressingRight:false,
  color:"green"
}

//   level: Gameboard.level,
//   ctx: [],
//   score: 0,
//   highScore: 0,
//   action: {
//     walk: function(){return this.speed},
//     run: function(){return this.speed},
//     dumpPoop: function(){return this.speed},
//     pickUpPoop: function(){return this.speed},
//     stepInPoop: function(){return this.speed}
//   }
// }
// generate player

// create the  object
var obstacleList = {};
// create the player object
var Obstacle = {
  Tree: {
    id: "tree",
    src: "imageLink",
    ctx: [],
    level: Gameboard.level,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
    }
  },
  DogHouse: {
    id: "dogHouse",
    src: "imageLink",
    ctx: [],
    level: Gameboard.level,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
    }
  },
  TrashCan: {
    id: "trashCan",
    src: "imageLink",
    ctx: [],
    level: Gameboard.level,
    full: 10,
    action: {
      checkFull: function(){return this.full, this.level},
      emptyCan: function(){return this.full}
    }
  },
  Poopy: {
    size: 1,
    scoops: Gameboard.level,
    src: "imageLink",
    ctx: [],
    actvity: {
      destroyPoop: function(){return this.clicks - this.size},
      resetClicks: function(){return this.clicks - this.size},
      becomeObstacle: function(){return this.clicks - this.size}
    }
  }
};

///////////GAMEPLAY//////////////

// get the distance between entities
// var distanceBetweenEntity = function(){};

// test for collision
// var testCollisionEntity = function(entity1, entity2){};

// test for collision rectangle
// var testCollisionRect = function(rect1, rect2){};

// var Upgrade = function(id,x,y,spdX,spdY,width,height,category,color){};
// var randomlyGenerateUpgrade = function(){};



///////////GAME ANIMATION//////////////

// this will update the game - game loop
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

// var updateDog = function(){};
// var updateDogPosition = function(){};
// updata player
// var updatePlayer = function(){
//   playerX.x += playerX.speedX;
//   playerX.y += playerX.speedY;
//   ctx.fill
// };
// update playr position
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
  if (Player.y < Player.height / 2){
    Player.x = canvas.height - Player.height / 2;
  }
};
//
// var updateObstacle = function(){};
// var updatePlayerPosition = function(){};

var updateGame = function(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  Gameboard.frameCount++;
  Gameboard.score++;

  // spit out a new upgrade every 3 seconds
  if (Gameboard.frameCount % 100 === 0) {
    randomlyGenerateUpgrade();
  }

  updatePlayerPosition();
  drawEntity(Player);


  for (var key in upgradesList){
    updateEntity(upgradesList[key]);

    // if (upgradesList[key].category === "score"){
    //   console.log("upgrade bonus");
    // }
    // if (upgradesList[key].category === "speed"){
    //   console.log("upgrade speed")
    // }
    // delete upgradesList[key];
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

  randomlyGenerateUpgrade();
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
