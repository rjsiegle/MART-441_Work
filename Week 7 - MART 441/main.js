// let's create an empty array. We will add to this later
var myViewFinderArray = [];

// this is the main ViewFinder class
class ViewFinder {
    constructor(title, imagePath, description, artist, imageYear) {
        this.title = title;
        this.imagePath = imagePath;
        this.description = description;
        this.artist = artist; // Ensure 'artist' parameter is used
        this.imageYear = imageYear;
    }

    toString() {
        return "Title: " + this.title;
    }

    getDescription() {
        return "Description: " + this.description;
    }

    getAuthor() {
        return "Artist: " + this.artist;
    }

    getImageYear() {
        return "Image Year: " + this.imageYear;
    }
}

for (var i = 0; i < myViewFinderArray.length; i++) {
    document.getElementById("image" + (i + 1)).setAttribute("data-index", i);
}
// this function is called in the body of the HTML page so that the objects are created and added to the array myViewFinderArray
function initializeArray() {
    var myViewFinder1 = new ViewFinder("The Green Line", "./images/thegreenline.webp", "Political Art", "Francis Alÿs", "2004");
    var myViewFinder2 = new ViewFinder("A Blank Slate: Hope for a New America", "./images/blankslate.jpeg", "Bronze Sculpture", "Kwame Akoto-Bamfo", "2022");
    var myViewFinder3 = new ViewFinder("Stop Telling Women to Smile", "./images/smile.jpeg", "Interdisciplinary", "Tatyana Fazializadeh", "2019");
    var myViewFinder4 = new ViewFinder("Outcry", "./images/Outcry.png", "Painting", "Curbie Toles", "2023") ;
    var myViewFinder5 = new ViewFinder("A Tribute to Breonna Taylor", "./images/breonnataylor.jpeg", "Mural", "Face Me Por Favor", "2020");
    var myViewFinder6 = new ViewFinder("MMIW Mural", "./images/nsrgnts_mural.png", "Mural", "Votan Ik - NSRGNT", "2020");
    var myViewFinder7 = new ViewFinder("Sun Mad", "./images/SunMad.jpeg", "Screenprint", "Ester Hernandez", "1982");
    var myViewFinder8 = new ViewFinder("The Coffee Pickers", "./images/thecoffeepickers.jpeg", "Painting", "Janine Aberg", "2016");
    var myViewFinder9 = new ViewFinder("afro.died, T", "./images/rozeal.jpeg", "Mixed Media", "Rozeal", "2011");
    
    myViewFinderArray.push(myViewFinder1);
    myViewFinderArray.push(myViewFinder2);
    myViewFinderArray.push(myViewFinder3);
    myViewFinderArray.push(myViewFinder4);
    myViewFinderArray.push(myViewFinder5);
    myViewFinderArray.push(myViewFinder6);
    myViewFinderArray.push(myViewFinder7);
    myViewFinderArray.push(myViewFinder8);
    myViewFinderArray.push(myViewFinder9);
}

function accessInformation() {
    // Check if all images have been displayed
    if (myViewFinderArray.length === 0) {
        // If all images have been shown, reset the array
        initializeArray();
    }

    // Get a random number within the current array length
    var randomNumber = Math.floor(Math.random() * myViewFinderArray.length);
    // Get a random object from the array
    var randomObject = myViewFinderArray[randomNumber];


    // Set the title, description, artist, and image year
    var titleElement = document.getElementById("title");
    var descriptionElement = document.getElementById("description");
    var artistElement = document.getElementById("artist"); // Get artist element
    var yearElement = document.getElementById("year");

    titleElement.innerHTML = randomObject.toString();
    descriptionElement.innerHTML = randomObject.getDescription();
    artistElement.innerHTML = randomObject.getAuthor(); // Update artist
    yearElement.innerHTML = randomObject.getImageYear();

    // Display the corresponding image
    var imageIndex = randomNumber + 1; // Adjust index for image elements
    var imageId = "image" + imageIndex;
    document.getElementById(imageId).style.display = "block";

    // Hide other images
    for (var i = 1; i <= 9; i++) {
        if (i !== imageIndex) {
            document.getElementById("image" + i).style.display = "none";
        }
    }

    var hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(function(element) {
        element.classList.remove('hidden');
    });
}

