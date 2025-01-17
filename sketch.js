let ears, bar,drums, bass;
let barW=100;
let barH=100;
let barScale=0.5;

let earsX, earsY;
let earsSize;

// Load the images and create p5.Image objects.
function preload() {
  ears = loadImage('./assets/ears.jpg');
  earsSize = ears.width;
  bar = loadImage('./assets/bar.jpg');
  barW=bar.width;
  barH=bar.height;
  drums = loadImage('./assets/drums.jpg');
  bass = loadImage('./assets/bass.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  earsX = width/2;
  earsY = height/2;
  barScale = width/barW * 0.5;
}

function draw() {
  background(220);
  imageMode(CORNER)
  image(drums, 0, 0, width/4,width/4);
  image(bass,width*0.75,0,width/4,width/4);
 
  imageMode(CENTER);
  image(bar, width*0.5, height-barH*barScale*0.5, barW*barScale, barH*barScale);
  image(ears, earsX, earsY); 
  describe('the listener');
 
}

function mouseDragged() {
  let xDelta = abs(mouseX - earsX);
  let yDelta = abs(mouseY - earsY);
  if (xDelta < earsSize/2 && yDelta < earsSize/2) {
    earsX = mouseX;
    earsY = mouseY;
  }
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barScale = width/barW * 0.5;
}

