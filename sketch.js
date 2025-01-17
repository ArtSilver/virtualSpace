let ears, bar,drums, bass;
let barW;
let barH;
let barScale;

let earsX, earsY;
let drumsX, drumsY;
let bassX, bassY;
let barX, barY;
let earsSize;

let dbString = '';

let drumSound, bassSound, barSound;
let maxDist

// Load the images and create p5.Image objects.
function preload() {
  soundFormats('mp3', 'ogg');
  ears = loadImage('./assets/ears.jpg');
  bar = loadImage('./assets/bar.jpg');
  drums = loadImage('./assets/drums.jpg');
  bass = loadImage('./assets/bass.jpg');
  drumSound = loadSound('./assets/drum');
  bassSound = loadSound('./assets/bass');
  barSound = loadSound('./assets/bar');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  earsSize = ears.width;
  barW=bar.width;
  barH=bar.height;
  earsX = width/2;
  earsY = height/2;
  drumsX = 0;drumsY = 0;
  bassX = width;bassY = 0;
  barX = width*0.5;barY = height;
  barScale = width/barW * 0.25;
  drumSound.loop();
  bassSound.loop();
  barSound.loop();
  barSound.play();
  maxDist = dist(0,0,width,height);
}

function draw() {
  background(220,220,210);
  imageMode(CORNER)
  image(drums, 0, 0, width/4,width/4);
  image(bass,width*0.75,0,width/4,width/4);
 
  imageMode(CENTER);
  image(bar, width*0.5, height-barH*barScale*0.5, barW*barScale, barH*barScale);
  image(ears, earsX, earsY);
  let dDrum = dist(drumsX,drumsY,earsX,earsY);
  let dBass = dist(bassX,bassY,earsX,earsY);
  let dBar = dist(barX,barY,earsX,earsY);
  text('Drum dist: '+dDrum, 10, 100);
  text('Bass dist: '+dBass, 10, 120);
  text('Bar dist: '+dBar, 10, 140);
  barSound.amp(dBar/maxDist);
  bassSound.amp(dBass/maxDist);
  drumSound.amp(dDrum/maxDist);
  describe('the listener');
  //line(mouseX,mouseY, pmouseX, pmouseY);
}

function mouseDragged() {
  let xDelta = abs(mouseX - earsX);
  let yDelta = abs(mouseY - earsY);
  if (xDelta < earsSize*0.5 && yDelta < earsSize*0.5) {
    earsX = mouseX;
    earsY = mouseY;  
    dbString = 'over';
  } else {
    dbString = 'out';
  }
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  barScale = width/barW * 0.5;
  earsX = width/2;
  earsY = height/2;
  maxDist = dist(0,0,width,height);
}

