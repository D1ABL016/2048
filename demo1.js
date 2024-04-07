

board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
Totalscore = 0
score = 0

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

initializeGame()

function saveBoard() {   
    let currGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            currGrid[i][j] = board[i][j] 
        }
    }
    return currGrid
}

function anyChange(curr){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(curr[i][j] != board[i][j] )  return true
        }
    }
    return false
}


function compress() {
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
    // return board
}

function merge() {
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
    return totalScore
    // return false;
}

function reverse() {
    for (let i = 0; i < board[0].length; i++) {
        let k = 3;
        for (let j = 0; j < 2; j++) {
            [board[i][j], board[i][k]] = [board[i][k], board[i][j]]
            k -= 1
        }
    }
    // return board
}

function transpose() {
    newmat = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newmat[j][i] = board[i][j]
        }
    }
    board = newmat
    // return newmat
}

function printmat() {
    for (let i = 0; i < 4; i++) {
        let msg = ""
        for (let j = 0; j < 4; j++) {
            msg += board[i][j] + " "
        }
        console.log(msg)
    }
    // console.log("kfjkdjkdjkjfkj")
}

function moveLeft() {
    // console.log("in left")
    // let nums = 0
    let currGrid = saveBoard()
    compress()
    printmat(currGrid)
    let a = merge()
    printmat(currGrid)
    // board = b
    // console.log("nums : ", nums)
    // printmat(board)
    compress()
    let change = anyChange(currGrid)
    // printmat(board)
    // updateFrontend(newgrid)
    return [a, change]
}

function moveRight() {
    reverse()
    let [a, b] = moveLeft()
    // score = a
    // board = b
    reverse()
    return [a, b]
}

function moveUp() {
    transpose()
    let [a, b] = moveLeft()
    // score = a
    // board = b
    // score, board = moveLeft(board)
    transpose()
    return [a, b]
}

function moveDown() {
    transpose()
    let [a, b] = moveRight()
    // score = a
    // board = b
    // score, board = moveRight(board)
    transpose()
    return [a, b]

}

function initializeGame() {
    // board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    Totalscore = 0
    score = 0
    board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
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
    // printmat(board)
    // console.log("dhsjdjshdjshjdhsjdhsj")
    updateFrontend()
    // return board
}

function EndGameChecker() {// if return true then means that game is over 
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
    if (board[3][3] == 0) { return false; }

    return true;
}

function winnerPresent() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] == 2048) {
                return true;
            }
        }
    }
    return false;
}

function updateFrontend() {
    resetgrid();
    // updatecolours(board)
    updateValues()
    // updateScore(board)
}

function resetgrid() {
    let tempGrid = [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']]
    for (let i = 0; i < tempGrid[0].length; i++) {
        for (let j = 0; j < tempGrid[0].length; j++) {

            let cellValue = (4 * i + j + 1).toString()
            let cellElement = document.getElementById(cellValue)
            let col = colours[0]
            // console.log(typeof(col) , i,j)
            cellElement.style.backgroundColor = col;
            cellElement.textContent = tempGrid[i][j].toString()

        }
    }

}

function updateScore() {//////////
    let currScore = document.getElementById("score")
    let num = Totalscore.toString()
    let str = "score: " + num
    // console.log(str)
    currScore.textContent = ""
    currScore.textContent = str

}

function updateBESTScore() {//////////
    let bestScore = document.getElementById("best")
    let besti = getnums(bestScore)
    let maxi = Math.max(Totalscore, besti)
    let num = maxi.toString()
    let str = "best: " + num
    // console.log(str)
    bestScore.textContent = ""
    bestScore.textContent = str

}

function updateValues() {
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

function generateRandomTile() {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    let num = 2;
    while (board[row][col] != 0) {
        row = Math.floor(Math.random() * 4);
        col = Math.floor(Math.random() * 4);
    }
    board[row][col] = num;
    // return board
}

function temp(changed) {
    win = winnerPresent()
    gameOver = EndGameChecker()
    if (gameOver) {
        alert("GAME OVER")

        updateBESTScore()
        initializeGame()
    }
    else {
        updateScore()


        if (!win) {
            //make a function to generate a random tile at empty place
            if (changed) {
                generateRandomTile();
            }
            updateFrontend();
        }
        else {
            //make a function to print you won
            alert("you won")
            initializeGame()
        }
    }
    // updateScore(score)
    // return board
}

function getnums(str) {

    let numbers = "";
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            numbers += str[i];
        }
    }
    // console.log(numbers)
    // console.log(matches[0])
    return numbers
}



document.onkeydown = function (event) {
    let changed = false;
    let [a, b] = [0, 0]
    switch (event.keyCode) {
        case 37:
            [a, b] = moveLeft()
            console.log(a, b, score)
            score = a
            changed = b
            Totalscore = Totalscore + score
            // console.log(score, Totalscore)
            temp(changed)
            break;
        case 38:
            [a, b] = moveUp()
            console.log(a, b, score)
            score = a
            changed = b
            Totalscore = Totalscore + score
            // console.log(score, Totalscore)
            temp(changed)
            break;
        case 39:
            [a, b] = moveRight()
            console.log(a, b, score)
            score = a
            changed = b
            Totalscore = Totalscore + score
            // console.log(score, Totalscore)
            temp(changed)

            break;
        case 40:
            [a, b] = moveDown()
            console.log(a, b, score)
            score = a
            changed = b
            Totalscore = Totalscore + score
            // console.log(score, Totalscore)
            temp(changed)
            break;
    }
};

document.getElementById("Newgame").addEventListener("click", initializeGame);

