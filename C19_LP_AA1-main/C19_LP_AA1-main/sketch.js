var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite (300, 300);
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.45
  //spookySound.loop();
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  if (gameState === "play"){
    if (keyDown ("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if (keyDown ("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    if (keyDown  ("space"))
    {ghost.velocityY = -5}
    ghost.velocityY = ghost.velocityY + 0.8
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if (invisibleBlockGroup.isTouching(ghost)){
      ghost.destroy();
      gameState = "end"

    }
drawSprites();
  }
    if (gameState === "end"){
      stroke ("red")
      fill ("yellow")
      textSize (40)
      text ("game over", 210, 240)
    }
  }
function spawnDoors(){
  if (frameCount %240 === 0){
    var door = createSprite (200, -50);
    var climber = createSprite (240, 10);
    var invisibleBlock = createSprite (200, 15);
    invisibleBlock.width = climber.width
    invisibleBlock.height =2
    door.x = Math.round (random (120, 400))
    climber.x = door.x
    invisibleBlock.x=door.x;

    door.addImage ("door", doorImg);
    climber.addImage ("climber", climberImg);
    
   
    door.velocityY = 1
    climber.velocityY = 1
    climber.scale = 0.5
    ghost.depth = door.depth
    ghost.depth += 1
    doorsGroup.add(door)
    climbersGroup.add(climber)
    
 
    invisibleBlock.x =door.x
    invisibleBlock.velocityY =1
    invisibleBlockGroup.add(invisibleBlock);
  }
}

