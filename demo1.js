
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
                totalScore = totalScore + board[i][j];
                board[i][j + 1] = 0;
            }
        }
    }
    // console.log(totalScore)
    return [totalScore, board]
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
    // console.log("kfjkdjkdjkjfkj")
}

function moveLeft(board) {
    // console.log("in left")
    let nums = 0
    board = compress(board)
    let [a, b] = merge(board)
    nums = a
    board = b
    console.log("nums : ", nums)
    // printmat(board)
    board = compress(board)
    // printmat(board)
    // updateFrontend(newgrid)
    return [nums, board]
}

function moveRight(board) {
    board = reverse(board)
    let [a, b] = moveLeft(board)
    score = a
    board = b
    board = reverse(board)
    return [score, board]
}

function moveUp(board) {
    board = transpose(board)
    let [a, b] = moveLeft(board)
    score = a
    board = b
    // score, board = moveLeft(board)
    board = transpose(board)
    return [score, board]
}

function moveDown(board) {
    board = transpose(board)
    let [a, b] = moveRight(board)
    score = a
    board = b
    // score, board = moveRight(board)
    board = transpose(board)
    return [score, board]

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
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == 0) {
                return false
            }
            else {
                if (board[i][j] == board[i + 1][j] || board[i][j] == board[i][j + 1]) {
                    return false;
                }
            }
        }
    }

    for (let i = 0; i <= 2; i++) {
        let j = 3;
        if (board[i][j] == 0 || board[j][i] == 0) {
            return false
        }
        else {
            if (board[i][j] == board[i + 1][j] || board[j][i] == board[j][i + 1]) {
                return false;
            }
        }

    }
    if (board[3][3] == 0) return false;

    return true;
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

function updateScore(scores) {//////////
    let currScore = document.getElementById("score")
    let num = scores.toString()
    let str = "score: " + num
    // console.log(str)
    currScore.textContent = ""
    currScore.textContent = str

}

function updateBESTScore(scores) {//////////
    let currScore = document.getElementById("best")
    let num = scores.toString()
    let str = "score: " + num
    // console.log(str)
    currScore.textContent = ""
    currScore.textContent = str

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

function generateRandomTile(board) {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    let num = 2;
    while (board[row][col] != 0) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }
    board[row][col] = num;
    return board
}

function temp(board,score) {
    win = winnerPresent(board)
    gameOver = EndGameChecker(board)
    if (gameOver) {
        alert("GAME OVER")
        updateBESTScore(score)
        board = initializeGame()
    }
    else {
        updateScore(score)


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
    }
    // updateScore(score)
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
let Totalscore = 0
let score = 0
let [a, b] = [0, 0]
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            [a, b] = moveLeft(board)
            score = a
            board = b
            Totalscore = Totalscore + score
            console.log(score, Totalscore)
            board = temp(board,Totalscore)

            break;
        case 38:
            [a, b] = moveUp(board)
            score = a
            board = b
            Totalscore = Totalscore + score
            console.log(score, Totalscore)
            board = temp(board,Totalscore)
            break;
        case 39:
            [a, b] = moveRight(board)
            score = a
            board = b
            Totalscore = Totalscore + score
            console.log(score, Totalscore)
            board = temp(board,Totalscore)

            break;
        case 40:
            [a, b] = moveDown(board)
            score = a
            board = b
            Totalscore = Totalscore + score
            console.log(score, Totalscore)
            board = temp(board,Totalscore)
            break;
    }
};

document.getElementById("Newgame").addEventListener("click", initializeGame);

