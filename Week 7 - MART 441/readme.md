I used chatGPT for help on the following:

    //  Hide initial Text - I used ChatGPT here. 
    var hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(function(element) {
        element.classList.remove('hidden');
    });

    I also attempted to use it to not allow the same random number to be picked twice consecutively, but that was causing the images and the text to not correlate. I tried to fix that and ended up just removing the small segment of code. It was:

      myViewFinderArray.splice(randomNumber, 1);

      I debugged and tried a few things and never did figure it out. 