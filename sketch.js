let ears, bar,drums, bass;

function setup() {
  createCanvas(400, 800);
}

function draw() {
  background(220);
  imageMode(CORNER)
  image(drums, 0, 0, 100, 100);
  image(bass, width-100, 0, 100, 100);
  image(bar, width/2-100, height-100, 100, 100);
  imageMode(CENTER);
  image(ears, width/2, height/2, 200, 200);
}



// Load the image and create a p5.Image object.
function preload() {
  ears = loadImage('/assets/ears.jpg');
  bar = loadImage('/assets/bar.jpg');
  drums = loadImage('/assets/drums.jpg');
  bass = loadImage('/assets/bass.jpg');
}