let controlPoints1, controlPoints2;

  // Initialize control points for fish drawing
  controlPoints1 = [
    { x: 4, y: -2 },
    { x: 2.89, y: -3.145 },
    { x: 4.05, y: -4.41 },
    { x: 2, y: -5 }
  ];

  controlPoints2 = [
    { x: 2, y: -5 },
    { x: 3.676, y: -5.934 },
    { x: 5.5, y: -3 },
    { x: 4, y: -2 }
  ];

function setup_wallpaper(pWallpaper) {
  pWallpaper.output_mode(GRID_WALLPAPER);
  pWallpaper.resolution(FIT_TO_SCREEN);
  pWallpaper.show_guide(true); // Set this to false when you're ready to print

  // Grid settings
  pWallpaper.grid_settings.cell_width = 200;
  pWallpaper.grid_settings.cell_height = 200;
  pWallpaper.grid_settings.row_offset = 50;
}

function wallpaper_background() {
  background(240, 255, 240); // Light honeydew green color
}

function drawFish(centerX, centerY, rotation, scaleFactor) {
  push();

  translate(centerX, centerY);
  rotate(radians(rotation));
  translate(-centerX, -centerY);

  drawFinsBehind(centerX, centerY, scaleFactor);

  noStroke();
  fill(230);

  beginShape();
  vertex(controlPoints1[0].x * scaleFactor + centerX, -controlPoints1[0].y * scaleFactor + centerY);
  bezierVertex(controlPoints1[1].x * scaleFactor + centerX, -controlPoints1[1].y * scaleFactor + centerY,
               controlPoints1[2].x * scaleFactor + centerX, -controlPoints1[2].y * scaleFactor + centerY,
               controlPoints1[3].x * scaleFactor + centerX, -controlPoints1[3].y * scaleFactor + centerY);

  bezierVertex(controlPoints2[1].x * scaleFactor + centerX, -controlPoints2[1].y * scaleFactor + centerY,
               controlPoints2[2].x * scaleFactor + centerX, -controlPoints2[2].y * scaleFactor + centerY,
               controlPoints2[3].x * scaleFactor + centerX, -controlPoints2[3].y * scaleFactor + centerY);
  endShape(CLOSE);

  drawFinsInfront(centerX, centerY, scaleFactor);
  drawEye(centerX, centerY, scaleFactor);

  pop();
}

function drawFinsInfront(centerX, centerY, scaleFactor) {
  fill(200);
  
  // Right fin
  beginShape();
  vertex(centerX + 4.2 * scaleFactor, centerY + 3.8 * scaleFactor);
  vertex(centerX + 4.0 * scaleFactor, centerY + 5.2 * scaleFactor);
  vertex(centerX + 3.65 * scaleFactor, centerY + 4.95 * scaleFactor);
  endShape(CLOSE);
}

function drawFinsBehind(centerX, centerY, scaleFactor) {
  fill(150);
  noStroke();
  
  // Left fin
  beginShape();
  vertex(centerX + 2.75 * scaleFactor, centerY + 3.9 * scaleFactor);
  vertex(centerX + 3.65 * scaleFactor, centerY + 3.4 * scaleFactor);
  vertex(centerX + 2.65 * scaleFactor, centerY + 3.35 * scaleFactor);
  endShape(CLOSE);

  fill(180);
  
  // Bottom fin
  beginShape();
  vertex(centerX + 1.2 * scaleFactor, centerY + 4.6 * scaleFactor);
  vertex(centerX + 2.05 * scaleFactor, centerY + 5 * scaleFactor);
  vertex(centerX + 1.45 * scaleFactor, centerY + 5.4 * scaleFactor);
  endShape(CLOSE);
}

function drawEye(centerX, centerY, scaleFactor) {
  let eyeWidth = 25 * (scaleFactor / 90);
  let eyeHeight = 40 * (scaleFactor / 90);
  let pupilWidth = 15 * (scaleFactor / 90);
  let pupilHeight = 30 * (scaleFactor / 90);

  // right eye
  fill(180);
  noStroke();
  ellipse(centerX + 4.47 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);

  fill(20);
  ellipse(centerX + 4.46 * scaleFactor, centerY + 3 * scaleFactor, pupilWidth, pupilHeight);

  fill(230);
  noStroke();
  ellipse(centerX + 4.33 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);

  // left eye
  fill(180);
  noStroke();
  ellipse(centerX + 3.57 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);

  fill(20);
  ellipse(centerX + 3.57 * scaleFactor, centerY + 3 * scaleFactor, pupilWidth, pupilHeight);

  fill(230);
  noStroke();
  ellipse(centerX + 3.70 * scaleFactor, centerY + 3 * scaleFactor, eyeWidth, eyeHeight);
}

function my_symbol() { // Do not rename this function. Treat this similarly to a Draw function
  noLoop();

  let cellWidth = pWallpaper.grid_settings.cell_width;
  let cellHeight = pWallpaper.grid_settings.cell_height;
  let centerX = cellWidth / 2;
  let centerY = cellHeight / 2;
  let scaleFactor = 90 * (cellWidth / 800) * 0.92;
  
  // Draw four fish with rotation in the center of each cell
  drawFish(centerX, centerY, 0, scaleFactor);
  drawFish(centerX, centerY, 90, scaleFactor);
  drawFish(centerX, centerY, 180, scaleFactor);
  drawFish(centerX, centerY, 270, scaleFactor);
}
