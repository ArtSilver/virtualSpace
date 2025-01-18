var ears, bar,drums, bass;
var barImageW, barImageH;
var barDisplayW, barDisplayH; 

var earsX, earsY;
var drumsX, drumsY;
var bassX, bassY;
var barX, barY;
var earsSize;

var dbString = '';

var drumSound, bassSound, barSound;

var barBoundry;
var barVolume;
var bassVolume;
var drumVolume;

// Load the images and create p5.Image objects.
function preload() {
  soundFormats('mp3', 'ogg');
  ears = loadImage('./assets/ears.jpg');
  bar = loadImage('./assets/bar.jpg');
  drums = loadImage('./assets/drums.jpg');
  bass = loadImage('./assets/bass.jpg');
  drumSound = loadSound('./assets/drum.mp3');
  bassSound = loadSound('./assets/bass.mp3');
  barSound = loadSound('./assets/bar.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight); //.parent("canvasParent").id("drawingCanvas");
  //stopTouchScrolling(document.getElementById('drawingCanvas'));
  earsSize = ears.width;
  barImageW=bar.width;
  barImageH=bar.height;
  setupGeometry();
  barVolume = 0.0;
  bassVolume = 0.5;
  drumVolume = 0.5;
  barSound.amp(barVolume);
  bassSound.amp(bassVolume);
  drumSound.amp(drumVolume);
  drumSound.loop();
  bassSound.loop();
  barSound.loop();
  barSound.play();
  drumSound.play();
  bassSound.play();
}

var loopStatus;
var playStatus;
function draw() {
  background(220,220,210);
  imageMode(CORNER);
  image(drums, 0, 0, width/4,width/4);
  image(bass,width*0.75,0,width/4,width/4);
 
  imageMode(CENTER);
  image(bar, barX, barY, barDisplayW, barDisplayH);
  line(0,barBoundry,width,barBoundry);
  image(ears, earsX, earsY);
  if (drumSound.isLooping()) {loopStatus = ' looping,';} else {loopStatus = ' not looping,';}
  if (drumSound.isPlaying()) {playStatus = ' playing'+drumSound.setVolume();} else {playStatus = ' not playing';}
  text('Drum vol: '+drumVolume+loopStatus+playStatus, width/2, 100);
 
  if (bassSound.isLooping()) {loopStatus = ' looping,';} else {loopStatus = ' not looping,';}
  if (bassSound.isPlaying()) {playStatus = ' playing'+bassSound.setVolume();} else {playStatus = ' not playing';}
  text('Bass vol: '+bassVolume+loopStatus+playStatus, width/2, 120);
  
  if (barSound.isLooping()) {loopStatus = ' looping,';} else {loopStatus = ' not looping,';}
  if (barSound.isPlaying()) {playStatus = ' playing'+barSound.setVolume();} else {playStatus = ' not playing';}
  text('Bar vol: '+barVolume+loopStatus+playStatus, width/2, 140);

  text('output vol: '+getOutputVolume(), width/2, 160);

  barSound.setVolume(barVolume);
  bassSound.setVolume(bassVolume); //bass.play();
  drumSound.setVolume(drumVolume);
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