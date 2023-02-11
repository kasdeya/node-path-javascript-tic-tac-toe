const boardContainer = document.getElementById("gameBoard");
const restartButton = document.getElementById("restartBtn")
const gameStatus = document.getElementById("status")

const WINCON = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Gameboard = {
  board: ["", "", "", "", "", "", "", "", ""],
  renderBoard: () => {
    for (let index = 0; index < Gameboard.board.length; index++) {
      let space = document.createElement("div");
      space.textContent = Gameboard.board[index];
      space.setAttribute("id", `${index}`);
      space.setAttribute("class", "squares");
      space.addEventListener("click", (e) => {
        GameFlow.placeMarker(e);
      });
      boardContainer.appendChild(space);
    }
  },
};

function Player(name, marker) {
  (this.name = name), (this.marker = marker);
}

let playerName = prompt("What is your name?");
const playerOne = new Player(playerName, "X");
const playerTwo = new Player("AI", "O");
let currentPlayer = playerOne;
let isGameOver = false;
let randomArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let randomNum = [];
// console.log(randomArray.length);

const GameFlow = {
  placeMarker: (e) => {
    if (isGameOver) return;
    if (Gameboard.board[e.target.id] === "") {
      randomArray.splice(randomArray.indexOf(e.target.id), 1);
      if (currentPlayer === playerOne) {
        Gameboard.board[e.target.id] = playerOne.marker;
        e.target.textContent = Gameboard.board[e.target.id];
        // console.log(e.target.id);
        GameFlow.checkWin();
        if (playerTwo.name === "AI" && !isGameOver) {
          setTimeout(() => {
            randIndex = Math.floor(Math.random() * randomArray.length);
            randomNum[0] = randomArray[randIndex];
            Gameboard.board[randomNum[0]] = playerTwo.marker;
            document.getElementById(`${randomNum[0]}`).textContent =
              Gameboard.board[randomNum[0]];
            randomArray.splice(randIndex, 1);
            // console.log(randomArray);
            GameFlow.checkWin();
          }, 200);
        } else {
          currentPlayer = playerTwo;
        }
      } else {
        Gameboard.board[e.target.id] = playerTwo.marker;
        e.target.textContent = Gameboard.board[e.target.id];
        currentPlayer = playerOne;
        GameFlow.checkWin();
      }
    } else {
      // console.log("space taken");
      gameStatus.textContent = "Space Taken"
    }
  },
  checkWin: () => {
    for (let index = 0; index < WINCON.length; index++) {
      let values = [];
      values.push(Gameboard.board[WINCON[index][0]]);
      values.push(Gameboard.board[WINCON[index][1]]);
      values.push(Gameboard.board[WINCON[index][2]]);
      if (values.every((v) => v === "X")) {
        a = WINCON[index][0].toString();
        b = WINCON[index][1].toString();
        c = WINCON[index][2].toString();
        winningTileOne = document.getElementById(a);
        winningTileTwo = document.getElementById(b);
        winningTileThree = document.getElementById(c);
        winningTileOne.style.backgroundColor = "lightgreen";
        winningTileTwo.style.backgroundColor = "lightgreen";
        winningTileThree.style.backgroundColor = "lightgreen";
        // console.log("game over");
        gameStatus.textContent = "Game Over";
        isGameOver = true;
        return;
      } else if (values.every((v) => v === "O")) {
        a = WINCON[index][0].toString();
        b = WINCON[index][1].toString();
        c = WINCON[index][2].toString();
        winningTileOne = document.getElementById(a);
        winningTileTwo = document.getElementById(b);
        winningTileThree = document.getElementById(c);
        winningTileOne.style.backgroundColor = "lightgreen";
        winningTileTwo.style.backgroundColor = "lightgreen";
        winningTileThree.style.backgroundColor = "lightgreen";
        // console.log("game over");
        gameStatus.textContent = "Game Over";
        isGameOver = true;
        return;
      }
    }
    if (randomArray.length === 0) {
      isGameOver = true;
    }
  },
  restart: () => {
    Gameboard.board = ["", "", "", "", "", "", "", "", ""]
    randomArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    isGameOver = false;
    let squares = document.getElementsByClassName("squares")
    for (let index = 0; index < squares.length; index++) {
      squares[index].innerHTML = ""
      squares[index].setAttribute("style", "")
    }
    currentPlayer = playerOne
  }
};

restartButton.addEventListener('click', GameFlow.restart)
Gameboard.renderBoard();
// console.log(playerOne);
