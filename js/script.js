const btnContainer = document.getElementById('btn-container2');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resetBtn = document.getElementById('reset-btn');

const dialog = document.getElementById('dialog-section');
const confirmName = document.getElementById('confirm-players-name');
const closeDialog = document.getElementById('close-dialog');

const firstNameInput = document.getElementById('input-player-1');
const secondNameInput = document.getElementById('input-player-2');

const firstPlayerName = document.getElementById('p1-name');
const secondPlayerName = document.getElementById('p2-name');

const gridBoxes = document.querySelectorAll('.grid-box');
// const grid2 = document.getElementById('grid-2');
// const grid3 = document.getElementById('grid-3');
// const grid4 = document.getElementById('grid-4');
// const grid5 = document.getElementById('grid-5');
// const grid6 = document.getElementById('grid-6');
// const grid7 = document.getElementById('grid-7');
// const grid8 = document.getElementById('grid-8');
// const grid9 = document.getElementById('grid-9');

// let excludedGridBoxes = [];

function Player(name, symbol, result) {
    this.name = name;
    this.symbol = symbol;
    this.result = result;
    this.active = false;
    this.highscore = 0;
}

const firstPlayer = new Player('Player 1', 'X', 3);
const secondPlayer = new Player('Player 2', 'O', 0);

const boardMatrix = [[
    {
        gridBox: document.getElementById('grid-1'),
        position: 1,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-2'),
        position: 2,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-3'),
        position: 3,
        value: NaN,
        active: true
    }
],[
    {
        gridBox: document.getElementById('grid-4'),
        position: 4,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-5'),
        position: 5,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-6'),
        position: 6,
        value: NaN,
        active: true
    }
],[
    {
        gridBox: document.getElementById('grid-7'),
        position: 7,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-8'),
        position: 8,
        value: NaN,
        active: true
    },{
        gridBox: document.getElementById('grid-9'),
        position: 9,
        value: NaN,
        active: true
    }
]];


function playGame(players){
    const [firstPlayer, secondPlayer] = players;

    firstPlayer.active = true;

    // gridBoxes.forEach((box) => 
    //     box.addEventListener('click', () => {

    //         if (!excludedGridBoxes.includes(box.id) && firstPlayer.active) {
    //             box.innerHTML = `<h1>${firstPlayer.symbol}</h1>`;
    //             firstPlayer.active = false;
    //             secondPlayer.active = true;
                
    //         } else if (!excludedGridBoxes.includes(box.id) && secondPlayer.active) {
    //             box.innerHTML = `<h1>${secondPlayer.symbol}</h1>`;
    //             firstPlayer.active = true;
    //             secondPlayer.active = false;
    //         }
    //         excludedGridBoxes.push(box.id);
    //     })
    // );

    boardMatrix.forEach((el) => {
        el.forEach((object) => {
            object.gridBox.addEventListener('click', () => {

                if(object.active && firstPlayer.active) {
                    object.gridBox.innerHTML = `<h1>${firstPlayer.symbol}</h1>`;
                    object.active = false;
                    firstPlayer.active = false;
                    secondPlayer.active = true;
                    object.value = 1;

                } else if (object.active && secondPlayer.active) {
                    object.gridBox.innerHTML = `<h1>${secondPlayer.symbol}</h1>`;
                    object.active = false;
                    firstPlayer.active = true;
                    secondPlayer.active = false;
                    object.value = 0;
                }

                checkWinner();
            });
        })
    })
}

function checkWinner() {

    const controllMatrix = (matrix) => {
        matrix.forEach((line) => {
            if (line[0].value + line[1].value + line[2].value === 3) {
                alert('first Player (x) won!');
                clearBoard();
            } else if (line[0].value + line[1].value + line[2].value === 0) {
                alert('second Player (o)  won!');
                clearBoard();
            }
        })
    }

    const column1 = [boardMatrix[0][0], boardMatrix[1][0], boardMatrix[2][0]];
    const column2 = [boardMatrix[0][1], boardMatrix[1][1], boardMatrix[2][1]];
    const column3 = [boardMatrix[0][2], boardMatrix[1][2], boardMatrix[2][2]];
    const allColumns = [column1, column2, column3];
    
    const diagonal1 = [boardMatrix[0][0], boardMatrix[1][1], boardMatrix[2][2]];
    const diagonal2 = [boardMatrix[0][2], boardMatrix[1][1], boardMatrix[2][0]];
    const allDiagonals = [diagonal1, diagonal2];
    
    controllMatrix(boardMatrix);
    controllMatrix(allColumns);
    controllMatrix(allDiagonals);
}


function clearBoard() {
    // gridBoxes.forEach((box) => box.innerHTML = '');
    boardMatrix.forEach((el) => {
        el.forEach((object) => {
            object.gridBox.innerHTML = '';
            object.active = true;
            object.value = NaN;
        })
    })
    // excludedGridBoxes = [];
    firstPlayer.active = true;
}

function reset() {
    clearBoard();
    firstPlayerName.textContent = 'Player 1';
    secondPlayerName.textContent = 'Player 2';
    btnContainer.style.display = 'none';
    startBtn.classList.toggle('hidden');
    firstPlayer.active = false;
    secondPlayer.active = false;
}

// buttons listeners and functions

startBtn.addEventListener('click', () => {
    btnContainer.style.display = 'flex';
    startBtn.classList.toggle('hidden');
    dialog.showModal();
});

restartBtn.addEventListener('click', () => {
    clearBoard();
})

resetBtn.addEventListener('click', () => {
    reset();
});

confirmName.addEventListener('click', () => {
    firstPlayerName.textContent = firstNameInput.value;
    secondPlayerName.textContent = secondNameInput.value;
    firstPlayer.name = firstNameInput.value;
    secondPlayer.name = secondNameInput.value;
    dialog.close();
    playGame([firstPlayer, secondPlayer]);
});

closeDialog.addEventListener('click', () => {
    dialog.close()
});