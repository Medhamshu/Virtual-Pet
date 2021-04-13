var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed,fedTime;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed =createButton("Feed the Dog"); 
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",readTime)

  var PM = lastFed - 12;
 
  textSize(20)
  fill("blue")
if (lastFed == 0)
{
  text("Last Feed : 12 AM", 300,30)
}
else if(lastFed ==12)
{
  text("Last Feed : 12 PM", 300,30)
}  
else if(lastFed > 12)
{
  text("Last Feed :" + PM + "PM", 300,30)
}
else
{
  text("Last Feed :" + lastFed + "AM", 300,30)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data)
{
  lastFed=data.val();
}

function feedDog(){
  dog.addImage(happyDog);
  lastFed = hour()
  var foodStockValue = foodObj.getFoodStock()
    if (foodStockValue <= 0)
    {
      foodObj.updateFoodStock(foodStockValue * 0)
    }
    else
    {
      foodObj.updateFoodStock(foodStockValue - 1)
    }
  
    database.ref('/').update({
    Food:foodStockValue,
    FeedTime:lastFed
    })

    console.log(foodStockValue)
}

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
