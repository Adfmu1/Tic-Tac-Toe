const gameboard = (() => {
    let gameboard = {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: ""
    };

    function displayGameboard() {
        let row = "";
        for (let key in gameboard) {
            row += gameboard[key];
            if (key % 3 === 0) {
                console.log(row);
                row = "";
            }
        }
        
    }

    function changeField( chosenField ) {
        if (chosenField < 1 || chosenField > 9) {
            console.log("Pick numbers from 1 to 9");
        }
        else {
            if (gameController.getIsGameOn()) {
                const turn = gameController.getTurn();
    
            if (turn === "X") {
                gameboard[chosenField] = "X";
            }
            else if (turn === "O") {
                gameboard[chosenField] = "O";
            }
    
            displayGameboard();
    
            gameController.checkForWinner(gameboard);
            
            gameController.changeTurn();
            }
        }
    }

    return { gameboard, changeField };
        
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
                checkString += gameboard.gameboard[winConditions[i][j]];
            }

            if (checkString === "XXX") {
                console.log("PlayerX wins");

                isGameOn = false;

                startGame();
            }
            else if (checkString === "OOO") {
                console.log("PlayerO wins");

                isGameOn = false;

                startGame();
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
