
//controller parameters
// divisions in degrees
let degRes = 15;
// levels of repetition
let level = 1;
// maximum levels of repetition
let maxLevel = 8;

// petals array and nother arrays for checking finished petals
let petals = [];
let checks = [];

// change in x, y for the stalk
let stalkY = 0;
let stalkX = 0;
// previous change in x, y for the stalk
let pStalk, prevPStalk;

let generatePetals = true;

function setup() {
  createCanvas(700, 700);
  background(0, 0, 10);
  pStalk = createVector(width / 2, height);
  prevPStalk = createVector(width / 2, height);
}

function draw() {
  drawStalk();
  drawPetals(level);
  if (petals.length > 0 && level < maxLevel) {
    if (!checks.includes(false)) {
      level++;
      petals = [];
      generatePetals = true;
    }
  }
}

/**
 * draws the stalk from the bottom of the canvas
 */
function drawStalk() {
  if (stalkY < height / 2) {
    pStalk.x = width / 2 + map(noise(stalkX), 0, 1, -1, 1) * 20;
    pStalk.y = height - stalkY;
    let sw = random(20, 30) * pStalk.y * 0.0012;
    stroke(0, 140, 200, 25);
    strokeWeight(sw);
    if (frameCount > 1) {
      line(prevPStalk.x, prevPStalk.y, pStalk.x, pStalk.y);
    }
    prevPStalk = pStalk.copy();
    stalkY += 4;
    stalkX += 0.02;
  }
}

/**
 * creates a petals array for every level, updates and renders the petals
 * it also checks for the finished petals
 */
function drawPetals() {
  if (stalkY >= height / 2 && generatePetals) {
    generatePetals = false;
    rndA = random(0, PI);
    for (let ra = rndA; ra < rndA + TWO_PI - radians(degRes) / 2; ra += radians(degRes)) {
      petals.push(new Petal(pStalk, ra));
    }
  }
  checks = [];
  for (let petal of petals) {
    petal.update();
    petal.render();
    checks.push(petal.finished);
  }
}


