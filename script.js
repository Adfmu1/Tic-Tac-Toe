console.log("Im working");

const gameboard = (function createGameboard() {
    let gameboard = {
        1: [""],
        2: [""],
        3: [""],
        4: [""],
        5: [""],
        6: [""],
        7: [""],
        8: [""],
        9: [""]
    };

    function displayGameboard() {
        for (let key in gameboard) {
            console.log(gameboard[key]);
            if (key % 3 === 0) {
                console.log("\n");
            }
        }
    }

    return { displayGameboard };
})();