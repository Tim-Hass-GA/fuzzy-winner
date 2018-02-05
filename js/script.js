console.log("js is here");

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

// bring in the canvas object

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // init();
});


var GameBoard = {
  name: "Pooper Scooper",
  src: "imageLink",
  winGameScore: 10,
  gameScore: [],
  gameTimer: 0,
  level: {
    id: 1,
    speed: 1
  },
  trashCanX: {
    trashCanY: null
  },
  dogX: {
    dogY: []
  },
  playerX: {
    playerArray: []
  },
  obstableX: {
    dogHouseY: null,
    treeY: [],
    poopY: []
  },
  action: {
    loadGameBoard: function(){return this.speed},
    createObstacles: function(){return this.speed},
    createPlayer: function(){return this.speed},
    setGamePieceTimeOut: function(){return this.speed},
    setGamePieceInterval: function(){return this.speed},
    safeZone: function(){return this.speed},
    fireOffense: function(){return this.speed},
    destroyKeyPress: function(){return this.speed},
    onGameKeyPress: function(){return this.speed},
    onPoopScoop: function(){return this.speed}
  }
}
var Dog = {
  name: "dogsName",
  speed: GameBoard.level.speed,
  ctx: [],
  action: {
    sit: function(){return this.speed},
    run: function(){return this.speed},
    bark: function(){return this.speed},
    redirect: function(){return this.speed},
    dropPoop: function(){return this.speed + this.poop}
    }
}
var Player = {
  name: "player",
  id: "player#",
  speed: GameBoard.level.speed,
  level: GameBoard.level.id,
  ctx: [],
  score: 0,
  highScore: 0,
  action: {
    walk: function(){return this.speed},
    run: function(){return this.speed},
    dumpPoop: function(){return this.speed},
    pickUpPoop: function(){return this.speed},
    stepInPoop: function(){return this.speed}
  }
}
var Obstacle = {
  tree: {
    id: "tree",
    src: "imageLink",
    ctx: [],
    level: GameBoard.level.id,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
    }
  },
  dogHouse: {
    id: "dogHouse",
    src: "imageLink",
    ctx: [],
    level: GameBoard.level.id,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
    }
  },
  trashCan: {
    id: "trashCan",
    src: "imageLink",
    ctx: [],
    level: GameBoard.level.id,
    full: 10,
    action: {
      checkFull: function(){return this.full, this.level},
      emptyCan: function(){return this.full}
    }
  },
  poop: {
    size: 1,
    scoops: GameBoard.level.id,
    src: "imageLink",
    ctx: [],
    actvity: {
      destroyPoop: function(){return this.clicks - this.size},
      resetClicks: function(){return this.clicks - this.size},
      becomeObstacle: function(){return this.clicks - this.size}
    }
  }
}

// document ready statement
$(document).ready(function(){

  canvas.addEventListener("click", function(event) {
      drawRectangle(ctx, event.offsetX, event.offsetY);
    });

  // the "href" attribute of the modal trigger must specify the modal ID
  // that wants to be triggered
    $('.modal').modal();
});
