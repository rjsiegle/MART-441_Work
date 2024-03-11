$(document).ready(function() {
    var images = $('.image-container img');
    var index = 0;
    var container = $('.container');
    var allCaves = []; // Initialize an empty array to hold CaveInfo objects

    // CaveInfo class definition
    class CaveInfo {
        constructor(selector, ...imagePaths) {
            this.selector = selector;
            this.imagePaths = imagePaths;
        }

        get theSelector() {
            return this.selector;
        }

        get theImagePaths() {
            return this.imagePaths;
        }

        toString() {
            return this.selector + ":" + this.imagePaths.join(", "); 
        }
    }

    // Function to initialize the array with CaveInfo objects
    function initializeArray() {
        var cave = new CaveInfo("#cave", "images/cave1.jpeg", "images/cave2.jpeg", "images/catacomb.jpeg", "images/water.jpeg", "images/tunnel.jpeg", "images/trees.jpeg");
        allCaves.push(cave);
    }

    initializeArray();

    
    function fadeImages() {
        images.eq(index).fadeOut(1000, function() {
            index = (index + 1) % images.length;
            images.eq(index).fadeIn(1000);
        });
        $('.shape').fadeOut(1000, function() {
            $(this).remove(); // Remove existing shapes
        });
    }

    function moveShapes() {
        var shape1 = $('<div class="shape"></div>').css({
            'background-color': getRandomColor(),
            'width': Math.random() * 50 + 10, // Random width between 10 and 60
            'height': Math.random() * 50 + 10, // Random height between 10 and 60
            'border-radius': Math.random() * 50 + '%', // Random border radius between 0% and 50%
            'transform': 'rotate(' + Math.random() * 360 + 'deg)' // Random rotation between 0deg and 360deg
        });
        var shape2 = $('<div class="shape"></div>').css({
            'background-color': getRandomColor(),
            'width': Math.random() * 50 + 10,
            'height': Math.random() * 50 + 10,
            'border-radius': Math.random() * 50 + '%',
            'transform': 'rotate(' + Math.random() * 360 + 'deg)'
        });
        container.append(shape1);
        container.append(shape2);

        $('.shape').each(function() {
            var newX = Math.random() * 280; // 280 is the container width - shape width
            var newY = Math.random() * 230; // 230 is the container height - shape height
            $(this).css({ left: newX, top: newY });
        });

        setTimeout(function() {
            fadeImages();
        }, 2000); // Move shapes for 2 seconds and then fade images
    }

    setInterval(moveShapes, 7000); // Move shapes every 7 seconds

    $('#changeButton').click(function() {
        moveShapes();
        
        // Remove existing paragraphs and generate new ones
        $('.stuff, #third').remove(); // Remove existing paragraphs
        generateNewParagraphs(); // Generate new paragraphs
    });

    function generateNewParagraphs() {
        var newParagraph1 = $('<p class="stuff">').text(getRandomText()).hide();
        var newParagraph2 = $('<p class="stuff">').hide(); // Hide this paragraph initially
        var newParagraph3 = $('<p id="third">').hide(); // Hide this paragraph initially
        
        container.after(newParagraph1, newParagraph2, newParagraph3);
        
        // Fade in only the first paragraph
        newParagraph1.fadeIn(1000);
    }

    function getRandomText() {
        var texts = [
            "Life can only be understood backwards; but it must be lived forwards.",
            "Whoever fights monsters should see to it that in the process he does not become a monster. And if you gaze long enough into an abyss, the abyss will gaze back into you.",
            "All journeys have secret destinations of which the traveler is unaware.",
            "Each person is an enigma. You're a puzzle not only to yourself but also everyone else, and the great mystery of our time is how we penetrate this puzzle.",
            "If you are lonely when you're alone, you are in bad company."
        ];
        return texts[Math.floor(Math.random() * texts.length)];
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});