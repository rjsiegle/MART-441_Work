var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var blueBubbles; // Add blue bubble group
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var spaceBar;
var restartText;


var game = new Phaser.Game(config);

function preload ()
{
    console.log("Preloading assets...");

    this.load.image('sky', 'gradient6.png');
    this.load.image('ground', 'platform.png');
    this.load.image('star', 'cloud.png');
    this.load.image('bomb', 'brush3.png');
    this.load.image('dude', 'cokecan.png');
    this.load.image('spike', 'glass.png');
    this.load.image('bluebubble', 'bluebubble.png'); // Load blue bubble image

    // Log a message after each asset is loaded
    this.load.on('filecomplete', function (key, file) {
        console.log("Loaded asset:", key);
    });

    console.log("Space bar keycode:", Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function create()
{
    console.log("Creating game objects...");
    // A simple background for our game
    this.add.image(400, 300, 'sky');

    // The platforms group contains the ground and the ledges we can jump on
    platforms = this.physics.add.staticGroup();

    // Create the ground platform covering the bottom of the canvas
    var ground = platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    ground.setSize(800, 64).setOffset(0, 32); // Set the width to match the canvas width and the height to 64 pixels, and offset it vertically

    // Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(25, 425, 'ground');
    platforms.create(800, 220, 'ground');
    platforms.create(300, 145, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100,  450, 'dude');

    // Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setSize(76, 96);

    this.physics.add.collider(player, platforms);

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    restartText = this.add.text(250, 250, '', { fontSize: '24px', fill: '#fff' });
    this.input.keyboard.on('keydown', function(event) {
        if (event.key === 'r') {
            if (gameOver) {
                this.scene.restart();
                gameOver = false;
                score = 0;
                scoreText.setText('Score: 0');
            }
        }
    }, this);

    //spikes
    spikes = this.physics.add.group();

    // Create spikes at the top of the canvas
    var spike1 = spikes.create(400, 0, 'spike').setOrigin(0.5, 0); // Set origin to top-center
    var spike2 = spikes.create(200, 0, 'spike').setOrigin(0.5, 0); // Set origin to top-center

    spike1.body.gravity.y = 0;
    spike2.body.gravity.y = 0;

    this.physics.add.collider(player, spikes, hitSpike, null, this);

    // Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Give each star a slightly different bounce
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        child.body.gravity.y = Phaser.Math.FloatBetween(100, 300); // Set custom gravity for each star
    });

    bombs = this.physics.add.group();

    // Blue bubble group
    blueBubbles = this.physics.add.group();blueBubbles = this.physics.add.group(); // Create blue bubble group

// Create blue bubbles at random positions
for (var i = 0; i < 5; i++) {
    var x = Phaser.Math.Between(0, 800);
    var y = Phaser.Math.Between(0, 600);
    var blueBubble = blueBubbles.create(x, y, 'bluebubble');
}

// Overlap with blue bubbles
this.physics.add.overlap(bombs, blueBubbles, hitBlueBubble, null, this);
    // The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    // Collide the player and the stars with the platforms
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    // Checks to see if the player overlaps with any of the stars if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    // Overlap with blue bubbles
    this.physics.add.overlap(bombs, blueBubbles, hitBlueBubble, null, this);
}

function update ()
{
    if (Phaser.Input.Keyboard.JustDown(spaceBar) && player.body.touching.down)
    {
        console.log("Spacebar is down:", spaceBar.isDown);
        console.log("Player is touching ground:", player.body.touching.down);
        console.log("Jumping...");

        player.setVelocityY(-330); // Set vertical velocity to make the player jump
    }

    if (gameOver) {
        restartText.setText('Game Over: Press \'r\' to restart');
        if (cursors && cursors.r && cursors.r.isDown) { // Check if cursors and cursors.r are defined before accessing its properties
            this.scene.restart();
            gameOver = false;
            score = 0;
            scoreText.setText('Score: 0');
        }
        return;
    }

    if (cursors && cursors.left && cursors.left.isDown) { // Check if cursors and cursors.left are defined before accessing its properties
        player.setVelocityX(-160);
    } else if (cursors && cursors.right && cursors.right.isDown) { // Check if cursors and cursors.right are defined before accessing its properties
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    console.log("Player is touching ground:", player.body.touching.down);
}

function collectStar(player, star) {
    console.log("Collecting star...");

    star.disableBody(true, true);

    // Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0) {
        console.log("All stars collected, spawning new batch...");

        // Call a function to spawn blue bubbles
        spawnBlueBubbles();

        // Reset stars
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        // Spawn bombs
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-100, 100), 10);
        bomb.allowGravity = false;
    }
}

function spawnBlueBubbles() {
    // Only spawn blue bubbles after the first bomb is created
    if (bombs.countActive(true) > 0) {
        // Create blue bubbles at random positions
        for (var i = 0; i < 5; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            var blueBubble = blueBubbles.create(x, y, 'bluebubble');
            
            // Set physics properties for bouncing
            blueBubble.setBounce(1);
            blueBubble.setCollideWorldBounds(true);
            blueBubble.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
            blueBubble.allowGravity = false;
        }
    }
}

function hitBomb (player, bomb)
{
    console.log("Hit bomb!");

    this.physics.pause();

    player.setTint(0xff0000);

    gameOver = true;
}

function hitSpike(player, spike) {
    console.log("Hit spike!");
    // Deduct points from the score
    score -= 10; // Deducting 10 points, adjust as needed
    // Update the score text
    scoreText.setText('Score: ' + score);
    // Add any other actions you want to happen when the player hits a spike
}

function hitBlueBubble(bomb, blueBubble) {
    console.log("Hit blue bubble!");
    // Destroy both bomb and blue bubble
    bomb.destroy();
    blueBubble.destroy();
}