const board = (() => {
    const container = document.querySelector("#main-cont");
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



const Player = (name, mark) => {
    const playerMark = mark
    return { name, playerMark };
}







const gameLogic = (() => {
    let currentPlayer;
    const userName = document.querySelector("#userName")
    const form = document.querySelector("#myForm");
    const markX = document.querySelector("#markX");
    const markO = document.querySelector("#markO");
    let userMark = "";
    let pcMark = "";

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let nameValue = "";
        if (userName.value == "") {
            alert("Please Enter A Name");
        }
        else {
            nameValue = userName.value;
            const userPlayer = Player(nameValue, userMark);
            const pcPlayer = Player("Computer", pcMark);

            if (markX.checked) {
                userMark = "X"
                pcMark = "O"
                form.style.display = "none";
                board.gameCont.style.display = "grid"
                return userMark;
            }
            else if (markO.checked) {
                userMark = "O";
                pcMark = "X";
                form.style.display = "none";
                board.gameCont.style.display = "grid"
                return userMark;
            }
            else {
                alert("Please Select A Mark");
            }
        }

    })


    const marks = document.querySelectorAll(".marks");
    const cells = document.querySelectorAll(".cells");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
            if (marks[i].textContent == "X" | marks[i].textContent == "O") {
                alert("space taken!")
            }
            else {
                marks[i].textContent = userMark;
                marks[i].style.display = "unset";
                cells[i].style.backgroundColor = "lightgrey";
            }
        })
    }
})();





