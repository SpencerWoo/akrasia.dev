function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.path = false;
  this.animate = false;
  this.points = false;
  this.number = 0;
  this.s = false;
  this.e = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && top.path) {
      neighbors.push(top);
    }
    else if (right && right.path) {
      neighbors.push(right);
    }
    else if (bottom && bottom.path) {
      neighbors.push(bottom);
    }
    else if (left && left.path) {
      neighbors.push(left);
    }

    // if (neighbors.length > 0) {
    //   var r = floor(random(0, neighbors.length));
    //   return neighbors[r];
    // } else {
    //   return undefined;
    // }

  }
  this.highlight = function() {
    var x = this.i*tile_size;
    var y = this.j*tile_size;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, tile_size, tile_size);
  }

  this.show = function() {
    var x = this.i*tile_size;
    var y = this.j*tile_size;
    stroke(0);
    if (this.walls[0]) {
      line(x    , y    , x + tile_size, y);
    }
    if (this.walls[1]) {
      line(x + tile_size, y    , x + tile_size, y + tile_size);
    }
    if (this.walls[2]) {
      line(x + tile_size, y + tile_size, x    , y + tile_size);
    }
    if (this.walls[3]) {
      line(x    , y + tile_size, x    , y);
    }

    if (this.s) {
      //green start
      noStroke();
      fill(50, 255, 30);
      rect(x, y, tile_size, tile_size);
    }
    else if (this.e){
      //red end
      noStroke();
      fill(255, 0, 0);
      rect(x, y, tile_size, tile_size);
    }else if (this.points){
      //yellow points
      noStroke(); 
      fill(255, 210, 0);
      rect(x, y, tile_size, tile_size);

      textSize(17);
      fill(0, 0 ,0 );
      text(this.number, x + (tile_size*1)/4, y + (tile_size*3)/4);
    }else if (this.animate){
      //white naimation
      noStroke(); 
      fill(255, 255, 255);
      rect(x, y, tile_size, tile_size);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, tile_size, tile_size);
    }
  }
}