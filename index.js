// AI plays as the dragon, and the human plays as the unicorn

// -- HTML elements --
const board = document.getElementById("board");
const cells = document.querySelectorAll("[data-cell]");
const currentStatus = document.getElementById("currentStatus");
const resetButton = document.getElementById("resetButton");
const gameEndOverlay = document.getElementById("gameEndOverlay");
const currentBeastStatusImg = document.getElementById("currentBeastImg");
const winningMessage = document.querySelector("[data-winning-message]");
const winningMessageText = document.querySelector("[data-winning-message] p");
const winningMessageImg = document.createElement("img");

// -- Game Variables --
let gameIsLive = true;

let unicornTurn = true;

const winner = null;

const AI_PLAYER = "dragon";

const AI_PLAYER_IMG = "dragon.png";

const HUMAN_PLAYER = "unicorn";

const HUMAN_PLAYER_IMG = "unicorn.png";

let currentPlayer = "";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// -- Functions --
const placeBeastImg = (cell, currentBeast) => {
  cell.classList.add(currentBeast);
};

const updateCurrentStatus = () => {
  if (currentPlayer === HUMAN_PLAYER) {
    currentBeastStatusImg.src = HUMAN_PLAYER_IMG;
    currentBeastStatusImg.alt = HUMAN_PLAYER;
  } else {
    currentBeastStatusImg.src = AI_PLAYER_IMG;
    currentBeastStatusImg.alt = AI_PLAYER;
  }
};

const checkWin = (currentBeast) => {
  return winningCombinations.some((combination) => {
    return combination.every((i) => {
      return cells[i].classList.contains(currentBeast);
    });
  });
};

const isDraw = () => {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(HUMAN_PLAYER) ||
      cell.classList.contains(AI_PLAYER)
    );
  });
};

const startGame = () => {
  cells.forEach((cell) => {
    winningMessageImg.remove();

    cell.classList.remove(HUMAN_PLAYER);

    cell.classList.remove(AI_PLAYER);

    cell.removeEventListener("click", handleCellClick);

    cell.addEventListener("click", handleCellClick, { once: true });
  });

  gameIsLive = true;

  currentPlayer = HUMAN_PLAYER;

  updateCurrentStatus();

  board.classList.add(HUMAN_PLAYER);

  gameEndOverlay.classList.remove("show");
};

const endGame = (draw, player) => {
  if (draw) {
    winningMessageText.innerText = `draw!`;

    // Img
    winningMessageImg.src = "";
    winningMessageImg.alt = "";
  }
  // AI won
  else if (player === AI_PLAYER) {
    winningMessageText.innerText = `you lose!`;

    // Img
    winningMessageImg.src = AI_PLAYER_IMG;
    winningMessageImg.alt = AI_PLAYER;
  }
  // Human won
  else {
    winningMessageText.innerText = `you win!`;

    // Img
    winningMessageImg.src = HUMAN_PLAYER_IMG;
    winningMessageImg.alt = HUMAN_PLAYER;
  }

  winningMessage.insertBefore(winningMessageImg, winningMessageText);

  gameEndOverlay.classList.add("show");
};

// -- Event Handler --
const handleCellClick = (e) => {
  const cell = e.target;

  if (
    cell.classList.contains(HUMAN_PLAYER) ||
    cell.classList.contains(AI_PLAYER) ||
    !gameIsLive
  ) {
    return;
  }

  placeBeastImg(cell, HUMAN_PLAYER);

  if (checkWin(HUMAN_PLAYER)) {
    // Little wait for the animation to finish
    setTimeout(() => {
      endGame(false);
    }, 500);

    return;
  }

  if (isDraw()) {
    // Little wait for the animation to finish
    setTimeout(() => {
      endGame(true);
    }, 500);

    return;
  }

  // AI's turn
  currentPlayer = AI_PLAYER;

  updateCurrentStatus();

  console.log("AI is thinking...");

  // Add a delay of 1 second before AI's turn
  setTimeout(() => {
    handleAITurn();
  }, 1000);
};

// -- Event Listener --
resetButton.addEventListener("click", startGame);

// -- AI --

function handleAITurn() {
  // AI's turn
  const bestMove = findBestMove();

  placeBeastImg(cells[bestMove], AI_PLAYER);

  // Check if AI won
  if (checkWin(AI_PLAYER)) {
    endGame(false, AI_PLAYER);

    return;
  }

  // Check if draw
  if (isDraw()) {
    endGame(true, AI_PLAYER);

    return;
  }

  currentPlayer = HUMAN_PLAYER;

  updateCurrentStatus();
}

function findBestMove() {
  let boardCopy = [...cells];

  let bestScore = -Infinity;

  let bestMove;

  for (let i = 0; i < boardCopy.length; i++) {
    if (
      !boardCopy[i].classList.contains(HUMAN_PLAYER) &&
      !boardCopy[i].classList.contains(AI_PLAYER)
    ) {
      boardCopy[i].classList.add(AI_PLAYER);

      let score = minimax(boardCopy, 0, false);

      boardCopy[i].classList.remove(AI_PLAYER);

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  let result = checkWinner();

  if (result !== null) {
    return result === AI_PLAYER ? 10 - depth : depth - 10;
  }

  if (isDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (let i = 0; i < cells.length; i++) {
      if (
        !cells[i].classList.contains(HUMAN_PLAYER) &&
        !cells[i].classList.contains(AI_PLAYER)
      ) {
        cells[i].classList.add(AI_PLAYER);
        let score = minimax(board, depth + 1, false);
        cells[i].classList.remove(AI_PLAYER);
        bestScore = Math.max(score, bestScore);
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < cells.length; i++) {
      if (
        !cells[i].classList.contains(HUMAN_PLAYER) &&
        !cells[i].classList.contains(AI_PLAYER)
      ) {
        cells[i].classList.add(HUMAN_PLAYER);
        let score = minimax(board, depth + 1, true);
        cells[i].classList.remove(HUMAN_PLAYER);
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner() {
  for (let combo of winningCombinations) {
    if (
      cells[combo[0]].classList.contains(AI_PLAYER) &&
      cells[combo[1]].classList.contains(AI_PLAYER) &&
      cells[combo[2]].classList.contains(AI_PLAYER)
    ) {
      return AI_PLAYER;
    }
    if (
      cells[combo[0]].classList.contains(HUMAN_PLAYER) &&
      cells[combo[1]].classList.contains(HUMAN_PLAYER) &&
      cells[combo[2]].classList.contains(HUMAN_PLAYER)
    ) {
      return HUMAN_PLAYER;
    }
  }

  return null;
}

// -- END AI --

// -- Start Game --
document.addEventListener("DOMContentLoaded", startGame);
