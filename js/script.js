const btnContainer = document.getElementById('btn-container2');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resetBtn = document.getElementById('reset-btn');

const dialog = document.getElementById('dialog-section');
const confirmName = document.getElementById('confirm-players-name');
const closeDialog = document.getElementById('close-dialog');
const firstPlayerName = document.getElementById('p1-name');
const secondPlayerName = document.getElementById('p2-name');
const firstNameInput = document.getElementById('input-player-1');
const secondNameInput = document.getElementById('input-player-2');




startBtn.addEventListener('click', () => {
    btnContainer.style.display = 'flex';
    startBtn.classList.toggle('hidden');
    dialog.showModal();
});

resetBtn.addEventListener('click', () => {
    firstPlayerName.textContent = 'Player 1';
    secondPlayerName.textContent = 'Player 2';
    btnContainer.style.display = 'none';
    startBtn.classList.toggle('hidden');
});

confirmName.addEventListener('click', () => {
    firstPlayerName.textContent = firstNameInput.value;
    secondPlayerName.textContent = secondNameInput.value;
    dialog.close();
});

closeDialog.addEventListener('click', () => {
    dialog.close()
});