const gameboard = (() => {
    let gameboard = {
        1: "",
        2: "X",
        3: "",
        4: "X",
        5: "",
        6: "",
        7: "X",
        8: "X",
        9: "X"
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
        
        gameController.checkForWinner(gameboard);
    }

    function changeField( chosenField, playerName ) {
        if (playerName === "playerX") {
            gameboard[chosenField] = "X"
        }
        else if (playerName === "playerO") {
            gameboard[chosenField] = "O"
        }

        gameController.checkForWinner(gameboard);
    }

    return { gameboard, displayGameboard, changeField };
})();


const playerX = (() => {
    let name = "playerX"

    function getName() {
        return name;
    }

    return { 
        getName : getName
    };
})();


const playerO = (() => {
    let name = "playerO"

    function getName() {
        return name;
    }

    return { 
        getName : getName
    };
})();

const gameController = (() => {
    function checkForWinner(gameboard) {
        const winConditions = [
                                [1, 2, 3],
                                [1, 4, 7],
                                [1, 5, 9],
                                [2, 5 ,],
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
                checkString += gameboard[winConditions[i][j]];
            }

            if (checkString === "XXX") {
                console.log("PlayerX wins");
            }
            else if (checkString === "OOO") {
                console.log("PlayerO wins");
            }

            checkString = "";
        }
    }

    return { checkForWinner }
})();