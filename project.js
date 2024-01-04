'use strict';

const MINE = '&#128163';
const FLAG = '&#128681';

var gLife;
// var gGame.isOn = false;

var gMinesCount = 0;
var gMinesRevealed = 0;
const gLevel = {
  SIZE: 4,
  MINES: 2,
};

var gGame = {
  isOFF: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

var gBoard;
function onInit(size = gLevel.SIZE) {
  alert('When Found all the Mines ,make extra Left click');
  gMinesRevealed = 0;
  var elRev = document.querySelector('.found');
  elRev.innerText = 0;
  gMinesCount = 0;
  gLevel.SIZE = size;
  gLevel.MINES = Math.floor(size * size * 0.15);
  gBoard = buildBoard(gLevel.SIZE);
  gGame.isOFF = false;
  gLife = 2;
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

  var firstClick = board; // trying to randomise First Click
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

function onCellClicked(elCell, event, i, j) {
  // console.log('Clicked:', event);

  if (gGame.isOFF) {
    return;
  }
  checkGameOver(i, j);
  if (gBoard[i][j].isMarked) return;

  elCell.style.backgroundColor = 'darkslategray';

  if (gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    elCell.innerHTML = MINE;
    gBoard[i][j].isShown = true;
    gMinesRevealed++;
    var elRev = document.querySelector('.found');
    elRev.innerText = gMinesRevealed;
  }

  if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
    // elCell.innerText = gBoard[i][j].minesAroundCount;
    gBoard[i][j].isShown = true;
    if (gBoard[i][j].minesAroundCount === 0) {
      elCell.innerText = '';

      expandShown(elCell, i, j);
    } else {
      elCell.innerText = gBoard[i][j].minesAroundCount;
    }
  }
}

function onCellMarked(elCell, ev, i, j) {
  ev.preventDefault();
  // console.log(ev);
  if (gGame.isOFF) {
    return;
  }

  if (gBoard[i][j].isShown) {
    return;
  }

  if (!gBoard[i][j].isMarked) {
    elCell.innerHTML = FLAG;
    gBoard[i][j].isMarked = true;
    gGame.markedCount++;
    console.log(gGame.markedCount);
  } else {
    elCell.innerText = '';
    gBoard[i][j].isMarked = false;
    gGame.markedCount--;
    console.log(gGame.markedCount);
  }
}
// NEED TO ADD WIN CONDITION...
function checkGameOver(i, j) {
  if (gBoard[i][j].isMine) {
    gLife--;
    if (gLife === 0) {
      gGame.isOFF = true;
      console.log('LOST');
    }
  }

  var allMinesMarked = true;
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
        allMinesMarked = false;
        break;
      }
    }
    if (!allMinesMarked) {
      break;
    }
  }

  if (allMinesMarked) {
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        gBoard[i][j].isShown = true;
        gGame.isOFF = true;
      }
    }
    alert('YOU WON-Click again the Table to Play');
  }
}
//i delete board parameter for easier usage to use gBoard
function expandShown(elCell, rowIdx, colIdx) {
  //Recurssion
  //Getting the I-ROWIDX and the J-COLDIX from the onClickedButton
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue;
      if (i === colIdx && j === colIdx) continue;

      //im checking if cell if not a mine and is not shown
      if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
        // im making CellSelector to use it to locate the numbers
        var cellSelector = `.cell-${i}-${j}`;
        // entering the Cell CLASS to Detect the CELL
        var neighborCell = document.querySelector(cellSelector);
        //This function gets THE Cell gets the index i and j
        // and
        revealCell(neighborCell, i, j);
        //
        if (gBoard[i][j].minesAroundCount === 0) {
          expandShown(neighborCell, i, j);
        }
      }
    }
  }
}

function revealCell(elCell, i, j) {
  elCell.innerText =
    gBoard[i][j].minesAroundCount === 0 ? '' : gBoard[i][j].minesAroundCount;
  elCell.style.backgroundColor = 'darkslategray';

  gBoard[i][j].isShown = true;
}

function minesOnBoard() {
  var elOnBoard = document.querySelector('.on-board');
  elOnBoard.innerText = gMinesCount;
}

//*degel life open

// build logic :
