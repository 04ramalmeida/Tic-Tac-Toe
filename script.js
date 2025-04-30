


let gameboard = (function() {
    let gameBoardArr = [[null,null,null],[null,null,null],[null,null,null]]

    function Set(x,y, marker) {
        gameBoardArr[x][y] = marker;
    }

    function Reset()
    {
      gameBoardArr = [[null,null,null],[null,null,null],[null,null,null]]
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

    return {Set, Get, CheckIfNull, PrintGameBoard, Reset};
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
   // create a round function
    function round(x,y) {
        gameboard.Set(x,y,currPlayer.marker);
        if (checkPatterns() === true) {
            alert(`Player ${currPlayer.name} won!`)
            hasEnded = true;
            domController.disableBoard()
        }
        if (!gameboard.CheckIfNull()) { // turn this into elif
            hasEnded = true
            alert(`Tie!`)
            domController.disableBoard()
        }
        if (!hasEnded) currPlayer = switchPlayer()
        }

        function switchPlayer() {
            return currPlayer === playerX ? playerO : playerX
        }

        function GetStatus() {
            return hasEnded
        }

        function SwitchStatus() {
            hasEnded = !hasEnded;
        }
    return {round, GetStatus, SwitchStatus};
    })()


let domController = (function () {
    let rows = document.getElementsByClassName("row");
    let squares = document.getElementsByClassName("square");
    console.log(squares);
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < 3; j++) {
            let square = squares[i*3+j];
            square.setAttribute("data-x", i)
            square.setAttribute("data-y", j);
            square.addEventListener("click", function () {
                if (game.GetStatus() === false) {
                    if (isFree(i,j)) {
                        game.round(i,j)
                        square.innerText = gameboard.Get(i,j)
                    } else alert("This square has already been marked.")
                }
            })
        }

    }




    function isFree(xInput, yInput) {
        let x = xInput;
        let y = yInput;

        return gameboard.Get(x, y) === null;
    }
    function disableBoard() {
        let squareArr = Array.from(squares)
        squareArr.forEach(square => {
            square.style.backgroundColor = "grey";
            square.style.color = "white";
        })
        let resetBtn = document.getElementById("reset-button")
        resetBtn.style.display = "inline"
        resetBtn.addEventListener("click", function () {
            gameboard.Reset()
            squareArr.forEach(square => {
                square.textContent = ""
                square.style.backgroundColor = "white"
                square.style.color = "black"
                let x = square.getAttribute("data-x")
                let y = square.getAttribute("data-y")

            })
            game.SwitchStatus()
            resetBtn.style.display = "none"
        })

    }

    return {disableBoard: disableBoard};

})()

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

