 document.getElementById("playerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    
    var playerFirstname = document.getElementById("playerFirstname").value;
    var playerLastname = document.getElementById("playerLastname").value;
    var playerAge = document.getElementById("playerAge").value;

    // Create player data object
    var playerData = {
        firstname: playerFirstname,
        lastname: playerLastname,
        age: playerAge
    };

    // Convert player data to JSON string
    var playerDataJSON = JSON.stringify(playerData);

    // Store player information in sessionStorage
    sessionStorage.setItem("playerData", playerDataJSON);

    // Redirect to the game page
    window.location.href = "game.html";
});