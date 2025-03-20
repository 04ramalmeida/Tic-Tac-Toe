
let gameboard = (function() {
    let gameBoardArr = [[null,null,null],[null,null,null],[null,null,null]]

    function Set(x,y, marker) {
        gameBoardArr[x][y] = marker;
    }

    function Get(x,y) {
        return gameBoardArr[x][y];
    }

    function CheckIfNull() {
        for (let rowNum = 0; rowNum < gameBoardArr.length; rowNum++) {
            for (let colNum = 0; colNum < gameBoardArr[rowNum].length; colNum++) {
                if (gameboard.Get(rowNum, colNum) === null) return true;
            }
        }
        return false;
    }

    return {Set, Get, CheckIfNull};
})()




let game = (function () {
   // declare players
    let playerX = createPlayer("X", "X");
    let playerY = createPlayer("Y", "Y");
    //first player is X
    let currPlayer = playerX;
    // declare hasWinner as false
    let hasEnded = false;
    // game continues as long as winner is false
    while (!hasEnded) {
        round()
    }
   // create a round function
    function round() {
        let x,y = getPlace(currPlayer.marker)
        gameboard.Set(x,y,currPlayer.marker);
        if (checkPatterns() === true) {
            alert(`Player ${currPlayer.name} won!`)
            hasEnded = true;
        }
        if (!gameboard.CheckIfNull()) {
            hasEnded = true
            alert(`Tie!`)
        }
    }



    function getPlace(playerMarker) {
        let x
        x = prompt(`Player, insert the row you want to put a ${playerMarker} in.`, "");
        let y
        y = prompt(`Player, insert the column you want to put a ${playerMarker} in.`, "");

        if (gameboard.Get(x,y) !== null) {
            while (gameboard.Get(x,y) !== null) {
                x = prompt(`That place was already marked, please insert the row you want to put a ${playerMarker} in.`, "");
                y = prompt(`That place was already marked, please insert the column you want to put a ${playerMarker} in.`, "");
            }
        }

        return x,y
    }

    function checkPatterns() {
        // Check horizontally
        if ((gameboard.Get(0,0) === gameboard.Get(0,1) && gameboard.Get(0,1) === gameboard.Get(0,2))
        ||(gameboard.Get(1,0) === gameboard.Get(1,1) && gameboard.Get(1,1) === gameboard.Get(1,2))
        ||(gameboard.Get(2,0) == gameboard.Get(2,1) && gameboard.Get(2,1) == gameboard.Get(2,2)))
                return true;

        // Check vertically

        if ((gameboard.Get(0,0) === gameboard.Get(1,0) && gameboard.Get(1,0) === gameboard.Get(2,0))
            ||(gameboard.Get(0,1) === gameboard.Get(1,1) && gameboard.Get(1,1) === gameboard.Get(2,1))
            ||(gameboard.Get(0,2) == gameboard.Get(1,2) && gameboard.Get(1,2) == gameboard.Get(2,2)))
            return true;

        // Diagonal

        if (gameboard.Get(0,0) == gameboard.Get(1,1) && gameboard.Get(1,1) === gameboard.Get(2,2)) return true;

        // Backwards diagonal
        if (gameboard.Get(0,2) === gameboard.Get(1,1) && gameboard.Get(1,1) === gameboard.Get(2,0)) return true;

        return false;
    }


})()




function createPlayer(name, marker) {
    return {name, marker}
}