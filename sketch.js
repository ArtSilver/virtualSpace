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
  createCanvas(windowWidth, windowHeight); //.parent("canvasParent").id("drawingCanvas");
  //stopTouchScrolling(document.getElementById('drawingCanvas'));
  earsSize = ears.width;
  barW=bar.width;
  barH=bar.height;
  earsX = width/2;
  earsY = height/2;
  drumsX = 0;drumsY = 0;
  bassX = width;bassY = 0;
  barX = width*0.5;barY = height;
  barScale = width/barW * 0.25;
  drumSound.loop(true);
  bassSound.loop(true);
  barSound.loop(true);
  barSound.play();
  drumSound.play();
  bassSound.play();
  maxDist = dist(0,0,width,height);
}

function clampVolume(value) {
  if (value<0.5) return 0.0;
  if (value>0.9) return 1.0;
  return value
} 

function draw() {
  background(220,220,210);
  imageMode(CORNER)
  image(drums, 0, 0, width/4,width/4);
  image(bass,width*0.75,0,width/4,width/4);
 
  imageMode(CENTER);
  image(bar, width*0.5, height-barH*barScale*0.5, barW*barScale, barH*barScale);
  image(ears, earsX, earsY);
  let dDrum = clampVolume(dist(drumsX,drumsY,earsX,earsY)/maxDist);
  let dBass = clampVolume(dist(bassX,bassY,earsX,earsY)/maxDist);
  let dBar = clampVolume(dist(barX,barY,earsX,earsY)/maxDist);
  text('Drum dist: '+dDrum, 10, 200);
  text('Bass dist: '+dBass, 10, 220);
  text('Bar dist: '+dBar, 10, 240);
  barSound.amp(dBar);
  bassSound.amp(dBass); //bass.play();
  drumSound.amp(dDrum);
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

function stopTouchScrolling(canvas){
  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
      if (e.target == canvas) {
          e.preventDefault();
      }
  }, { passive: false });
  document.body.addEventListener("touchend", function (e) {
      if (e.target == canvas) {
          e.preventDefault();
      }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (e) {
      if (e.target == canvas) {
          e.preventDefault();
      }
  }, { passive: false });
  
  }