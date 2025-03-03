document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('gameContainer');
  const errorContainer = document.getElementById('sub-frame-error');

  fetch('/game/index.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      container.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading index.html:', error);
      errorContainer.innerHTML = `Error loading game: ${error.message}`;
    });
});