const boardElems = document.querySelectorAll(".board--sq");
const board = document.querySelector(".board");
let currentPlayer;
let player1Name;
let player2Name;
let player1;
let player2;
let winner;

// start game logic
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (player1Name && player2Name) {
    e.target.reset();
    e.target.parentNode.style.display = "none";
    player1 = Player(player1Name, "x");
    player2 = Player(player2Name, "o");
    currentPlayer = player1;
    board.style.display = "grid";
  }
});
// update player names
document.querySelectorAll("input").forEach((elem) =>
  elem.addEventListener("input", () => {
    if (elem.id.includes("1")) {
      player1Name = elem.value;
    } else {
      player2Name = elem.value;
    }
  })
);

// restart game
document.querySelector("button").addEventListener("click", () => {
  gameboard.reset();
});

// Create gameboard
const gameboard = (() => ({
  board: Array(9).fill(""),
  checkForWin: function (player) {
    const b = this.board;

    return (
      (b[0] === player && b[1] === player && b[2] === player) || // Row 1
      (b[3] === player && b[4] === player && b[5] === player) || // Row 2
      (b[6] === player && b[7] === player && b[8] === player) || // Row 3
      (b[0] === player && b[3] === player && b[6] === player) || // Column 1
      (b[1] === player && b[4] === player && b[7] === player) || // Column 2
      (b[2] === player && b[5] === player && b[8] === player) || // Column 3
      (b[0] === player && b[4] === player && b[8] === player) || // Diagonal 1
      (b[2] === player && b[4] === player && b[6] === player) // Diagonal 2
    );
  },
  checkForWinner: function () {
    if (this.checkForWin("X")) {
      winner = player1;
      return true;
    } else if (this.checkForWin("O")) {
      winner = player2;
      return true;
    } else if (this.board.every((cell) => cell !== "")) {
      return true;
    }
  },

  reset: function () {
    this.board.forEach((item, index) => {
      this.board[index] = "";
    });
    boardElems.forEach((elem) => {
      elem.innerHTML = "";
      elem.style.color = "#f5f4f69f";
      elem.style.cursor = "pointer";
    });
    winner = "";
    currentPlayer = player1;
    document.querySelector(".overlay").style.display = "none";
  },
}))();

// Player factory
const Player = (name, marker) => {
  return { name, marker };
};

// place marker logic
boardElems.forEach((elem, index) => {
  elem.addEventListener("mouseenter", () => {
    if (!gameboard.board[index]) {
      elem.innerHTML = currentPlayer.marker;
    }
  });

  elem.addEventListener("mouseleave", () => {
    if (!gameboard.board[index]) {
      elem.innerHTML = "";
    }
  });

  elem.addEventListener("click", () => {
    if (!gameboard.board[index]) {
      elem.style.cursor = "not-allowed";
      gameboard.board[index] = currentPlayer.marker.toUpperCase();
      elem.innerHTML = currentPlayer.marker.toUpperCase();
      elem.style.color = "#fdbf12";
      currentPlayer === player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
      if (gameboard.checkForWinner()) {
        document.querySelector(".overlay").style.display = "flex";
        document.querySelector("p").innerText = winner
          ? `${winner.name} Wins!`
          : "Tie game!";
      }
    }
  });
});
