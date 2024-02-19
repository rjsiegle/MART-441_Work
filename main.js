// create an array of image names that correspond to the image tags
var imageTags = ["image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"];
// create a variable with the blank image name
var blankImagePath = "images/back.jpg";
// create a empty array for the actual images
var actualImages = new Array();
    
function printBlanks()
{
   // call our random image creation function
    createRandomImageArray();
    // create a for loop
    for(var i = 0; i < imageTags.length; i++)
    {
    // iterate through the image tag ids and sets the source 
        document.getElementById(imageTags[i]).src= blankImagePath;
    }
       
    
    
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
                setTimeout(function() {
                    removeImage(firstCardIndex);
                    removeImage(secondCardIndex);
                    flippedCards = []; // Clear flippedCards array
                    totalMatches += 2; // Increment totalMatches
                    checkGameStatus(); // Check if all matches are made
                }, 1000); // Adjust the delay time as needed
            } else {
                // No match, flip cards back after a short delay
                setTimeout(function() {
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

function checkGameStatus() {
    if (totalMatches === 12) { // Assuming there are 12 cards in total
        alert("You've matched everything, nice work!"); // Display message
        resetGame(); // Start over once done
    }
}

function resetGame() {
    // Reload the page to start over
    location.reload();
}

