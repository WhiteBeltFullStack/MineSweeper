'use strict';

const MINE = '&#128163';
const FLAG = '&#128681';

var gMinesCount = 0;

const gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};


var gBoard
function onInit(size = gLevel.SIZE) {
    gMinesCount = 0
    gLevel.SIZE = size;
    gLevel.MINES = Math.floor((size*size)*0.15)
   gBoard = buildBoard(gLevel.SIZE);
  console.log(gBoard);
  renderBoard(gBoard);
}

function buildBoard(boardSize) {
  var board = [];
  for (var i = 0; i < boardSize; i++) {
    board[i] = [];
    for (var j = 0; j < boardSize; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  for (var i = 0; i < gLevel.MINES; i++) {
    var minePlaced = false;
    while (!minePlaced) {
      var randomRow = getRandomInt(0, boardSize - 1);
      var randomCol = getRandomInt(0, boardSize - 1);

      if (!board[randomRow][randomCol].isMine) {
        board[randomRow][randomCol].isMine = true;
        minePlaced = true;
      }
    }
  }
    for(var i = 0 ; i < boardSize; i++){
        for(var j = 0 ; j < boardSize;j++){
            setMinesNegsCount(board,i,j)
        }
    }
  return board;
}

function setMinesNegsCount(board,rowIdx,colIdx) {
    for(var i = rowIdx-1 ; i<= rowIdx+1;i++ ){
        if(i<0 || i >= board.length) continue
        for(var j = colIdx -1 ;j <= colIdx+1 ;j++){
            if(j < 0 || j >= board[i].length) continue
            if(i === rowIdx && j === colIdx) continue
            if(board[i][j].isMine){
                board[rowIdx][colIdx].minesAroundCount++
                
            } 
        }
    }
    
  }

// function setMinesNegsCount(board,rowidx,colIdx) {
//   for (var i = 0; i < board.length; i++) {
//     for (var j = 0; j < board[i].length; j++) {
//         if(board[i][j].isMine){
//             gMinesCount++
            
//         }
//     }
//   }
//   return gMinesCount
// }

function onCellClicked(elCell, i, j) {
  console.log(elCell, i, j);
}

function onCellMarked(elCell) {}

function checkGameOver() {}

function expandSHown(board, elCell, i, j) {}



function minesOnBoard(){
    var elOnBoard = document.querySelector('.on-board')
    elOnBoard.innerText = gMinesCount
}