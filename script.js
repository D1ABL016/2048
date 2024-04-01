
function compress(board) {

    // let newMatrix = board;
    for (let i = 0; i < 4; i++) {
        let pos = 0
        for (let j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                // newMatrix[i][j]=0
                [board[i][j], board[i][pos]] = [board[i][pos], board[i][j]]
                pos += 1
            }
        }
    }
    return board
}

function merge(board) {
    let totalScore = 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == board[i][j + 1] && board[i][j] != 0) {
                board[i][j] = board[i][j] * 2;
                totalScore += board[i][j];
                board[i][j + 1] = 0;
            }
        }
    }
    return totalScore, board
    // return false;
}

function reverse(board) {
    for (let i = 0; i < board[0].length; i++) {
        let k = 3;
        for (let j = 0; j < 2; j++) {
            [board[i][j], board[i][k]] = [board[i][k], board[i][j]]
            k -= 1
        }
    }
    return board
}

function transpose(board) {
    newmat = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newmat[j][i] = board[i][j]
        }
    }
    return newmat
}

function printmat(board) {
    for (let i = 0; i < 4; i++) {
        let msg = ""
        for (let j = 0; j < 4; j++) {
            msg += board[i][j] + " "
        }
        console.log(msg)
    }
    console.log("kfjkdjkdjkjfkj")
}

function moveLeft(board) {
    // console.log("in left")
    board = compress(board)
    score, board = merge(board)
    // printmat(board)
    board = compress(board)
    // printmat(board)
    // updateFrontend(newgrid)
    return score, board
}

function moveRight(board) {
    newgrid = reverse(board)
    score, newgrid = moveLeft(newgrid)
    newgrid = reverse(newgrid)
    return score, newgrid
}

function moveUp(board) {
    board = transpose(board)
    score, board = moveLeft(board)
    board = transpose(board)
    return score, board
}

function moveDown(board) {
    newgrid = transpose(board)
    score, newgrid = moveRight(newgrid)
    newgrid = transpose(newgrid)
    return score, newgrid

}

function initializeGame() {
    let board = [
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
    ];
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    board[row][col] = 2;
    while (board[row][col] != 0) {
        // console.log(row,col)
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }
    // console.log(row,col)
    board[row][col] = 2;
    updateFrontend(board)
    return board
}

function EndGameChecker(board) {// if return true then means that game is over 
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            let curr = board[i][j];
            if (curr != 0) {
                if (((i + 1) < 4 && (j + 1) < 4) && (curr != board[i + 1][j] && curr != board[i][j + 1])) {
                    return true;
                }
            }
            else {
                return false
            }
        }
    }
    return false;
}

function winnerPresent(board) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 2048) {
                return true;
            }
        }
    }
    return false;
}

function updateFrontend(board) {
    resetgrid();
    // updatecolours(board)
    updateValues(board)
    // updateScore(board)
}

function resetgrid() {
    let board = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[0].length; j++) {

            let cellValue = (4 * i + j + 1).toString()
            let cellElement = document.getElementById(cellValue)
            let col = colours[0]
            // console.log(typeof(col) , i,j)
            cellElement.style.backgroundColor = col;
            cellElement.textContent = board[i][j].toString()

        }
    }

}

function updateScore(board) {//////////

}

function updateValues(board) {
    for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] != 0) {
                let cellValue = (4 * i + j + 1).toString()
                let cellElement = document.getElementById(cellValue)
                let col = colours[board[i][j]]
                // console.log(typeof(col) , i,j)
                cellElement.style.backgroundColor = col;
                cellElement.textContent = board[i][j].toString()
            }
        }
    }
}

function generateRandomTile(board){
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    let num  = 2;
    while (board[row][col] != 0) {        
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }
    board[row][col] = num;
    return board
}

let colours = {
    0: "rgba(238, 228, 218, 0.35)",
    2: "#eee4da",
    4: "#eee1c9",
    8: "#f3b27a",
    16: "#f69664",
    32: "#f77c5f",
    64: "#f75f3b",
    128: "#edd073",
    256: "#edcc62",
    512: "#edc950",
    1024: "#edc53f",
    2048: "#edc22e"

};

let board = initializeGame()
let score=0
// while (!EndGameChecker(board)) {
//take input
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            console.log("left")
            score, board = moveLeft(board)
            win = winnerPresent(board)
            gameOver = EndGameChecker(board)
            if (gameOver){
                // alert("GAME OVER")
            }
            if (!win) {
                //make a function to generate a random tile at empty place
                board = generateRandomTile(board);
                updateFrontend(board);
            }
            else {
                //make a function to print you won
                alert("you won")
                board = initializeGame()

            }   
            break;
        case 38:
            console.log("up")
            score, board = moveUp(board)
            win = winnerPresent(board)
            if (!win) {
                //make a function to generate a random tile at empty place
                board = generateRandomTile(board);
                updateFrontend(board);
            }
            else {
                //make a function to print you won
                alert("you won")
            }   
            break;
        case 39:
            console.log("right")
            score, board = moveRight(board)
            win = winnerPresent(board)
            if (!win) {
                //make a function to generate a random tile at empty place
                board = generateRandomTile(board);
                updateFrontend(board);
           }
            else {
                //make a function to print you won
                alert("you won")
            }   
            break;
        case 40:
            console.log("down")
            score, board = moveDown(board)
            win = winnerPresent(board)
            if (!win) {
                //make a function to generate a random tile at empty place
                board = generateRandomTile(board);
                updateFrontend(board);
            }
            else {
                //make a function to print you won
                alert("you won")
            }   
            break;
        
    }
    // updateFrontend(board)
    
};
// printmat(board)


// }




