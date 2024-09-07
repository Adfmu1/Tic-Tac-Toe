const gameboard = (() => {
    const gameboardTiles = document.getElementsByClassName("gameboard-tile");

    for (let i = 0; i < gameboardTiles.length; i++) {
        gameboardTiles[i].addEventListener("click", () => {
            if (gameController.getIsGameOn()) {
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
        })
    }

    function clearGameboard() {
        for (let i = 0; i < 9; i++) {
            gameboardTiles[i].textContent = "";
        }
    }

    return { clearGameboard, gameboardTiles };
        
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

    return { 
        getName : getName
    };
})();


const gameController = (() => {
    let isGameOn = false;
    let turn = "O";
    let start;

    function startGame() {
        while (start !== 'start') {
            start = prompt("type 'start' to start a game");
        }

        start = "";

        isGameOn = true;

        console.log("PlayerO turn");
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
                console.log("PlayerX wins");

                gameboard.clearGameboard();

                isGameOn = false;

                startGame();

                return true;
            }
            else if (checkString === "OOO") {
                console.log("PlayerO wins");

                gameboard.clearGameboard();

                isGameOn = false;

                startGame();

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

    return { checkForWinner, changeTurn, getTurn, getIsGameOn, startGame }
})();

gameController.startGame();
