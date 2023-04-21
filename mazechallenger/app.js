var map_size = 600;
var console_size = 300;

var grid = [];
var cols, rows;
var tile_size = 20;

var animate_path = [];
var animate_counter = 0;

var isAnimate = false;
var isPathing = false;

var score = 0;

//Default 30x30
//Default Map
var mapSetup = [150, 155, 485, 504, 174, 164, 764, 779];

var start_index = mapSetup[0];
var end_index = mapSetup[mapSetup.length - 1];

// Handle Mouse1 Toggle
var releaseToggle = false;
var pressedTile = null;
var pressedTileV = false;

function setup() {
    createCanvas(map_size + console_size, map_size);
    cols = floor(map_size / tile_size);
    rows = floor(map_size / tile_size);
    //frameRate(5);

    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
}

function resetGame() {
    animate_path = [];
    animate_counter = 0;

    isAnimate = false;
    isPathing = false;

    start_index = mapSetup[0];
    end_index = mapSetup[mapSetup.length - 1];

    for (var i = 1; i < mapSetup.length - 1; i++) {
        grid[mapSetup[i]].s = false;
    }
}

function resetMaze() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].visited = false;
        grid[i].animate = false;
        grid[i].path = false;
    }
}

function executeAStar(start, end, mapPoint) {
    var col = [];
    var row = [];

    for (var j = 0; j < rows; j++) {
        row = [];

        for (var i = 0; i < cols; i++) {

            if (grid[j + (cols * i)].visited) {
                row.push(0);
            } else {
                row.push(1);
            }
        }
        col.push(row);
    }

    var graph = new Graph(col);

    var s2 = (int)(start / cols);
    var s1 = start % cols;
    var e2 = (int)(end / cols);
    var e1 = end % cols;

    var s = graph.grid[s1][s2];
    var e = graph.grid[e1][e2];

    var result = astar.search(graph, s, e);

    //   return animatePath(col, result);
    // }

    // function animatePath(col, result){
    if (result.length < 1) {
        alert("Invalid Maze.  There is no way through!");
        resetGame();
        return false;
    }

    for (var i = 0; i < result.length; i++) {
        var v = (result[i].y * rows) + result[i].x;
        grid[v].path = true;
        animate_path.push(v);

        if (i == result.length - 1) {
            // start = v;
        } else {
            col[result[i].y][result[i].x] = 0;
        }
    }

    mapPoint++;

    if (mapPoint < mapSetup.length) {
        animate_path.push(v);
        start = mapSetup[mapPoint - 1];
        end = mapSetup[mapPoint];
        return executeAStar(start, end, mapPoint);
    } else {
        return true;
    }
}

function isRunning() {
    return (isPathing || isAnimate);
}

function mouseDragged() {
    if (isRunning()) {

    } else if (mouseX < 600 && mouseY < 600) {
        tile = mouseTile();
        tile.visited = (mouseButton == LEFT);

        if (releaseToggle) {
            if (tile !== pressedTile) {
                releaseToggle = false;
            }
        }
    }
}

function mousePressed() {
    if (isRunning()) {

    } else if (mouseX < 600 && mouseY < 600 && (mouseButton == LEFT)) {
        tile = mouseTile();
        tile.visited = !tile.visited;

        releaseToggle = true;
        pressedTile = tile;
        pressedTileV = tile.visited;
    }
}

function mouseReleased() {
    if (releaseToggle) {
        pressedTile.visited = pressedTileV;
        releaseToggle = false;
    }
}

function mouseTile() {
    w2 = (int)(mouseX / tile_size);
    h2 = (int)(mouseY / tile_size);
    t2 = (int)(h2 * cols) + w2;
    return grid[t2];
}

function keyPressed() {
    if (keyCode == 32) {
        if (isRunning()) {

        } else {
            isPathing = true;
            score = 0;
        }
    }
    if (keyCode == ENTER) {
        resetGame();
        resetMaze();
    }
}

function drawAnimate() {
    isPathing = false;

    var v = animate_path[animate_counter];
    if (animate_counter > 0) {
        grid[animate_path[animate_counter - 1]].animate = false;

        if (v == animate_path[animate_counter - 1]) {
            grid[v].s = true;
        }
    }
    grid[v].animate = true;

    score++;
    animate_counter++;

    if (animate_counter >= animate_path.length) {
        // console.log("Score : " + animate_counter);

        animate_counter = 0;
        isAnimate = false;
        resetGame();
    }
}

function drawMap() {
    for (var i = 0; i < grid.length; i++) {
        grid[i].show();
    }

    grid[start_index].s = true;
    grid[end_index].e = true;
    for (var i = 1; i < mapSetup.length - 1; i++) {
        grid[mapSetup[i]].points = true;
        grid[mapSetup[i]].number = i;
    }
}

function draw() {
    background(51);
    drawMap();

    if (isPathing) {
        isAnimate = executeAStar(start_index, mapSetup[1], 1);
        isPathing = false;
    }

    if (isAnimate) {
        drawAnimate();
    }

    drawConsole();
}

function drawConsole() {
    var x1 = 630;
    var y1 = 100;
    noStroke();

    textSize(32);
    // fill(255, 204, 100);
    // colorMode(HSB, 100);
    fill(color('magenta'));

    text("Score : " + score, x1, y1 / 2);

    textSize(32);
    if (score > 1900) {
        text("Godlike", x1, y1);
    } else if (score > 1500) {
        text("Grand Master", x1, y1);
    } else if (score > 1100) {
        text("Master", x1, y1);
    } else if (score > 700) {
        text("Elite", x1, y1);
    } else if (score > 400) {
        text("Advanced", x1, y1);
    } else if (score > 200) {
        text("Intermediate", x1, y1);
    } else if (score > 96) {
        text("Beginner", x1, y1);
    } else {

    }
    fill(255, 255, 255);

    textSize(15);
    text("Objective : Build the longest maze.", x1, y1 * 2);

    var entryTextY = y1 * 2 + 50;
    var offset = 30;
    var draw_offset = -15;
    fill(50, 255, 30);
    rect(x1, entryTextY + draw_offset, 20, 20);

    fill(255, 0, 0);
    rect(x1, entryTextY + draw_offset + offset, 20, 20);

    fill(255, 255, 255);
    text("Entry", x1 + offset, entryTextY);
    text("Exit", x1 + offset, entryTextY + offset);

    text("MOUSE to build the maze.\nSPACE to submit the maze.\n\nENTER to reset the maze.", x1, y1 * 4);
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j * cols;
}

// Binary Heap

function getHeap() {
    return new BinaryHeap(function(node) {
        return node.f;
    });
}

function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function(element) {
        // Add the new element to the end of the array.
        this.content.push(element);

        // Allow it to sink down.
        this.sinkDown(this.content.length - 1);
    },
    pop: function() {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it bubble up.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.bubbleUp(0);
        }
        return result;
    },
    remove: function(node) {
        var i = this.content.indexOf(node);

        // When it is found, the process seen in 'pop' is repeated
        // to fill up the hole.
        var end = this.content.pop();

        if (i !== this.content.length - 1) {
            this.content[i] = end;

            if (this.scoreFunction(end) < this.scoreFunction(node)) {
                this.sinkDown(i);
            } else {
                this.bubbleUp(i);
            }
        }
    },
    size: function() {
        return this.content.length;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },
    sinkDown: function(n) {
        // Fetch the element that has to be sunk.
        var element = this.content[n];

        // When at 0, an element can not sink any further.
        while (n > 0) {

            // Compute the parent element's index, and fetch it.
            var parentN = ((n + 1) >> 1) - 1;
            var parent = this.content[parentN];
            // Swap the elements if the parent is greater.
            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
                this.content[parentN] = element;
                this.content[n] = parent;
                // Update 'n' to continue at the new position.
                n = parentN;
            }
            // Found a parent that is less, no need to sink any further.
            else {
                break;
            }
        }
    },
    bubbleUp: function(n) {
        // Look up the target element and its score.
        var length = this.content.length;
        var element = this.content[n];
        var elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) << 1;
            var child1N = child2N - 1;
            // This is used to store the new position of the element, if any.
            var swap = null;
            var child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);

                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore) {
                    swap = child1N;
                }
            }

            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N];
                var child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) {
                    swap = child2N;
                }
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
};