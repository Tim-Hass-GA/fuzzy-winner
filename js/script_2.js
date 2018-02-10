console.log("script_2.js is here removed static player");

// Tim Hass // Feb 2018 // GA - Project 1
// Dedication: Brian Lifton Aug 2008 - May 2017

// Game Name: Pooper Scooper
// Your dog Brian likes to have a clean area to run, play, and jump in
// the objective of the game is to keep the area clean, so
// Brian can have a nice place to have fun


///////////CODE START/////////////
// bring in the canvas object
/////////////////////////////////
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var header = document.getElementById("header");
// var headerHeight = header.hasOwnProperty("scrollHeight");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// canvas.width = 500;
// canvas.height = 500;
// var WIDTH = 500;
// var HEIGHT = 500;

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
// Img.dog.width;
// Img.dog.heigth;
Img.boy = new Image();
Img.boy.src = "./images/Boyrun.png";
Img.poop = new Image();
Img.poop.src = "./images/emeny.png";

// Img.dogHouse = new Image();
// Img.dogHouse.src = "./images/Dog.png";
Img.tree = new Image();
Img.tree.src = "./images/Tree1.png";
Img.tree2 = new Image();
Img.tree2.src = "./images/Tree2.png";
Img.rock = new Image();
Img.rock.src = "./images/Rock1.png";
// Img.trashCan = new Image();
// Img.trashCan.src = "./images/Dog.png";

Img.upgrade1 = new Image();
Img.upgrade1.src = "./images/Pumpkin2.png";
Img.upgrade2 = new Image();
Img.upgrade2.src = "./images/Grass1.png";
Img.upgrade3 = new Image();
Img.upgrade3.src = "./images/Apple.png";

// Img.map2 = new Image();
// Img.map2.src = "./images/Park.png";

///////////GAMEBOARD PIECES//////////////

// var drawMap = function(){
  // where to draw the map
  // var x = ???
  // var y = ???
  // if (player.x === WIDTH/2)
  //   x = 0
  // x = player.x === WIDTH/2
  // .playerx increase => mapx decreases
  // x = WIDTH/2 - player.x

  // ctx.drawImage(Img.map1,0,0,Img.map1.width,Img.map1.height,0,0,Img.map1.width * 2,Img.map1.height * 2);

// }

// var CreateMaps = function(id,imgSrc,width,height){
//   var self = {
//     id:id,
//     image: new Image(),
//     width:width,
//     height:height
//   }
//   self.image.src = imgSrc;
//   self.draw = function(){
//     // var x = WIDTH / 2 - player.x;
//     // var y = HEIGHT / 2 - player.y;
//     var x = canvas.width / 2 - player.x;
//     var y = canvas.height / 2 - player.y;
//     // canvas.width = window.innerWidth;
//     // canvas.height = window.innerHeight;
//     ctx.drawImage(self.image,0,0,self.image.width,self.image.height,0,0,self.image.width * 2,self.image.height * 2);
//   }
//   return self;
// }

// currentMap = CreateMaps("field","./images/Map3.jpg",1500,840);

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

    // ctx.fillRect(self.x-self.width/2,self.y-self.height/2,self.width,self.height);

    //fixed position for self

    // var x = self.x - player.x;
    // var y = self.y - player.y;
    //
    // // x += WIDTH / 2;
    // // y += HEIGHT / 2;
    // x += canvas.width / 2;
    // y += canvas.height / 2;
    // // canvas.width = window.innerWidth;
    // // canvas.height = window.innerHeight;
    //
    // x -= self.width / 2;
    // y -= self.height / 2;
    //
    // // ctx.drawImage(image,
    // //   cropStartX, cropStartY, cropWidth, cropHeight,
    // //   drawX,drawY,drawWidth,drawHeight);
    //
    // ctx.drawImage(self.img,0, 0,self.img.width,self.img.height,x,y,self.width,self.height);

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
    // console.log("self");
    // console.log(self);
    // console.log("entity2");
    // console.log(entity2);
    return testCollisionRect(rect1,rect2);
  }
  // self.isColliding = function(){
  // function to hold the action to take if collision is true
  // }



  self.updatePosition = function(){
    self.x += self.speedX;
    self.y += self.speedY;
    // if greater than screen size change direction
    if (self.x < 0 || self.x > canvas.width){
      self.speedX = -self.speedX;
    }
    if (self.y < 0 || self.y > canvas.height){
      self.speedY = -self.speedY;
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
  doggyList[id] = self;
}
// set up and place dog object
var randomlyGenerateDog = function(){
  var id = Math.random();
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;
  var width = 80;
  var height = 80;
  // var speedX = 3 + Math.random() * 5;
  // var speedY = 3 + Math.random() * 5;




  var speedX = 1;
  var speedY = 1;





  Dog(id,x,y,speedX,speedY,width,height)
}

///////////Player//////////////
var player;
// create the player list
var playerList = {};
// player object
var Player = function(){
  var id = Math.random();
  var self = Actor("player",id,50,40,30,5,60,80,10,1,Img.boy);
  // overriding the default action of the entity class
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
  // var super_collision = self.testCollision;
  // self.testCollision = function(){
  //   super_collision(entity2);
  //   if (self.isColliding){
  //     var impactWith = entity2.type;
  //     // who is intity two
  //     if (entity2.combatType === "poopie"){
  //     //   // for (var key2 in player){
  //     //     // test for collision with player
  //     //       var isColliding = player.testCollision(poopyList[key]);
  //     //       if (isColliding) {
  //             console.log("SHIT...you stepped in it.");
  //     //         console.log("score subtraction");
  //     //         console.log("player hp subtraction");
  //     //         toRemove = true;
  //     //         delete poopyList[key];
  //     //         break
  //     //
  //     //     }
  //       }
  //
  //     // if (impactwith.type === "poopie"){
  //       console.log(" i hit the " + impactWith);
  //     // }
  //   }
  //
  // }






  self.pressingDown = false;
  self.pressingUp = false;
  self.pressingLeft = false;
  self.pressingRight = false;
  self.score = Gameboard.score;

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
  self.category = category;
  self.timer = 0;
  // // super update overriding default functionality
  var super_update = self.update;
  self.update = function(){
    super_update();
    console.log("super_update called");
    for (player in playerList){
      var isColliding = self.testCollision(player);
      console.log(isColliding);
          // if (isColliding) {
          //
          //   if (upgradesList[key].category === "score"){
          //     console.log("YEAH...!!");
          //     GameBoard.score += 100;
          //     self.toBeRemoved = true;
          //   }
          //   if (upgradesList[key].category === "stkSp") {
          //     console.log("YEAH...!!");
          //     dog.stkSp += 3;
          //     self.toBeRemoved = true;
          //   }
          // }
    }
  }



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
  var width = 50;
  var height = 50;
  var category;
  var img;

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
  // var tree = Entity("tree","myId",(Math.random() * WIDTH),
  // (Math.random() * HEIGHT),0,0,60,60,Img.tree);
  var tree = Entity("tree","myId",(Math.random() * canvas.width),
  (Math.random() * canvas.height),0,0,60,60,Img.tree);
  // var tree = Entity("trashCan",id,x,y,speedX,speedY,width,height,img);
  // var dogHouse = Entity("dogHouse",id,x,y,speedX,speedY,width,height,img);
  // var trashCan = Entity("trashCan",id,x,y,speedX,speedY,width,height,img);
  // var rock = Entity("rock",id,x,y,speedX,speedY,width,height,img);

  // {
  //   id: Math.random(),
  //   x: Math.random() * WIDTH,
  //   y: Math.random() * HEIGHT,
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
  //   x: Math.random() * WIDTH,
  //   y: Math.random() * HEIGHT,
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
  //   x: Math.random() * WIDTH,
  //   y: Math.random() * HEIGHT,
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


  // add to obstacleList
  obstacleList[tree.id] = tree;
  // obstacleList[trashCan.id] = trashCan;
  // obstacleList[dogHouse.id] = dogHouse;
};


///////////Poop//////////////
// create poopy list
var poopyList = {};
// create poop object
var Poopy = function(id,x,y,speedX,speedY,width,height,combatType){
  var self = Actor("poopie",id,x,y,speedX,speedY,width,height,2,0,Img.poop);
  self.combatType = combatType;


  // FIX THIS
  // var super_update = self.update;
  // self.update = function(){
  //   super_update();
  //   self.timer++;
  //   self.toRemove = false;
  //   if (self.timer > 75){
  //     self.toRemove = true;
  //   }
  // }



  self.timer = 0;
  self.toBeRemoved = false;
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


// FIX THIS

// var spdX = Math.cos(angle/100*Math.PI)*5;
// var spdY = Math.sin(angle/100*Math.PI)*5;
  Poopy(id,x,y,speedX,speedY,width,height,actor.type);
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






var actionOnImpact = function(){
    // var super_update = self.update;
    // self.update = function(){
    //   super_update();
    //   if (self.stkCounter > 200){
    //     toRemove = true;
    //   }
    //   var toRemove = false;
    //   var isColliding = self.testCollision(player);
    //       if (isColliding) {
    //         toRemove = true;
    //         if (self.category === "score"){
    //           console.log("YEAH...!! 100+");
    //           GameBoard.score += 100;
    //         }
    //         if (self.category === "stkSp") {
    //           console.log("YEAH...!! your health is restored");
    //           dog.stkSp += 3;
    //         }
    //         // kill the entity
    //         delete upgradeList[self.id];
    //       }
    //   if (toRemove){
    //     delete upgradesList[self.id];
    //   }
    // }


    //

    // if (poopyList[key].combatType === "poopie"){
    //   // for (var key2 in player){
    //     // test for collision with player
    //       var isColliding = player.testCollision(poopyList[key]);
    //       if (isColliding) {
    //         console.log("SHIT...you stepped in it.");
    //         console.log("score subtraction");
    //         console.log("player hp subtraction");
    //         toRemove = true;
    //         delete poopyList[key];
    //         break
    //
    //     }
    //   // }
    //
    //
    //   var isColliding = player.testCollision(doggyList[key]);
    //   if (isColliding) {
    //     console.log("OUCH hit by the dog...!")
    //     player.hp = player.hp - 1;
    //   }
    //
    //
    //   // check to see if the player collects upgrade
    //     var isColliding = player.testCollision(upgradesList[key]);
    //       if (isColliding) {
    //         console.log(player +" hit "+ upgradesList[key])
    //         if (upgradesList[key].category === "score"){
    //           console.log("YEAH...!!");
    //           player.score += 100;
    //         }
    //         if (upgradesList[key].category === "stkSp") {
    //           console.log("YEAH...!!");
    //           player.stkSp += 3;
    //         }
    //         // kill the entity
    //         delete upgradesList[key];
    //       }

}


///////////UPDATE ANIMATION//////////////
var updateGame = function(){
  // clear the board
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // ctx.clearRect(0,0,WIDTH,HEIGHT);
  // currentMap.draw();
  Gameboard.frameCount++;
  // create new upgrade
  if (Gameboard.frameCount % 100 === 0) {
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
    poopyList[key].timer++;
    // poopyList[key].testCollision();
    // if (poopyList[key].timer > 75){
    //   delete poopyList[key];
    // }

    // test for collision with player
    var isColliding = poopyList[key].testCollision(player);
    if (isColliding) {
      console.log("SHIT...you stepped in it.");
      toRemove = true;
      delete poopyList[key];
      break
    }
  }


  // for the dog
  for (var key in doggyList){
    doggyList[key].update();
    // check to see if the player collects upgrade

  }
  // for obstacleList

  // for (var key in obstacleList){
  //   obstacleList[key].update();
  //   // check to see if the player collects upgrade
  //     var isColliding = player.testCollision(obstacleList[key]);
  //       if (isColliding) {
  //         if (obstacleList[key].category === "trashCan") {
  //           console.log("YEAH...drop that shit!!");
  //           player.stkSp += 5;
  //           player.score += 1000;
  //         } else {
  //           console.log("OUCH you hit an obstacle...!!");
  //           player.stkSp -= 1;
  //           player.score -= 10;
  //           player.hp -= 1;
  //         }
  //         // kill the entity
  //         delete upgradesList[key];
  //       }
  // }
  //

  // for upgradesList
  for (var key in upgradesList){
    upgradesList[key].timer++;
    upgradesList[key].update();
  }
  // kill the entity
  if (upgradesList[key].toBeRemoved){
    delete upgradesList[key];
  }
  if (upgradesList[key].timer > 200){
    delete upgradesList[key];
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
// Gameboard.playerArray.push(player);
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
        // WIDTH = window.innerWidth;
        // HEIGHT = window.innerHeight;
        // init();
        // update();
    // });

  // the "href" attribute of the modal trigger
  // must specify the modal ID
  // that wants to be triggered
    $('.modal').modal();
});
