const moves = {
  stone: { label: "Stone", icon: "✊" },
  paper: { label: "Paper", icon: "✋" },
  scissors: { label: "Scissors", icon: "✌️" },
};

const beats = {
  stone: "scissors",
  paper: "stone",
  scissors: "paper",
};

const playerScoreElement = document.querySelector("#player-score");
const aiScoreElement = document.querySelector("#ai-score");
const playerChoiceElement = document.querySelector("#player-choice");
const aiChoiceElement = document.querySelector("#ai-choice");
const resultElement = document.querySelector("#result");
const detailElement = document.querySelector("#result-detail");
const moveButtons = document.querySelectorAll(".move-button");
const resetButton = document.querySelector("#reset-button");

let playerScore = 0;
let aiScore = 0;
let gameOver = false;

function randomMove() {
  const moveNames = Object.keys(moves);
  return moveNames[Math.floor(Math.random() * moveNames.length)];
}

function updateChoice(element, move, label) {
  element.textContent = move ? moves[move].icon : "?";
  element.setAttribute("aria-label", move ? `${label}: ${moves[move].label}` : label);
}

function playRound(playerMove) {
  if (gameOver) return;

  const aiMove = randomMove();
  updateChoice(playerChoiceElement, playerMove, "Your move");
  updateChoice(aiChoiceElement, aiMove, "AI move");
  playerChoiceElement.classList.remove("is-winner");
  aiChoiceElement.classList.remove("is-winner");

  if (playerMove === aiMove) {
    resultElement.textContent = "It's a tie!";
    detailElement.textContent = `Both chose ${moves[playerMove].label}.`;
  } else if (beats[playerMove] === aiMove) {
    playerScore += 1;
    playerChoiceElement.classList.add("is-winner");
    resultElement.textContent = "You win the round!";
    detailElement.textContent = `${moves[playerMove].label} beats ${moves[aiMove].label}.`;
  } else {
    aiScore += 1;
    aiChoiceElement.classList.add("is-winner");
    resultElement.textContent = "The AI wins the round!";
    detailElement.textContent = `${moves[aiMove].label} beats ${moves[playerMove].label}.`;
  }

  playerScoreElement.textContent = playerScore;
  aiScoreElement.textContent = aiScore;

  if (playerScore === 5 || aiScore === 5) {
    gameOver = true;
    const winner = playerScore === 5 ? "You win the game!" : "The AI wins the game!";
    resultElement.textContent = winner;
    detailElement.textContent = "Reset the game to play again.";
    moveButtons.forEach((button) => {
      button.disabled = true;
    });
  }
}

function resetGame() {
  playerScore = 0;
  aiScore = 0;
  gameOver = false;
  playerScoreElement.textContent = "0";
  aiScoreElement.textContent = "0";
  updateChoice(playerChoiceElement, null, "No move selected");
  updateChoice(aiChoiceElement, null, "Waiting for your move");
  playerChoiceElement.classList.remove("is-winner");
  aiChoiceElement.classList.remove("is-winner");
  resultElement.textContent = "Make your move!";
  detailElement.textContent = "The first to reach 5 points wins.";
  moveButtons.forEach((button) => {
    button.disabled = false;
  });
}

moveButtons.forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.move));
});

resetButton.addEventListener("click", resetGame);
