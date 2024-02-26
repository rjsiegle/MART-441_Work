// create an array of image names that correspond to the image tags
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];
// create a variable with the blank image name
var blankImagePath = "images/back.jpg";
// create an empty array for the actual images
var actualImages = [];

document.addEventListener("DOMContentLoaded", function() {
    // Call the printBlanks function when the DOM is fully loaded
    printBlanks();

    document.querySelector('.divTableBody').addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            var index = imageTags.indexOf(event.target.id);
            if (index !== -1) {
                flipImage(index);
                incrementAttempts();
            }
        }
    });
});

function printBlanks() {
    // call our random image creation function
    createRandomImageArray();
    // create a for loop
    imageTags.forEach(function(tag) {
        // iterate through the image tag ids and sets the source 
        document.getElementById(tag).src = blankImagePath;
    });
}

function createRandomImageArray() {
    var actualImagePath = ["images/banana.jpg", "images/cherry.jpg", "images/apple.jpg", "images/orange.jpg", "images/papaya.jpg", "images/raspberry.jpg"];
    var count = [0, 0, 0, 0, 0, 0]; // Create an array to track counts for each image
    while (actualImages.length < 12) {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);
        if (count[randomNumber] < 2) {
            actualImages.push(actualImagePath[randomNumber]);
            count[randomNumber]++;
        }
    }
}

var flippedCards = []; // Keep track of flipped cards
var totalMatches = 0; // Track the total number of matches

function flipImage(number) {
    var clickedImage = document.getElementById(imageTags[number]);

    // Check if the clicked card is already flipped or if it's a matched card
    if (!flippedCards.includes(number) && clickedImage.style.visibility !== "hidden") {
        clickedImage.src = actualImages[number]; // Show the image
        flippedCards.push(number); // Add the card to the flippedCards array

        // Check if two cards are flipped
        if (flippedCards.length === 2) {
            var firstCardIndex = flippedCards[0];
            var secondCardIndex = flippedCards[1];

            // Check if the two flipped cards match
            if (actualImages[firstCardIndex] === actualImages[secondCardIndex]) {
                // Match found, remove the matched images
                setTimeout(function () {
                    removeImage(firstCardIndex);
                    removeImage(secondCardIndex);
                    flippedCards = []; // Clear flippedCards array
                    totalMatches += 2; // Increment totalMatches

                    // Check if all matches are completed
                    if (totalMatches === imageTags.length) {
                        // Redirect to final.html
                        window.location.href = "final.html";
                    }
                }, 1000); // Adjust the delay time as needed
            } else {
                // No match, flip cards back after a short delay
                setTimeout(function () {
                    flipBack(firstCardIndex);
                    flipBack(secondCardIndex);
                    flippedCards = []; // Clear flippedCards array
                }, 1000); // Adjust the delay time as needed
            }
        }
    }
}


function removeImage(index) {
    var card = document.getElementById(imageTags[index]);
    card.parentNode.removeChild(card); // Remove the matched image from the DOM
}

function flipBack(index) {
    var card = document.getElementById(imageTags[index]);
    card.src = blankImagePath; // Flip the card back
}

function incrementAttempts() {
    var playerDataJSON = sessionStorage.getItem("playerData");
    var playerData = JSON.parse(playerDataJSON);
    playerData.attempts = (playerData.attempts || 0) + 1;
    sessionStorage.setItem("playerData", JSON.stringify(playerData));
}
