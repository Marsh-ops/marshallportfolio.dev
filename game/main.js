document.addEventListener("DOMContentLoaded", () => {
  const mainMenu = document.querySelector(".main-menu");
  const clickableArea = document.querySelector(".clickable-area");

  if (!clickableArea) {
    console.error("clickableArea not found in the DOM.");
    return; // Exit if the element isn't found
  }

  const message = document.querySelector(".clickable-area .message");
  const endScreen = document.querySelector(".end-screen");
  const reactionTimeText = document.querySelector(
    ".end-screen .reaction-time-text"
  );
  const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

  let timer;
  let greenDisplayed;
  let timeNow;
  let waitingForStart;
  let waitingForGreen;

  const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
  };

  init();

  const setGreenColor = () => {
    clickableArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Click Now!";
    message.style.color = "#111";
    greenDisplayed = true;
    timeNow = Date.now();
  };

  const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "#fff";

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;
    waitingForGreen = true;
  };

  mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
  });

  clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
      let clickTime = Date.now();
      let reactionTime = clickTime - timeNow;
      displayReactionTime(reactionTime);
      return;
    }

    if (waitingForStart) {
      startGame();
      return;
    }

    if (waitingForGreen) {
      displayTooSoon();
    }
  });

  const endGame = (finalScore) => {
    endScreen.classList.add("active");
    clearTimeout(timer);
    reactionTimeText.innerHTML = `${finalScore} ms`;
  };

  const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>`;
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;

    endGame(rt); // End the game immediately after the first round
  };

  const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to restart.";
    message.style.color = "#111";
    waitingForStart = true;
    waitingForGreen = false;
    clearTimeout(timer);
  };

  playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    init();
    startGame();
  });
});
