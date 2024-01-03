'use strict';

const MINE = '&#128163';
const FLAG = '&#128681';

var gMinesCount = 0;
var gMinesRevealed = 0
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

var gBoard;
function onInit(size = gLevel.SIZE) {
  gMinesRevealed = 0
  var elRev = document.querySelector('.found')
  elRev.innerText = 0
  gMinesCount = 0;
  gLevel.SIZE = size;
  gLevel.MINES = Math.floor(size * size * 0.15);
  gBoard = buildBoard(gLevel.SIZE);

  // console.log(gBoard);
  renderBoard(gBoard);

  minesOnBoard();
  var elTdHideContent = document.querySelectorAll('td');
  for (var i = 0; i < elTdHideContent.length; i++) {
    elTdHideContent[i].innerText = '';
  }
  // console.log(gBoard);
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

  var firstClick = board;
  for (var i = 0; i < gLevel.MINES; i++) {
    var minePlaced = false;
    while (!minePlaced) {
      var randomRow = getRandomInt(0, boardSize - 1);
      var randomCol = getRandomInt(0, boardSize - 1);
      if (board[randomRow][randomCol] !== firstClick) {
        if (!board[randomRow][randomCol].isMine) {
          board[randomRow][randomCol].isMine = true;
          minePlaced = true;
          gMinesCount++;
        }
      }
    }
  }
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      setMinesNegsCount(board, i, j);
    }
  }
  return board;
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[i].length) continue;
      if (i === rowIdx && j === colIdx) continue;
      if (board[i][j].isMine) {
        board[rowIdx][colIdx].minesAroundCount++;
      }
    }
  }
}

function onCellClicked(elCell, i, j, event) {
  // console.log('Clicked:', event);

  elCell.style.backgroundColor = 'darkslategray';

 

  if (gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    elCell.innerHTML = MINE;
    gBoard[i][j].isShown = true;
    gMinesRevealed++
    var elRev = document.querySelector('.found')
    elRev.innerText = gMinesRevealed
    
  }

  if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    elCell.innerText = gBoard[i][j].minesAroundCount;
    gBoard[i][j].isShown = true;
    if (gBoard[i][j].minesAroundCount === 0) {
      elCell.innerText = ' ';
    }
  }
  if (event.button === 2){
    onCellMarked(elCell, event, i, j);
  }
}

function onCellMarked(elCell, ev, i, j) {
  ev.preventDefault();
  console.log(ev);
  
    if (gBoard[i][j].isShown) {
      return;
    }
    if (!gBoard[i][j].isMarked) {
      elCell.innerText = 'FLAG';
    } else {
      elCell.innerText = '';
    }
  
}

function checkGameOver() {}

function expandSHown(board, elCell, i, j) {}

function minesOnBoard() {
  var elOnBoard = document.querySelector('.on-board');
  elOnBoard.innerText = gMinesCount;
}
