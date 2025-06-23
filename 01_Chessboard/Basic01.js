// 체스판 생성
const cells = [];

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');

for (let row = 0; row < 10; row++) {
        const base = 100 - row * 10;

        for (let col = 0; col < 10; col++) {
            let number;
            if (row % 2 === 0) {
                number = base - col;
            } else {
                number = base - (9 - col);
            }

            const cell = document.createElement('div');
            cell.className = 'cell';
            // cell.textContent = number;
            board.appendChild(cell);
            cells[number] = cell;
        }
      }

    updateSelection(cur);
});

function updateSelection(index) {
    cells.forEach(cell => cell.classList.remove('selected'));

    if (index >= 1 && index <= cells.length) {
        cells[index].classList.add('selected');
    }
}


// 주사위 굴리기
let cur = 1;

function rollDice() {
    const dice = Math.floor(Math.random() * (6 - 1 + 1) + 1);
    console.log('dice ' + dice);
    
    cur += dice;


    if (cur === 4) cur = 14;
    else if (cur === 8) cur = 30;
    else if (cur === 21) cur = 42;
    else if (cur === 28) cur = 76;
    else if (cur === 50) cur = 67;
    else if (cur === 71) cur = 92;
    else if (cur === 80) cur = 99;
    if (cur >= 100) cur = 100;

    console.log('cur ' + cur);

    // 말
    updateSelection(cur);

    const rnd = document.getElementById('rnd');
    rnd.textContent = dice;

}
