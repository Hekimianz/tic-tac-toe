const boardElems = document.querySelectorAll(".board--sq");

const gameboard = (() => ({
  board: Array(9).fill(""), // Array to track board state, initially empty
}))();

// Example of interacting with a square's DOM element and state:
boardElems.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    if (!gameboard.board[index]) {
      gameboard.board[index] = "X"; // Update board state
      elem.textContent = "X"; // Update UI
    }
  });
});

// display controller
const displayController = (() => ({
  renderBoard: gameboard.board,
}))();
