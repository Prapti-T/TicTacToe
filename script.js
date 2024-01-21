const X_CLASS = 'x'
const O_CLASS = 'o'
const WIN_COMBO = [
    [0, 1, 2] , [3, 4, 5] , [6, 7, 8] , [0, 3, 6],
    [1, 4, 7] , [2, 5, 8] , [0, 4, 8] , [2, 4, 6]
  ]

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessage = document.getElementById('winMessage')
const restartButton = document.getElementById('restart')
const winMessageElement = document.querySelector('[data-win-message]')
let oturn

startGame()

function startGame(){
    oturn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once : true})
    })
    setBoardHoverClass()
}

function handleClick(e){
    const cell = e.target
    const currentClass = oturn ? O_CLASS : X_CLASS
    console.log('clicked');
    placeMark(cell, currentClass)
    //check for win
    if(checkWin()){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        swapTurns()
        setBoardHoverClass()
    }
    swapTurns()
    setBoardHoverClass()
}

function endGame(draw){
    if(draw){

    }
    else{
        winMessageElement.innerText = `${oturn ? "O's" : "X's"} WINS`
    }
}

winMessage.classList.add('show')

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}


function swapTurns(){
    oturn = !oturn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(oturn){
        board.classList.add(O_CLASS)
    }
    else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WIN_COMBO.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}