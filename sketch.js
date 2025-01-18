let ears, bar,drums, bass;
let barImageW, barImageH;
let barDisplayW, barDisplayH; 

let earsX, earsY;
let drumsX, drumsY;
let bassX, bassY;
let barX, barY;
let earsSize;

let dbString = '';

let drumSound, bassSound, barSound;

let barBoundry;
let barVolume = 0.0;
let bassVolume = 0.5;
let drumVolume = 0.5;

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
  barImageW=bar.width;
  barImageH=bar.height;
  setupGeometry();
  drumSound.loop(true);
  bassSound.loop(true);
  barSound.loop(true);
  barSound.play();
  drumSound.play();
  bassSound.play();
}

function draw() {
  background(220,220,210);
  imageMode(CORNER);
  image(drums, 0, 0, width/4,width/4);
  image(bass,width*0.75,0,width/4,width/4);
 
  imageMode(CENTER);
  image(bar, barX, barY, barDisplayW, barDisplayH);
  line(0,barBoundry,width,barBoundry);
  image(ears, earsX, earsY);
  text('Drum vol: '+drumVolume, 10, 200);
  text('Bass vol: '+bassVolume, 10, 220);
  text('Bar vol: '+barVolume, 10, 240);
  barSound.setVolume(barVolume);
  bassSound.amp(bassVolume); //bass.play();
  drumSound.amp(drumVolume);
  describe('the listener');
  //line(mouseX,mouseY, pmouseX, pmouseY);
}

function mouseDragged() {
  let xDelta = abs(mouseX - earsX);
  let yDelta = abs(mouseY - earsY);
  if (xDelta < earsSize*0.5 && yDelta < earsSize*0.5) {
    earsX = mouseX;
    earsY = mouseY;  
    let dDrum = abs(earsX-drumsX)/width;
    let dBass = abs(earsX-bassX)/width;
    if (earsY < barBoundry) {
      barVolume=0;
      drumVolume = dDrum;
      bassVolume = dBass;
    } else {
      barVolume = 1;
      drumVolume = 0;
      bassVolume = 0;
    }
  }
  return false
}

function setupGeometry() {
  earsX = width/2;
  earsY = height/2;
  drumsX = 0;
  drumsY = 0;
  bassX = width;
  bassY = 0;
  barDisplayW = width/4;
  barDisplayH = barImageH/barImageW * barDisplayW;
  barX = width*0.5;
  barY = height-barDisplayH*0.5;
  barBoundry = height-barDisplayH*1.5;
}

// Resize the canvas when the
// browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setupGeometry();
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