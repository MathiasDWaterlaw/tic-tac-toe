const btnContainer = document.getElementById('btn-container2');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resetBtn = document.getElementById('reset-btn');

const dialog = document.getElementById('dialog-section');
const confirmName = document.getElementById('confirm-players-name');
const closeDialog = document.getElementById('close-dialog');

const firstNameInput = document.getElementById('input-player-1');
const secondNameInput = document.getElementById('input-player-2');

const firstPlayerSection = document.getElementById('player-1');
const secondPlayerSection = document.getElementById('player-2');

const firstPlayerName = document.getElementById('p1-name');
const secondPlayerName = document.getElementById('p2-name');
const firstPlayerScore = document.getElementById('p1-score');
const secondPlayerScore = document.getElementById('p2-score');

const winDialog = document.getElementById('win-dialog');
const winDialContainer = document.getElementById('win-d-container');
const continueGame = document.getElementById('continue-game');
const secondBtnReset = document.getElementById('second-reset');

const green = '#A1EC83';

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
        this.active = false;
        this.highscore = 0;
        this.winner = false;
    }
}

const firstPlayer = new Player('Player 1', './images/cross-svgrepo-com.svg');
const secondPlayer = new Player('Player 2', './images/circle-svgrepo-com.svg');

const boardMatrix = [[
    {
        gridBox: document.getElementById('grid-1'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-2'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-3'),
        value: NaN,
        active: true
    }
],[
    {
        gridBox: document.getElementById('grid-4'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-5'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-6'),
        value: NaN,
        active: true
    }
],[
    {
        gridBox: document.getElementById('grid-7'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-8'),
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-9'),
        value: NaN,
        active: true
    }
]];

function playGame(players){

    const [firstPlayer, secondPlayer] = players;
    firstPlayer.active = true;
    refreshTurn();

    boardMatrix.forEach((el) => {
        el.forEach((object) => {
            object.gridBox.addEventListener('click', () => {

                if(object.active && firstPlayer.active) {

                    object.gridBox.innerHTML = `<img src="${firstPlayer.symbol}"/>`;
                    object.active = false;
                    object.value = 1;
                    firstPlayer.active = false;
                    secondPlayer.active = true;

                } else if (object.active && secondPlayer.active) {

                    object.gridBox.innerHTML = `<img src="${secondPlayer.symbol}"/>`;
                    object.active = false;
                    object.value = 0;
                    firstPlayer.active = true;
                    secondPlayer.active = false;
                }

                checkWinner();
                refreshTurn();
                refreshHighscore();
            });
        });
    });
}

function refreshTurn() {
    if (firstPlayer.active) {
        firstPlayerSection.style.backgroundColor = green;

    } else {
        firstPlayerSection.style.backgroundColor = 'var(--main-white)';
    }
    
    if (secondPlayer.active) {
        secondPlayerSection.style.backgroundColor = green;

    } else {
        secondPlayerSection.style.backgroundColor = 'var(--main-white)';
    }
}


function checkWinner() {
    
    const showWinner = (string) => {
        winDialContainer.innerHTML = `<h2>${string}</h2>`;
        winDialog.showModal();
    }

    const checkDraw = () => {
        
        const drawNumber = boardMatrix.reduce((acc, line)=>{
            acc = acc + line[0].value + line[1].value + line[2].value;
            return acc;
        }, 0);

        if (!firstPlayer.winner && !secondPlayer.winner){

            if(drawNumber === 4 || drawNumber === 5) {
                clearBoard();
                showWinner("It's draw!");
            }
        }

    }

    // function that controls if a line of a matrix is winning.
    // if the sum of a line is 3 the first player has won,
    // otherwise if the sum is 0 the second player has won.
    const controllMatrix = (matrix) => {
        
        matrix.forEach((line) => {
            if (line[0].value + line[1].value + line[2].value === 3) {
                firstPlayer.highscore += 1;
                firstPlayer.winner = true;
                secondPlayer.winner = false;
                clearBoard();
                showWinner(`${firstPlayer.name} won!`);

            } else if (line[0].value + line[1].value + line[2].value === 0) {
                secondPlayer.highscore += 1;
                secondPlayer.winner = true;
                firstPlayer.winner = false;
                clearBoard();
                showWinner(`${secondPlayer.name} won!`);
            }

        });
        
    }
                
        const allColumns = [
                            [boardMatrix[0][0], boardMatrix[1][0], boardMatrix[2][0]],
                            [boardMatrix[0][1], boardMatrix[1][1], boardMatrix[2][1]],
                            [boardMatrix[0][2], boardMatrix[1][2], boardMatrix[2][2]]];

        const allDiagonals = [
                            [boardMatrix[0][0], boardMatrix[1][1], boardMatrix[2][2]],
                            [boardMatrix[0][2], boardMatrix[1][1], boardMatrix[2][0]]];
        

    controllMatrix(boardMatrix);
    controllMatrix(allColumns);
    controllMatrix(allDiagonals);
    checkDraw();

}

function refreshHighscore() {
    firstPlayerScore.innerHTML = `<p>${firstPlayer.highscore}</p>`;
    secondPlayerScore.innerHTML = `<p>${secondPlayer.highscore}</p>`;
}

function clearBoard() {

    boardMatrix.forEach((el) => {
        el.forEach((object) => {
            object.gridBox.innerHTML = '';
            object.active = true;
            object.value = NaN;
        });
    });

    firstPlayer.winner = false;
    secondPlayer.winner = false;
}

function reset() {
    window.location.reload();
}

// buttons listeners and functions

startBtn.addEventListener('click', () => {
    dialog.showModal();
});

confirmName.addEventListener('click', () => {
    
    if (firstNameInput.value === '') {
        firstPlayerName.textContent = 'Player 1';
        
    } else {
        firstPlayerName.textContent = firstNameInput.value;
    }  
    if (secondNameInput.value === '') {
        secondPlayerName.textContent = 'Player 2';
        
    } else {
        secondPlayerName.textContent = secondNameInput.value;
    }
    
    firstPlayer.name = firstPlayerName.textContent;
    secondPlayer.name = secondPlayerName.textContent;
    dialog.close();
    btnContainer.style.display = 'flex';
    startBtn.classList.toggle('hidden');
    playGame([firstPlayer, secondPlayer]);
});

closeDialog.addEventListener('click', () => {
    dialog.close();
});

restartBtn.addEventListener('click', () => {
    clearBoard();
})

resetBtn.addEventListener('click', () => {
    reset();
});

continueGame.addEventListener('click', () => {
    clearBoard();
    winDialog.close();
});

secondBtnReset.addEventListener('click', () => {
    reset();
    winDialog.close();
});