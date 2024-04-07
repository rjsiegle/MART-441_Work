var canvas;
var ctx;
var player;
var squareArray = [];
var collectablesArray = [];
var score = 0; 

function hasCollided(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

$(document).ready(function(){
    setup();  
    $(this).keydown(function(event){
        handleKeyPress(event);
    });
});

//Classes Defined Here:
class Square {
    constructor(x, y, width, height, mainColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.mainColor = mainColor;
    }
}
class Collectable {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }
}
class Player {
    constructor(x, y, width, height, mainColor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.mainColor = mainColor;
        this.canvasWidth = canvas.width; 
        this.canvasHeight = canvas.height; 
    }

    //Player Movement
    moveUp() {
        if (this.y > 0) { 
            this.y -= 10;
        }
    }
    moveDown() {
        if (this.y + this.height < this.canvasHeight) { 
            this.y += 10;
        }
    }
    moveRight() {
        if (this.x + this.width < this.canvasWidth) { 
            this.x += 10;
        }
    }
    moveLeft() {
        if (this.x > 0) { 
            this.x -= 10;
        }
    }

    //Collisions (Collectables)
    checkCollectableCollision(collectable) {
        return (
            this.x < collectable.x + collectable.size &&
            this.x + this.width > collectable.x &&
            this.y < collectable.y + collectable.size &&
            this.y + this.height > collectable.y
        );
    }
}

//Setup
function setup() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    player = new Player(50, 50, 50, 50, "#FF0000");

    //JSON Load
    $.getJSON("data/information.json", function(data) {
        for (var i = 0; i < data.squares.length; i++) {
            var squareData = data.squares[i];
            var square = new Square(squareData.x, squareData.y, squareData.w, squareData.h, squareData.color);
            squareArray.push(square);
        }
        drawObjects();
    });
    $.getJSON("data/collectables.json", function(data) {
        const collectablesData = data.collectables;

        //Array
        collectablesArray = collectablesData.map(collectableData => 
            new Collectable(collectableData.x, collectableData.y, collectableData.size, collectableData.color)
        );
        console.log(collectablesArray);
    });
}

//Key Presses
function handleKeyPress(event) {
    var keyCode = event.which || event.keyCode;
    var playerMoved = false; 
    switch (keyCode) {
        case 37: 
            player.moveLeft();
            playerMoved = true;
            break;
        case 38: 
            player.moveUp();
            playerMoved = true;
            break;
        case 39: 
            player.moveRight();
            playerMoved = true;
            break;
        case 40: 
            player.moveDown();
            playerMoved = true;
            break;
    }
    if (playerMoved) {
        handleCollision();
    }

    //Player and Collectible collision
    collectablesArray.forEach((collectable, index) => {
        if (player.checkCollectableCollision(collectable)) {
            collectablesArray.splice(index, 1);
            score += 10;
            $("#score").text("Score: " + score);
        }
    });

    drawObjects();
}

//Handle Collision
function handleCollision() {
    squareArray.forEach(square => {
        if (hasCollided(player, square)) {
            switch (keyCode) {
                case 37: 
                    player.moveRight(); 
                    break;
                case 38: 
                    player.moveDown(); 
                    break;
                case 39: 
                    player.moveLeft(); 
                    break;
                case 40: 
                    player.moveUp(); 
                    break;
            }
        }
    });
}

//Draw
function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = player.mainColor;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    squareArray.forEach(square => {
        ctx.fillStyle = square.mainColor;
        ctx.fillRect(square.x, square.y, square.width, square.height);
    });
    collectablesArray.forEach(collectable => {
        ctx.fillStyle = collectable.color;
        ctx.fillRect(collectable.x, collectable.y, collectable.size, collectable.size);
    });

    //Score Display
    ctx.fillStyle = "#000000"; 
    ctx.font = "16px verdana";
    ctx.fillText("Score: " + score, 10, 20); 
}
