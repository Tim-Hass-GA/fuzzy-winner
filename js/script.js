console.log("js is here");
// Tim Hass
// Feb 2018
// GA - Project 1
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

// player must move to the poop safeZone
// player must click on poop object to collect it (clicks vary per level)
// if player collides with a single poop object the game gets 5 points
// player can not collect poop that has been stepped in
// stepped in poop becomes an obstable (but can be stepped in again)
// if stepped in =2 the poop is destroyed and game gets 5 points
// player must move to trashCan and click to dispose (one click)
// player must move around obstacles
// if player hits the same obstable twice while poop in hand the poop will drop
// player must pick up poop again
// Brain will run around and play in the area
// Brain is set on a 30 second timer
// Brain randomly drops poop
// Brain is redirected when he collides with and obstacle
// Brian moves at a set set interal
//


// to do
// 2 clicks outside of obstacle when not in safeZone
// 2 clicks on poop collects the poop
// 1 click on trashCan collects the poop
// safeZone for click
// crash on poop collision
// extensions
// playBall
//


var dogsInPlay = [];
var obstaclesInPlay = [];
var playersInPlay = [];

var Dog = {
  name: "dogsName",
  speed: GameBoard.level.speed,
  location: {},
  action: {
    sit: function(){return this.speed},
    run: function(){return this.speed},
    dropPoop: function(){
      // return this.speed + this.poop
      poop: {
        size: 1,
        clicks: 0,
        action: {
          destroyPoop: function(){return this.clicks - this.size},
          resetClicks: function(){return this.clicks - this.size},
          becomeObstacle: function(){return this.clicks - this.size},
        }
    },
    bark: function(){return this.speed},
    redirect: function(){return this.speed}
  }
  }
}
var Player = {
  name: "player" + id,
  id: "player_",
  speed: GameBoard.level.speed,
  level: GameBoard.level.id,
  location: {},
  score: 0,
  highScore: 0,
  action: {
    walk: function(){return this.speed},
    run: function(){return this.speed},
    dumpPoop: function(){return this.speed}
    pickUpPoop: function(){return this.speed}
    stepInPoop: function(){return this.speed}
  }
}
var Obstacle =
  tree: {
    id: "tree",
    src: "imageLink"
    location: {},
    location: [],
    level: GameBoard.level.id,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
  },
  dogHouse: {
    id: "dogHouse",
    src: "imageLink",
    location: {},
    level: GameBoard.level.id,
    action: {
      blockMove: function(){return this.speed},
      dropPoop: function(){return this.speed}
  },
  trashCan: {
    id: "trashCan",
    src: "imageLink",
    location: {},
    level: GameBoard.level.id,
    full: 10,
    action: {
      checkFull: function(){return this.full, this.level},
      emptyCan: function(){return this.full}
  }
}
var GameBoard = {
  name: "Pooper Scooper",
  src: "imageLink",
  winGameScore: 10,
  gameScore: 0,
  gameTimer: 0,
  screenSize: {},
  canvasSize: {},
  canvas: {},
  level: {
    id: 1
    speed: 1
  }
  action: {
    loadGameBoard: function(){return this.speed},
    createObstacles: function(){return this.speed},
    createPlayer: function(){return this.speed},
    setGamePieceTimeOut: function(object){return this.speed},
    setGamePieceInterval: function(object){return this.speed},
    safeZone: function(){return this.speed}
    fireOffense: function(){return this.speed}
    destroyKeyPress: function(){return this.speed}
    onGameKeyPress: function(){return this.speed}
    onMouseClick: function(){return this.speed}
  },
  obstableX: {
    dogHouseX: null,
    treeX: null
    poopX: null
  },
  poopsX: {
    poopY: null
  },
  player#: {

  },
  dogX: {
    dogY: null
  },
  trashCanX: {,
    trashCanY: null
  }
}

// var friend = {firstName: "Jane", lastName: "Doe"}

$(document).ready(function(){

});
