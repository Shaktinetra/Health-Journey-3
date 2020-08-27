var healthy, temptation, player;
var playerHouse, tempatationHouse, healthyHouse;
var healthyImg, tempatationImg, player1Img, player2Img;
var temptCD, healthCD, playerRightCD, playerLeftCD;
var accomplished, click, doorbell;
var gameState = "play";
var hr, min, sec;
var accept, decline;
var healthyVisit, unhealthyVisit;
var callH, callT;
var temptationCall, healthCall;

function preload() {
  healthyImg = loadImage("healthy.png");
  temptationImg = loadImage("temptation.jpg");
  player1Img = loadImage("player_avatar_1.jpg");
  player2Img = loadImage("player_avatar_2.jpg");

  doorbell = loadSound("doorbell.mp3");
  accomplished = loadSound("accomplished.mp3");
  click = loadSound("click.mp3");
}

function setup() {
  createCanvas(1200, 400);

  temptationCall = 0;
  healthyCall = 0;

  player = createSprite(600, 225, 50, 50);
  player.addImage("avatar1", player1Img);
  player.addImage("avatar2", player2Img);
  player.scale = 0.3;

  temptation = createSprite(1100, 225, 50, 50);
  temptation.addImage("tempt", temptationImg);
  temptation.scale = 0.12;
  
  healthy = createSprite(100, 225, 50, 50);
  healthy.addImage("healthy", healthyImg);
  healthy.scale = 0.14;
  
  temptCD = 125;
  healthCD = 125;
  playerRightCD = 125;
  playerLeftCD = 125;

  accept = createButton("Accept");
  accept.position(500, 375);
  accept.size(100, 100);
  accept.style('font-size', '20px');
  accept.style('background-color', 'green');
  accept.hide();

  decline = createButton("Decline");
  decline.position(625, 375);
  decline.size(100, 100);
  decline.style('font-size', '20px');
  decline.style('background-color', 'green');
  decline.hide();

  healthyVisit = 0;
  unhealthyVisit = 0;

  callH = createButton("callH");
  callH.position(100, 50);

  callT = createButton("callT");
  callT.position(1100, 50);
}

function draw() {
  background(255, 255, 255);  
  stroke(0);
  textSize(20);
 // text("Sounds from zapsplat.com")

 hr = hour();
 min = minute();
 sec = second();

 if (hr > 12) {
  text(hr%12 + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " PM", 35, 30);
  } else {
    text(min + " PM", 35, 30)
  }
} else if (hr === 0) {
  text("12:", 20, 30);
  
  if (min < 10) {
    text("0" + min + " AM", 35, 30);
  } else {
    text(min + " AM", 35, 30)
  }
} else if (hr === 12) {
  text(hr + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " PM", 35, 30);
  } else {
    text(min + " PM", 35, 30);
  }
} else {
  text(hr + ":", 20, 30);
  
  if (min < 10) {
    text("0" + min + " AM", 35, 30);
  } else {
    text(min + " AM", 35, 30);
  }
}

text("Messages: ", 20, 50);

if (temptation.x < 725) {
  message("tempt");
}

if (hr === 8 && min === 0) {
health(); 
}

if (hr%2 === 0 && min === 30) {
  tempt();
}

callH.mousePressed(function() {
  healthCall = 1;
});

callT.mousePressed(function() {
  temptationCall = 1;
});

if (temptationCall === 1) {
  tempt();
}

if (healthCall === 1) {
  health();
}

decline.mousePressed(rejectTempt);

 fill(0);
 line(500, 125, 700, 125);
 line(500, playerLeftCD, 500, 325);
 line(700, playerRightCD, 700, 325);
 line(500, 325, 700, 325);

 line(0, 125, 200, 125);
 line(0, 125, 0, 325);
 line(200, healthCD, 200, 325);
 line(0, 325, 200, 325);

 line(1000, 125, 1200, 125);
 line(1000, temptCD, 1000, 325);
 line(1200, 125, 1200, 325);
 line(1000, 325, 1200, 325);

 drawSprites();
}

function tempt() {
  if (temptCD < 325) {
    temptCD = temptCD + 5;
  }

  if (temptCD === 325 /*&& gameState === "play"*/) {
    temptation.velocityX = -2;
  }

  if (temptation.x < 725 /*&& gameState === "play"*/) {
    temptation.velocityX = 0;
    doorbell.play();
    //gameState = "wait";
    temptationCall = 0;
  }

  accept.show();
  decline.show();
}

function health() {
  if (healthCD < 325) {
    healthCD = healthCD + 5;
  }

  if (healthCD === 325 && gameState === "play") {
    healthy.velocityX = 2;
  }

  if (healthy.x > 470 && gameState === "play") {
    healthy.velocityX = 0;

    doorbell.play();
    gameState = "wait"
    healthCall = 0;
    decline.mousePressed(rejectHealth);
  }

  accept.show();
  decline.show();
}

function acceptTempt() {
  if (playerRightCD < 325) {
    playerRightCD = playerRightCD + 5;
  }
}

function acceptHealth() {
  if (playerLeftCD < 325) {
    playerLeftCD = playerLeftCD + 5;
  }
}

function rejectTempt() {
  if (temptation.x < 1100 /*&& gameState === "wait"*/) {
    temptation.velocityX = 2;
   
    console.log('executed'); 
  }

  if (temptation.x > 1100 /*temptCD === 325 && gameState === "wait"*/) {
    temptation.velocityX = -0;
  }

  if (temptCD > 125) {
    temptCD = temptCD -5;
  }

  accept.hide();
  decline.hide();
}
  

function rejectHealth() {
  if (healthy.x > 100 /*&& gameState === "wait"*/) {
    temptation.velocityX = -2;
    console.log('done');  
  }

  if (healthy.x < 100 /*temptCD === 325 && gameState === "play"*/) {
    healthy.velocityX = -0;
  }

  if (healthCD > 125) {
    healthCD = healthCD -5;
  }
}

function message(name) {
  text("Your friend, " + name + " has come to visit. He says,", 450, 350);
}