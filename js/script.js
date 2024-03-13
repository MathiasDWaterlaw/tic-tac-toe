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
let excludedGridBoxes = [];

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.active = false;
}

const firstPlayer = new Player('Player 1', 'X');
const secondPlayer = new Player('Player 2', 'O');

function startGame(players){
    const [firstPlayer, secondPlayer] = players;

    firstPlayer.active = true;

    gridBoxes.forEach((box) => 
        box.addEventListener('click', () => {

            if (!excludedGridBoxes.includes(box.id) && firstPlayer.active) {
                box.innerHTML = `<h1>${firstPlayer.symbol}</h1>`;
                firstPlayer.active = false;
                secondPlayer.active = true;
                
            } else if (!excludedGridBoxes.includes(box.id) && secondPlayer.active) {
                box.innerHTML = `<h1>${secondPlayer.symbol}</h1>`;
                firstPlayer.active = true;
                secondPlayer.active = false;
            }
            excludedGridBoxes.push(box.id);
        })
    );
}

function clearBoard() {
    gridBoxes.forEach((box) => box.innerHTML = '');
    excludedGridBoxes = [];
    firstPlayer.active = true;
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
    firstPlayerName.textContent = 'Player 1';
    secondPlayerName.textContent = 'Player 2';
    btnContainer.style.display = 'none';
    startBtn.classList.toggle('hidden');
    clearBoard()
});

confirmName.addEventListener('click', () => {
    firstPlayerName.textContent = firstNameInput.value;
    secondPlayerName.textContent = secondNameInput.value;
    firstPlayer.name = firstNameInput.value;
    secondPlayer.name = secondNameInput.value;
    startGame([firstPlayer, secondPlayer]);
    dialog.close();
});

closeDialog.addEventListener('click', () => {
    dialog.close()
});