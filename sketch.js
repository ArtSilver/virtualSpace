let ears, bar,drums, bass;
let barW=100;
let barH=100;

let earsX, earsY;

// Load the images and create p5.Image objects.
function preload() {
  ears = loadImage('./assets/ears.jpg');
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
}

function draw() {
  background(220);
  imageMode(CORNER)
  image(drums, 0, 0, width/3,width/3);
  image(bass,width*0.666,0,width/3,width/3);
 
  imageMode(CENTER);
  image(bar, width*0.5, height-0.1875*width, width*0.5, height*0.375);
  image(ears, earsX, earsY); 
  describe('the listener');
 
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

