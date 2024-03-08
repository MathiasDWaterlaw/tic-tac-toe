const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resetBtn = document.getElementById('reset-btn');
const btnContainer = document.getElementById('btn-container2');





startBtn.addEventListener('click', () => {
    btnContainer.style.display = 'flex';
    startBtn.classList.toggle('hidden');
});

resetBtn.addEventListener('click', () => {
    btnContainer.style.display = 'none';
    startBtn.classList.toggle('hidden');
});