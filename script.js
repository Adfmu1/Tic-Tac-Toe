const gameboard = (() => {
    const gameboardTiles = document.getElementsByClassName("gameboard-tile");
    const resetButton = document.querySelector("#reset-btn");

    resetButton.addEventListener('click', () => {
        clearGameboard();

        gameController.resetTheGame();
    });

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
    const startBtn = document.querySelector("#start-btn");
    const modalDisplay = document.querySelector("#start-game");

    startBtn.addEventListener('click', () => {
        startGame();
    });

    function startGame() {
        isGameOn = true;

        modalDisplay.style.visibility = "hidden";
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
                alert("PlayerX wins");

                gameboard.clearGameboard();

                resetTheGame();

                modalDisplay.style.visibility = "visible";

                return true;
            }
            else if (checkString === "OOO") {
                alert("PlayerO wins");

                gameboard.clearGameboard();

                resetTheGame();

                modalDisplay.style.visibility = "visible";

                return true;
            }
            else if (gameboard.getAllTilesLen() === 9) {
                alert("Draw!");

                gameboard.clearGameboard();

                resetTheGame();

                modalDisplay.style.visibility = "visible";

                return true;
            } 

            checkString = "";
        }
    }

    function changeTurn() {
        turn = turn === "O" ? "X" : "O";
        console.log(`Player${turn} turn`);
    }

    function getTurn() {
        return turn; 
    }

    function getIsGameOn() {
        return isGameOn;
    }

    function resetTheGame() {
        isGameOn = false;

        modalDisplay.style.visibility = "visible";
    }

    return { checkForWinner, changeTurn, getTurn, getIsGameOn, startGame, resetTheGame }
})();
