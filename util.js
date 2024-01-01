'use strict'

function renderBoard(board) {
    var strHTML = `<table><tbody>\n`
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < board[i].length; j++) {
            var cellClassName = `cell cell-${i}-${j}`
            var cellInner = board[i][j].isMine ? MINE : board[i][j].minesAroundCount;
           
            strHTML += `<td onclick="onCellClicked(this,${i},${j})" class="${cellClassName}">${cellInner}</td>\n`
        }
        strHTML += `</tr>\n`
    }
    strHTML += `</table></tbody>\n`

    
    // console.log(strHTML);
    const elGameContainer = document.querySelector('.game-container')
    elGameContainer.innerHTML = strHTML
}










function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}