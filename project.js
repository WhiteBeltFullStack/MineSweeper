'use strict'

const MINE = '&#128163'
const FLAG = '&#128681'


const gLevel = {
    SIZE: 4,
    MINES: 2,

}


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
}


function onInit(size=gLevel.SIZE) {
    gLevel.SIZE = size
    var gBoard = buildBoard(gLevel.SIZE)
    console.log(gBoard);
    renderBoard(gBoard)
}


function buildBoard(boardSize) {
    var board = []
    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    for (var i = 0; i < gLevel.MINES; i++) {
        var minePlaced = false
        while (!minePlaced) {
            var randomRow = getRandomInt(0, boardSize - 1)
            var randomCol = getRandomInt(0, boardSize - 1)

            if (!board[randomRow][randomCol].isMine) {
                board[randomRow][randomCol].isMine = true
                minePlaced = true
            }
        }
        setMinesNegsCount(board)

    }
    return board
}



function setMinesNegsCount(board) {
//Go around each cell and count BOMBS
//add Count if you near the bomb

}

function onCellClicked(elCell, i, j) {
    console.log(elCell, i, j);
}


function onCellMarked(elCell){

}






