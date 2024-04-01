class GameObject {
    constructor(x, y, width, height, color, dx, dy, originalWidth, originalHeight) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.dx = dx; 
        this.dy = dy; 
        this.originalWidth = originalWidth; // Store original width
        this.originalHeight = originalHeight; // Store original height
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(canvas, speedFactor) {
        this.x += this.dx * speedFactor;
        this.y += this.dy * speedFactor;
    
        // canvas edge bounce
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.dx = -this.dx;
        }
        if (this.y <= 0 || this.y + this.height >= canvas.height) {
            this.dy = -this.dy;
        }
    }

    moveWithArrowKeys(canvas) {
        const step = 3; // how fast purple moves

        // movement of purple
        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
    
        window.addEventListener("keydown", (event) => {
            keys[event.key] = true;
        });
    
        window.addEventListener("keyup", (event) => {
            keys[event.key] = false;
        });

        // Smoothing purple
        const smoothMove = () => {
            // Store current position
            const prevX = this.x;
            const prevY = this.y;
    
            // Move the object based on arrow key state
            if (keys.ArrowUp && this.y > 0) this.y -= step;
            if (keys.ArrowDown && this.y + this.height < canvas.height) this.y += step;
            if (keys.ArrowLeft && this.x > 0) this.x -= step;
            if (keys.ArrowRight && this.x + this.width < canvas.width) this.x += step;
    
            // Check if the new position is within canvas boundaries
            if (this.x < 0 || this.x + this.width > canvas.width || this.y < 0 || this.y + this.height > canvas.height) {
                // If not, revert to the previous position
                this.x = prevX;
                this.y = prevY;
            }
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.draw(ctx);
    
            drawScore();
    
            requestAnimationFrame(smoothMove);
        };
    
        smoothMove();
    }

    resetSize() {
        this.width = this.originalWidth; // Reset width to original
        this.height = this.originalHeight; // Reset height to original
    }
}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Score
let score = 0;

let whiteSquareCollision = false;
let yellowSquareCollision = false;

// Score Display
function drawScore() {
    ctx.fillStyle = "whitesmoke";
    ctx.font = "20px Arial";
    ctx.fillText("Number of Tags: " + score, 10, 30); 
}

// purple
const player = new GameObject(50, 50, 20, 20, "purple", 0, 0);
player.moveWithArrowKeys(canvas); 

// other "players"
const whiteSquare = new GameObject(100, 100, 50, 50, "white", 1, 1, 50, 50); // Pass original size
const yellowSquare = new GameObject(200, 200, 50, 50, "yellow", -5, 5, 50, 50); // Pass original size

function handleCollision() {
    // white square presets
    if (!whiteSquareCollision && checkCollision(player, whiteSquare)) {
        score++;
        whiteSquareCollision = true;
        canvas.style.backgroundColor = "green";
        setTimeout(() => {
            canvas.style.backgroundColor = "black";
        }, 1000);
        whiteSquare.x = Math.random() * (canvas.width - whiteSquare.width);
        whiteSquare.y = Math.random() * (canvas.height - whiteSquare.height);
        whiteSquare.dx = Math.random() > 0.5 ? 2 : -2;
        whiteSquare.dy = Math.random() > 0.5 ? 2 : -2;
        // Shrink the white square
        whiteSquare.width -= 1;
        whiteSquare.height -= 1;
    }

    // yellow square presets
    if (!yellowSquareCollision && checkCollision(player, yellowSquare)) {
        score--;
        yellowSquareCollision = true;
        canvas.style.backgroundColor = "red";
        setTimeout(() => {
            canvas.style.backgroundColor = "black";
        }, 500);
        yellowSquare.x = Math.random() * (canvas.width - yellowSquare.width);
        yellowSquare.y = Math.random() * (canvas.height - yellowSquare.height);
        yellowSquare.dx = Math.random() > 0.5 ? 2 : -2;
        yellowSquare.dy = Math.random() > 0.5 ? 2 : -2;
        // Grow the yellow square
        yellowSquare.width += 10;
        yellowSquare.height += 10;
    }
}

// Function to check collision between two objects
function checkCollision(object1, object2) {
    return (
        object1.x < object2.x + object2.width &&
        object1.x + object1.width > object2.x &&
        object1.y < object2.y + object2.height &&
        object1.y + object1.height > object2.y
    );
}

// Restart game function
function restartGame() {
    score = 0; // Reset score
    whiteSquare.resetSize(); // Reset white square size
    yellowSquare.resetSize(); // Reset yellow square size
}

// Inside the event listener for keydown events
window.addEventListener("keydown", (event) => {
    keys[event.key] = true;

    // restart game
    if (event.key === "r" || event.key === "R") {
        restartGame(); // Call restart game function
    }
});

//updates
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const speedFactor = 0.5; 
    whiteSquare.move(canvas, speedFactor);
    yellowSquare.move(canvas, speedFactor);

    player.draw(ctx);
    whiteSquare.draw(ctx);
    yellowSquare.draw(ctx);

    handleCollision();
    whiteSquareCollision = false;
    yellowSquareCollision = false;

    drawScore();
    //win
    if (score >= 20) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("You Win!", canvas.width / 2 - 80, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart", canvas.width / 2 - 100, canvas.height / 2 + 20);
        if (keys["KeyR"]) {
            restartGame(); // Call restart game function
        }
    }
    //lose
    if (score < -20) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("You Lose!", canvas.width / 2 - 80, canvas.height / 2 - 20);
        ctx.font = "20px Arial";
        ctx.fillText("Press R to restart", canvas.width / 2 - 100, canvas.height / 2 + 20);
        if (keys["KeyR"]) {
            restartGame(); // Call restart game function
        }
    }

    requestAnimationFrame(update);
}


const keys = {}; 
window.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
window.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});


update();
