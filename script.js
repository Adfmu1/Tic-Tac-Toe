const gameboard = (() => {
    const gameboardTiles = document.getElementsByClassName("gameboard-tile");

    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].addEventListener("click", () => {
            if (gameController.getIsGameOn()) {
                if (gameboardTiles[i].textContent != "") {
                    alert("Choose empty tile");
                }
                else {
                    const turn = gameController.getTurn();
    
                    if (turn === "X") {
                        gameboardTiles[i].textContent = "X";
                    }
                    else if (turn === "O") {
                        gameboardTiles[i].textContent = "O";
                    }

                    if (!gameController.checkForWinner(gameboardTiles)) {
                        gameController.changeTurn();
                    
                    }
                }
            }
        })
    }

    function getAllTilesLen() {
        let allTiles = "";

        for (let i = 0; i < gameboardTiles.length; i++) {
            allTiles += gameboardTiles[i].textContent;
        }

        return allTiles.length;
    }

    function clearGameboard() {
        for (let i = 0; i < 9; i++) {
            gameboardTiles[i].textContent = "";
        }
    }

    return { clearGameboard, gameboardTiles, getAllTilesLen };
        
})();


const playerX = (() => {
    let name = "playerX";

    function getName() {
        return name;
    }

    return { 
        getName : getName
    };
})();


const playerO = (() => {
    let name = "playerO";

    function getName() {
        return name;
    }

    return { getName };
})();


const gameController = (() => {
    let isGameOn = false;
    let turn = "O";
    const gameResultScreen = document.querySelector("#game-result-screen")

    function startGame() {
        if (getIsGameOn()) {
            isGameOn = false;

            gameboard.clearGameboard();

            gameResultScreen.textContent = "Press Start button to start a game!";
        }
        else {
            isGameOn = true;
            turn = "O"

            gameboard.clearGameboard();

            gameResultScreen.textContent = `${getTurn() === "O" ? playerO.getName() : playerX.getName()} turn`;
        }

    }

    function checkForWinner() {
        const winConditions = [
                                [1, 2, 3],
                                [1, 4, 7],
                                [1, 5, 9],
                                [2, 5 ,8],
                                [3, 6, 9],
                                [3, 5, 7],
                                [4, 5, 6],
                                [7, 8, 9]
                            ];
        let checkString = "";
                            
        // for each condition in winConditions
        for (let i = 0; i < 8; i++) {
            // check for each index in winConditions
            for (let j = 0; j < 3; j++) {
                checkString += gameboard.gameboardTiles[winConditions[i][j] - 1].textContent;
            }

            if (checkString === "XXX") {
                gameResultScreen.textContent =  `${playerX.getName()} wins!`;

                isGameOn = false;

                return true;
            }
            else if (checkString === "OOO") {
                gameResultScreen.textContent =  `${playerO.getName()} wins!`;

                isGameOn = false;

                return true;
            }
            else if (gameboard.getAllTilesLen() === 9) {
                gameResultScreen.textContent = "Draw!";

                isGameOn = false;

                return true;
            } 

            checkString = "";
        }
    }

    function changeTurn() {
        turn = getTurn() === "O" ? "X" : "O";
        gameResultScreen.textContent = `${getTurn() === "O" ? playerO.getName() : playerX.getName()} turn`;
    }

    function getTurn() {
        return turn; 
    }

    function getIsGameOn() {
        return isGameOn;
    }

    return { checkForWinner, changeTurn, getTurn, getIsGameOn, startGame }
})();

const startResetButton = document.querySelector("#start-reset-button") 

startResetButton.addEventListener('click', () => gameController.startGame());
