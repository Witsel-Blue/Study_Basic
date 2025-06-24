function play(param0) {
    const participants = ['A', 'B', 'C'];
    const penalties = { 'A': 0, 'B': 0, 'C': 0 };

    let arrays = [
        [10],
        [30],
        [50],
        [80],
    ];

    const bases = [10, 30, 50, 80];

    for (let i = 0; i < param0.length; i += 3) {
        const turnCards = [
        { player: 'A', value: param0[i] },
        { player: 'B', value: param0[i + 1] },
        { player: 'C', value: param0[i + 2] }
        ];

        turnCards.sort((a, b) => a.value - b.value);

        for (const { player, value } of turnCards) {
            let bestIndex = -1;
            let minDiff = Infinity;

            for (let j = 0; j < 4; j++) {
                const diff = Math.abs(bases[j] - value);
                if (
                diff < minDiff ||
                (diff === minDiff && bases[j] > bases[bestIndex])
                ) {
                minDiff = diff;
                bestIndex = j;
                }
            }

            const lastValue = arrays[bestIndex].at(-1);
            const canAdd = value < lastValue;

            if (canAdd) {
                arrays[bestIndex].push(value);
            } else {
                penalties[player] += arrays[bestIndex].length;
                arrays[bestIndex] = [];
            }

            if (arrays.every(arr => arr.length === 0)) {
                return penalties;
            }
        }
    }

    const result = `A:${penalties['A']}점 B:${penalties['B']}점 C:${penalties['C']}점`;
    console.log(result);

    return penalties;
}

function runGame() {
    const inputEl = document.getElementById('input');
    const resultEl = document.getElementById('result');
    const input = inputEl.value;

    const values = input
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v));

    if (values.length % 3 !== 0) {
        console.log('입력개수가 3의 배수가 아니므로 게임을 종료합니다.');
        alert('입력 개수가 3의 배수가 아니므로 게임을 종료합니다.');
        inputEl.value = '';
        resultEl.textContent = '';
        removeResetButton();
        return;
    }

    const result = play(values);

    document.getElementById('result').textContent = 
        `A:${result['A']}점\nB:${result['B']}점\nC:${result['C']}점`;
    
    createResetButton();
}

function createResetButton() {
    let existingBtn = document.getElementById('resetBtn');
    if (existingBtn) return;

    const btn = document.createElement('button');
    btn.id = 'resetBtn';
    btn.textContent = '다시하기';
    btn.style.marginTop = '16px';

    btn.onclick = () => {
        document.getElementById('input').value = '';
        document.getElementById('result').textContent = '';
        removeResetButton();
    };

    const resultEl = document.getElementById('result');
    resultEl.insertAdjacentElement('afterend', btn);
}

function removeResetButton() {
    const btn = document.getElementById('resetBtn');
    if (btn) btn.remove();
}