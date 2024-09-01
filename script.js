console.log("Im working");

const gameboard = (function createGameboard() {
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
        for (let key in gameboard) {
            console.log(gameboard[key]);
            if (key % 3 === 0) {
                console.log("\n");
            }
        }
    }

    function changeField( chosenField, playerName ) {
        if (playerName === "playerX") {
            gameboard[chosenField] = "X"
        }
        else if (playerName === "playerO") {
            gameboard[chosenField] = "O"
        }
    }

    return { displayGameboard, changeField };
})();


const playerX = (function createPlayerX() {
    let name = "playerX"

    function getName() {
        return name;
    }

    return { 
        getName : getName
    };
})();


const playerO = (function createPlayerO() {
    let name = "playerO"

    function getName() {
        return name;
    }

    return { 
        getName : getName
    };
})();