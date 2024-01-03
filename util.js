'use strict';

function renderBoard(board) {
  var strHTML = `<table ><tbody>\n`;
  for (var i = 0; i < board.length; i++) {
    strHTML += `<tr>\n`;
    for (var j = 0; j < board[i].length; j++) {
      var cellClassName = `cell cell-${i}-${j}`;
      var cellInner = board[i][j].isMine ? MINE : board[i][j].minesAroundCount;

      strHTML += `<td oncontextmenu="onCellMarked(this,event,${i},${j})"
                  onclick="onCellClicked(this,event,${i},${j})" 
                  class=" ${cellClassName}">${cellInner}</td>\n`;
    }
    strHTML += `</tr>\n`;
  }
  strHTML += `</table></tbody>\n`;
  
  
  const elGameContainer = document.querySelector('.game-container');
  elGameContainer.innerHTML = strHTML;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
