const container = document.querySelector("#main-cont");

const board = (() => {
    // creates board
    const Gameboard = {};
    Gameboard.gameboard = Array(9);
    for (let i = 0; i <= 8; i++) {
        Gameboard.gameboard[i] = `${i + 1}`;
    };



    const gameCont = document.querySelector("#board-cont");
    gameCont.style.display = "none"


    for (num in Gameboard.gameboard) {
        const cell = document.createElement("div");
        const mark = document.createElement("span");
        mark.classList.add("marks");
        cell.appendChild(mark);
        cell.classList.add("cells");
        gameCont.append(cell);
    };




    return { Gameboard, gameCont };
})();


// creates players
const Player = (name, mark) => {
    const playerMark = mark
    return { name, playerMark };
}




// creates game logic
// creates game turns logic
let pcMark;
let userMark;
let currentPlayer;
let pcPlayer;
let userPlayer;
let winner;
const gameLogic = (() => {

    const userName = document.querySelector("#userName")
    const form = document.querySelector("#myForm");
    const markX = document.querySelector("#markX");
    const markO = document.querySelector("#markO");
    // reset button
    const reset = document.createElement("button");
    reset.textContent = "RESET";
    container.append(reset);
    reset.id = "resetBtn";
    reset.style.display = "none";
    // change mark button
    const markBtn = document.createElement("button");
    markBtn.textContent = "Change Mark";
    container.append(markBtn);
    markBtn.style.display = "none";



    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let nameValue = "";
        if (userName.value == "") {
            alert("Please Enter A Name");
        }
        else {
            nameValue = userName.value;
            userPlayer = Player(nameValue, userMark);
            pcPlayer = Player("Computer", pcMark);
            if (markX.checked) {
                userMark = "X"
                pcMark = "O"
                userPlayer.playerMark = "X";
                pcPlayer.playerMark = "O";
                form.style.display = "none";
                board.gameCont.style.display = "grid"
                reset.style.display = "unset";
                markBtn.style.display = "unset";
                currentPlayer = userPlayer;
                return { userMark, pcMark }
            }
            else if (markO.checked) {
                userMark = "O";
                pcMark = "X";
                userPlayer.playerMark = "O";
                pcPlayer.playerMark = "X";
                form.style.display = "none";
                board.gameCont.style.display = "grid"
                reset.style.display = "unset";
                markBtn.style.display = "unset";
                currentPlayer = pcPlayer;
                return { userMark, pcMark }


            }
            else {
                alert("Please Select A Mark");
            }
        }

    })

    // functions for diplay winner/tie

    let DisplayTie = {
        displayTie() {
            const winCard = document.createElement("div");
            const cardHead = document.createElement("h2");
            cardHead.textContent = "TIE!!"
            cardHead.style.textAlign = "center";
            winCard.style.backgroundColor = "#76624F";
            winCard.append(cardHead);
            container.append(winCard);
        }
    }

    let DisplayWinner = {
        displayWinner() {

            const winCard = document.createElement("div");
            const cardHead = document.createElement("h2");
            winCard.id = "winCard";
            cardHead.textContent = `${winner} wins!!`
            cardHead.style.textAlign = "center";
            winCard.style.backgroundColor = "orange";
            winCard.append(cardHead);
            container.append(winCard);

        }
    }

    // functions for win conditions
    // checks for horizontal win 
    let win = false;
    let round = 0;

    const winConditions = { w1: ["X", "X", "X"], w2: ["O", "O", "O"] };
    function checkHorizWin() {

        if (board.Gameboard.gameboard.slice(0, 3).every(r => winConditions.w1.includes(r)) | board.Gameboard.gameboard.slice(3, 6).every(r => winConditions.w1.includes(r)) |
            board.Gameboard.gameboard.slice(6, 9).every(r => winConditions.w1.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "X") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "O") {
                winner = "O"
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();
        }
        else if (board.Gameboard.gameboard.slice(0, 3).every(r => winConditions.w2.includes(r)) | board.Gameboard.gameboard.slice(3, 6).every(r => winConditions.w2.includes(r)) |
            board.Gameboard.gameboard.slice(6, 9).every(r => winConditions.w2.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "O") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "X") {
                winner = "O";
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();

        }

    }

    // check for vertical win
    function checkVertWin() {
        const boardCols = {
            c1: [board.Gameboard.gameboard[0], board.Gameboard.gameboard[3], board.Gameboard.gameboard[6]], c2: [board.Gameboard.gameboard[1],
            board.Gameboard.gameboard[4], board.Gameboard.gameboard[7]], c3: [board.Gameboard.gameboard[2], board.Gameboard.gameboard[5], board.Gameboard.gameboard[8]]
        };

        if (boardCols.c1.every(r => winConditions.w1.includes(r)) | boardCols.c2.every(r => winConditions.w1.includes(r)) | boardCols.c3.every(r => winConditions.w1.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "X") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "O") {
                winner = "O"
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();
        }
        else if (boardCols.c1.every(r => winConditions.w2.includes(r)) | boardCols.c2.every(r => winConditions.w2.includes(r)) | boardCols.c3.every(r => winConditions.w2.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "O") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "X") {
                winner = "O";
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();
        }
    }

    // check for diagonal win
    function checkDiagWin() {
        const boardDiag = {
            d1: [board.Gameboard.gameboard[0], board.Gameboard.gameboard[4], board.Gameboard.gameboard[8]], d2: [board.Gameboard.gameboard[2], board.Gameboard.gameboard[4], board.Gameboard.gameboard[6]]
        }
        if (boardDiag.d1.every(r => winConditions.w1.includes(r)) | boardDiag.d2.every(r => winConditions.w1.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "X") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "O") {
                winner = "O"
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();
        }
        else if (boardDiag.d1.every(r => winConditions.w2.includes(r)) | boardDiag.d2.every(r => winConditions.w2.includes(r))) {
            win = true;
            if (userPlayer.playerMark == "O") {
                winner = userPlayer.name;
            }
            else if (userPlayer.playerMark == "X") {
                winner = "O";
            }
            board.gameCont.style.display = "none"
            DisplayWinner.displayWinner();
        }

    }

    // adds marks to board and checks for win 
    const marks = document.querySelectorAll(".marks");
    const cells = document.querySelectorAll(".cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
            if (marks[i].textContent == userMark | marks[i].textContent == pcMark) {
                return;
            }
            else if (currentPlayer.playerMark == userMark) {
                marks[i].style.display = "unset";
                cells[i].style.backgroundColor = "lightgrey";
                marks[i].textContent = userMark;
                currentPlayer = pcPlayer;
                board.Gameboard.gameboard[i] = userMark;
                round = round + 1;
                checkHorizWin();
                checkVertWin();
                checkDiagWin();
                if (win == false & round == 9) {
                    board.gameCont.style.display = "none";
                    DisplayTie.displayTie();
                }

            }
            else if (currentPlayer.playerMark == pcMark) {
                marks[i].style.display = "unset";
                cells[i].style.backgroundColor = "lightgrey";
                marks[i].textContent = pcMark;
                currentPlayer = userPlayer;
                board.Gameboard.gameboard[i] = pcMark;
                checkHorizWin();
                checkVertWin();
                checkDiagWin();
                round = round + 1;
                if (win == false & round == 9) {
                    board.gameCont.style.display = "none";
                    DisplayTie.displayTie();
                }
            }
        })
    }

    reset.addEventListener("click", () => {
        board.Gameboard.gameboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        round = 0;
        for (let i = 0; i <= cells.length; i++) {
            marks[i].textContent = "";
            cells[i].style.backgroundColor = "white";
        }
    })

    markBtn.addEventListener("click", () => {
        board.Gameboard.gameboard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        round = 0;
        board.gameCont.style.display = "none";
        form.style.display = "unset";
        markBtn.style.display = "none";
        reset.style.display = "none";
        const winCard = document.querySelector("#winCard");
        winCard.remove();
        for (let i = 0; i <= cells.length; i++) {
            marks[i].textContent = "";
            cells[i].style.backgroundColor = "white";
        }
    })


})();





