//Create variables here
var database;
var currentTime;
var dog, sadDog;
var dogImg;
var happyDog;
var foodS;
var foodStock; 
var foodObj;
var lastFed, fedTime;
var changeGameS, readGameS;
var bedroomImg, gardenImg, washroomImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/deadDog.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodObj = new Food();

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  readGameS = database.ref('gameState');
  readGameS.on("value",function(data){
    gameState = data.val();
  });

  feed = createButton("Feed Dog");
  feed.position(400,100);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(300,100);
  addFood.mousePressed(add);

}


function draw() {  
  background(46,139,87);

fedTime = database.ref('Time');
fedTime.on("value",function(data){
  lastFed = data.val();
})
if(lastFed >= 12){
  textSize(15);
  fill("red");
  text("Last Feed Time: " + lastFed %12 + " PM",300,50);
}
else if(lastFed == 0){
  textSize(15);
  fill("red");
  text("Last Feed Time: 12 AM",300,50);
}
else{
  textSize(15);
  fill("red");
  text("Last Feed Time: " + lastFed + " AM",300,50);
}

if(readGameS != "hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else {

}

currentTime = hour();
if(currentTime == (lastFed + 1)){
  update("playing");
  foodObj.garden();
}
 if(currentTime == (lastFed + 2)){
  update("sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastFed + 2) && currentTime<=(lastFed + 4)){
  update("bathing");
  foodObj.washroom();
}
else{
  update("hungry");
  foodObj.display();
  feed.show();
  addFood.show();
  dog = createSprite(250,350,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    Time: hour()
  });
}

function add(){
foodS++;
database.ref('/').update({
  Food: foodS
})
}

async function hour(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  
  var hour = datetime.slice(11,13);

  return hour;

}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}