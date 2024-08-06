//CONDITIONAL VARIABLES
fishHorizontal = true; //set to true for horizontal fish
fishVertical = false; //set to true for vertical fish
vinesConnected = false; //set to true to have more vines and full connections over all tiles
innerPetalCount = 6; //define amount of petals for lotus inner layer
outerPetalCount = 12; //define amount of petals for lotus outer layer


let cellWidth = 200;
let cellHeight = 200;
let centerX = cellWidth / 2;
let centerY = cellHeight / 2;
let controlPoints1, controlPoints2;

  //first bezier curve control points
  controlPoints1 = [
    { x: 4, y: -2 },
    { x: 2.89, y: -3.145 },
    { x: 4.05, y: -4.41 },
    { x: 2, y: -5 }
  ];

  //second bezier curve control points
  controlPoints2 = [
    { x: 2, y: -5 },
    { x: 3.676, y: -5.934 },
    { x: 5.5, y: -3 },
    { x: 4, y: -2 }
  ];

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(NINE_LANDSCAPE);
  pWallpaper.show_guide(false); // Set this to false when you're ready to print

  // Grid settings
  pWallpaper.grid_settings.cell_width = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset = 50;

  angleMode(RADIANS);
}

function wallpaper_background() {
  background(0, 50, 70); // Light honeydew green color
}

function drawVine(x0,y0,x1,y1,x2,y2,x3,y3) {
  stroke(50, 200, 80);
  strokeWeight(cellWidth / 200);
  noFill();

  //make a bezier curve for the vine to follow at given points
  bezier(x0, y0, x1, y1, x2, y2, x3, y3);
}

function drawLilyPad() {
  let padRadius = max(cellWidth, cellHeight) / 4;

  fill(34, 139, 34);
  noStroke();
  //makes lilypad with x and y coordinates for later traingle cut (this idea did not make it)
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.01) {
      let x = centerX + padRadius * cos(angle) - 1;
      let y = centerY + padRadius * sin(angle) - 1;
      vertex(x, y);
  }
  endShape(CLOSE);
}

function drawFish(x, y, rotation) {
  push();
  
  //translate and rotate fish based on given variables
  translate(x, y);
  rotate(radians(rotation));
  translate(-cellWidth / 2, -cellHeight / 2);

  //scaleFactor for fish size. Will be used for fins and eyes
  let scaleFactor = 90 * (cellWidth / 800) *0.92;
  let centerX = cellWidth / 2;
  let centerY = cellHeight / 2;

  //draw fins behind fish model first
  drawFinsBehind(centerX, centerY, scaleFactor);

  noStroke();
  fill(230);

  //bezier shape of fish
  beginShape();
  vertex(controlPoints1[0].x * scaleFactor + centerX, -controlPoints1[0].y * scaleFactor + centerY);
  bezierVertex(controlPoints1[1].x * scaleFactor + centerX, -controlPoints1[1].y * scaleFactor + centerY,
               controlPoints1[2].x * scaleFactor + centerX, -controlPoints1[2].y * scaleFactor + centerY,
               controlPoints1[3].x * scaleFactor + centerX, -controlPoints1[3].y * scaleFactor + centerY);

  bezierVertex(controlPoints2[1].x * scaleFactor + centerX, -controlPoints2[1].y * scaleFactor + centerY,
               controlPoints2[2].x * scaleFactor + centerX, -controlPoints2[2].y * scaleFactor + centerY,
               controlPoints2[3].x * scaleFactor + centerX, -controlPoints2[3].y * scaleFactor + centerY);
  endShape(CLOSE);

  //draw fish parts
  drawFinsInfront(centerX, centerY, scaleFactor);
  drawEye(centerX, centerY, scaleFactor);

  pop();
}

function drawFinsInfront(centerX, centerY, scaleFactor) {
  fill(200);
  
  //right fin
  beginShape();
  vertex(centerX + 4.2 * scaleFactor, centerY + 3.8 * scaleFactor);
  vertex(centerX + 4.0 * scaleFactor, centerY + 5.2 * scaleFactor);
  vertex(centerX + 3.65 * scaleFactor, centerY + 4.95 * scaleFactor);
  endShape(CLOSE);
}

function drawFinsBehind(centerX, centerY, scaleFactor) {
  fill(150);
  noStroke();
  
  //left fin
  beginShape();
  vertex(centerX + 2.75 * scaleFactor, centerY + 3.9 * scaleFactor);
  vertex(centerX + 3.65 * scaleFactor, centerY + 3.4 * scaleFactor);
  vertex(centerX + 2.65 * scaleFactor, centerY + 3.35 * scaleFactor);
  endShape(CLOSE);

  fill(180);
  
  //bottom fin
  beginShape();
  vertex(centerX + 1.2 * scaleFactor, centerY + 4.6 * scaleFactor);
  vertex(centerX + 2.05 * scaleFactor, centerY + 5 * scaleFactor);
  vertex(centerX + 1.45 * scaleFactor, centerY + 5.4 * scaleFactor);
  endShape(CLOSE);
}

function drawEye(centerX, centerY, scaleFactor) {
    
    //scale eyes to fish
    let eyeWidth = 25 * (scaleFactor / 90);
    let eyeHeight = 40 * (scaleFactor / 90);
    let pupilWidth = 15 * (scaleFactor / 90);
    let pupilHeight = 30 * (scaleFactor / 90);
  
    //right eye
    fill(180);
    noStroke();
    ellipse(centerX + 4.47 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);
  
    fill(20);
    ellipse(centerX + 4.46 * scaleFactor, centerY + 3 * scaleFactor, pupilWidth, pupilHeight);
  
    fill(230);
    noStroke();
    ellipse(centerX + 4.33 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);
  
    //left eye
    fill(180);
    noStroke();
    ellipse(centerX + 3.57 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);
  
    fill(20);
    ellipse(centerX + 3.57 * scaleFactor, centerY + 3 * scaleFactor, pupilWidth, pupilHeight);
  
    fill(230);
    noStroke();
    ellipse(centerX + 3.70 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);
  }

  function drawLotus() {

    //different radii for length of petal
    let radius1 = min(cellWidth, cellHeight) / 6;
    let radius2 = min(cellWidth, cellHeight) / 5;
    let radius3 = min(cellWidth, cellHeight) / 10;
    let centerCircleSize = min(cellWidth, cellHeight) / 15;
  
    //outer petals
    for (let i = 0; i < outerPetalCount; i++) {
      let angle = TWO_PI / outerPetalCount * i;
      let gradient = drawingContext.createLinearGradient(-radius1 / 2, 0, radius1 / 2, 0);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'pink');
      push();
      translate(centerX, centerY);
      rotate(angle);
      drawingContext.fillStyle = gradient;
      beginShape();
      for (let a = 0; a < TWO_PI; a += 0.1) {
        let x = (radius1 / 2) * cos(a);
        let y = (radius1) * sin(a) - radius1 / 2;
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  
    //middle petals
    fill(255, 182, 193);
    for (let i = 0; i < outerPetalCount; i++) {
      let angle = TWO_PI / outerPetalCount * i;
      push();
      translate(centerX, centerY);
      rotate(angle);
      
      //gradient effect on outside of petals
      for (let j = 0; j < 10; j++) {
        let alpha = map(j, 0, 10, 255, 0);
        stroke(lerpColor(color(255, 255, 255, alpha), color(255, 105, 180, alpha), j / 10));
        strokeWeight(2 - (j * 0.2));
        ellipse(0, -radius2 / 2, radius2 / 2 - j, radius2 - j);
      }
      noStroke();
      pop();
    }
  
    //inner petals
    for (let i = 0; i < innerPetalCount; i++) {
      let angle = TWO_PI / innerPetalCount * i + PI / 6;
      let gradient = drawingContext.createLinearGradient(-radius3 / 2, 0, radius3 / 2, 0);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'pink');
      push();
      translate(centerX, centerY);
      rotate(angle);
      drawingContext.fillStyle = gradient;
      stroke('pink'); // Set the stroke to pink for the gradient outline
      strokeWeight(2);
      beginShape();
      for (let a = 0; a < TWO_PI; a += 0.1) {
        let x = (radius3 / 2) * cos(a);
        let y = (radius3) * sin(a) - radius3 / 2;
        vertex(x, y);
      }
      endShape(CLOSE);
      pop();
    }
  
    //stems
    noStroke();
    fill(204, 184, 0);

    for (let i = 0; i < 20; i++) {
      let angle = TWO_PI / 20 * i;
      push();
      translate(centerX, centerY);
      rotate(angle);
      beginShape();
      vertex(0, -centerCircleSize / 5);
      vertex(-5, -centerCircleSize - 6);
      vertex(5, -centerCircleSize);
      endShape(CLOSE);
  
      //white specs in center to mimic pollen look, 50% chance for all stems
      if (random(1) < 0.5) {
        fill(255);
        ellipse(0, -centerCircleSize - 5, min(cellWidth, cellHeight) / 100, min(cellWidth, cellHeight) / 100);
      }
  
      pop();
    }
  
    //yellow centre
    noStroke();
    fill(255, 223, 0);
    ellipse(centerX, centerY, centerCircleSize, centerCircleSize);
  }

function my_symbol() { // Do not rename this function. Treat this similarly to a Draw function

  //background gradient
  let ctx = drawingContext;
  let gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, max(cellWidth, cellHeight) / 2);

  //centre color
  gradient.addColorStop(0, 'rgb(0,120,120)'); 
  //edge color
  gradient.addColorStop(1, 'rgb(0,50,50)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(centerX - cellWidth / 2, centerY - cellHeight / 2, cellWidth, cellHeight);

  if(vinesConnected){
    drawVine(0,0,0,cellHeight,cellWidth/4*3,0,cellWidth/4*3,cellHeight);
    drawVine(cellWidth,0,cellWidth,cellHeight,cellWidth/4,0,cellWidth/4,cellHeight);
    drawVine(cellWidth/2,0,cellWidth/2,0,cellWidth/2,cellHeight/2,cellWidth/2,cellHeight/2);
  }
  else{
    drawVine(0,0,0,cellHeight,cellWidth/4*3,0,cellWidth/4*3,cellHeight);
  }

  if(fishVertical){
    drawFish(cellWidth * 0.43, cellHeight * 0.43, 0);
    drawFish(cellWidth * 0.57, cellHeight * 0.57, 180);
  }
  if(fishHorizontal){
    drawFish(cellWidth * 0.57, cellHeight * 0.43, 90);
    drawFish(cellWidth * 0.43, cellHeight * 0.57, 270);
  }  

  drawLilyPad();
  drawLotus();
}
