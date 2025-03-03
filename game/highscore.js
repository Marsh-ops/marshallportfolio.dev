// Function to load highscores from localStorage
function loadHighscores() {
    let scores = JSON.parse(localStorage.getItem("highscores")) || [];
    return scores;
}

// Function to save highscores to localStorage
function saveHighscores(scores) {
    localStorage.setItem("highscores", JSON.stringify(scores));
}

// Function to add a new highscore
function addHighscore(playerName, score) {
    let scores = loadHighscores();

    // Check if the player already has a highscore
    let existingEntry = scores.find(entry => entry.name === playerName);
    
    if (existingEntry) {
        // Update only if the new score is higher
        if (score > existingEntry.score) {
            existingEntry.score = score;
        }
    } else {
        // Add new player entry
        scores.push({ name: playerName, score });
    }

    // Sort scores in descending order & keep only the top 10
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);

    // Save updated highscores
    saveHighscores(scores);

    // Refresh the display
    displayHighscores();
}

// Function to display highscores
function displayHighscores() {
    let scores = loadHighscores();
    let highscoreList = document.getElementById("highscore-list");
    highscoreList.innerHTML = ""; // Clear existing list

    scores.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = `${entry.name}: ${entry.score}`;
        highscoreList.appendChild(li);
    });
}

// Example: Call this when the game ends
function onGameEnd(playerName, finalScore) {
    addHighscore(playerName, finalScore);
}

// Load highscores when the page loads
window.onload = displayHighscores;
