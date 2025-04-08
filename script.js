
let gameboard = (function() {
    let gameBoardArr = [[null,null,null],[null,null,null],[null,null,null]]

    function Set(x,y, marker) {
        gameBoardArr[x][y] = marker;
    }

    function Get(x,y) {
        return gameBoardArr[x][y];
    }

    function PrintGameBoard() {
        for (let row = 0; row < gameBoardArr.length; row++) {
            console.log(`[${gameBoardArr[row][0]}][${gameBoardArr[row][1]}][${gameBoardArr[row][2]}]\n`);
        }
    }

    function CheckIfNull() {
        for (let rowNum = 0; rowNum < gameBoardArr.length; rowNum++) {
            for (let colNum = 0; colNum < gameBoardArr[rowNum].length; colNum++) {
                if (gameboard.Get(rowNum, colNum) === null) return true;
            }
        }
        return false;
    }

    return {Set, Get, CheckIfNull, PrintGameBoard};
})()




let game = (function () {
   // declare players
    let playerX = createPlayer("X", "X");
    let playerO = createPlayer("O", "O");
    //first player is X
    let currPlayer = playerX;
    // declare hasWinner as false
    let hasEnded = false;
    // game continues as long as winner is false
    while (!hasEnded) {
        gameboard.PrintGameBoard()
        round()
        gameboard.PrintGameBoard()
        currPlayer = switchPlayer()
    }
   // create a round function
    function round() {
        let {x,y} = getPlace(currPlayer.marker)
        gameboard.Set(x,y,currPlayer.marker);
        if (checkPatterns() === true) {
            alert(`Player ${currPlayer.name} won!`)
            hasEnded = true;
        }
        if (!gameboard.CheckIfNull()) {
            hasEnded = true
            alert(`Tie!`)}
        }

        function switchPlayer() {
            return currPlayer === playerX ? playerO : playerX
        }

    })



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

        return {
            x : x,
            y : y,
        }
    }

    function checkPatterns() {
        // Check horizontally
        if ((isSame(0,0, 0, 1) && isSame(0,1,0,2))
        ||(isSame(1,0,1,1) && isSame(1,1,1,2))
        ||(isSame(2,0,2,1) && isSame(2,1,2,2)))
                return true;

        // Check vertically

        if ((isSame(0,0,1,0) && isSame(1,0,2,0))
            ||(isSame(0,1,1,1) && isSame(1,1,2,1))
            ||(isSame(0,2,1,2) && isSame(1,2,2,2)))
            return true;

        // Diagonal

        if (isSame(0,0,1,1) && isSame(1,1,2,2)) return true;

        // Backwards diagonal
        return isSame(0, 2,1, 1) && isSame(1, 1,2, 0);

        function isSame(x1,y1, x2, y2) {
            let firstItem = gameboard.Get(x1,y1)
            let secondItem = gameboard.Get(x2,y2)
            if (firstItem !== null && secondItem !== null)
            {
                if (firstItem === secondItem) return true;
            }
            return false;
        }
    }






function createPlayer(name, marker) {
    return {name, marker}
}

game()