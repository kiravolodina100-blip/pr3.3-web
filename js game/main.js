const logs = [
    '[ПЕРСОНАЖ №1] згадав щось важливе, але несподівано [ПЕРСОНАЖ №2], не тямлячи себе від переляку, вдарив у передпліччя ворога.',
    '[ПЕРСОНАЖ №1] поперхнувся, і за це [ПЕРСОНАЖ №2] з переляку приклав прямий удар коліном у лоб ворога.',
    '[ПЕРСОНАЖ №1] забувся, але в цей час наглий [ПЕРСОНАЖ №2], прийнявши вольове рішення, непомітно підійшовши ззаду, вдарив.',
    '[ПЕРСОНАЖ №1] прийшов до тями, але несподівано [ПЕРСОНАЖ №2] випадково завдав найпотужнішого удару.',
    '[ПЕРСОНАЖ №1] поперхнувся, але в цей час [ПЕРСОНАЖ №2] неохоче роздробив кулаком <вирізано цензурою> супротивника.',
    '[ПЕРСОНАЖ №1] здивувався, а [ПЕРСОНАЖ №2], похитнувшись, вліпив підлий удар.',
    '[ПЕРСОНАЖ №1] висморкався, але несподівано [ПЕРСОНАЖ №2] провів дробильний удар.',
    '[ПЕРСОНАЖ №1] похитнувся, і раптом наглий [ПЕРСОНАЖ №2] безпричинно вдарив у ногу супротивника.',
    '[ПЕРСОНАЖ №1] засмутився, як раптом, несподівано [ПЕРСОНАЖ №2] випадково вліпив стопою в живіт суперника.',
    '[ПЕРСОНАЖ №1] намагався щось сказати, але раптом, несподівано [ПЕРСОНАЖ №2] від нудьги розбив брову супернику.'
];

function random(num) {
    return Math.floor(Math.random() * (num + 1));
}

function renderHPLife() {
    const { elHP, damageHP, defaultHP } = this;
    elHP.innerText = `${damageHP} / ${defaultHP}`;
}

function renderProgressbar() {
    const { damageHP, defaultHP, elProgressbar } = this;
    const percent = (damageHP * 100) / defaultHP;
    elProgressbar.style.width = percent + '%';
    
    const elBar = elProgressbar;
    elBar.classList.remove('low', 'critical');
    if (percent < 20) {
        elBar.classList.add('critical');
    } else if (percent < 50) {
        elBar.classList.add('low');
    }
}

function render() {
    this.renderHPLife();
    this.renderProgressbar();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHPLife,
    renderProgressbar,
    render
};

const enemy1 = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife,
    renderProgressbar,
    render
};

const enemy2 = {
    name: 'Bulbasaur',
    defaultHP: 120,
    damageHP: 120,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife,
    renderProgressbar,
    render
};

let currentEnemy = enemy1; 

const $btnKick = document.getElementById('btn-kick');
const $btnSuperKick = document.getElementById('btn-super-kick');

function generateLog(first, second, damage) {
    const { name: name1 } = first;
    const { name: name2, damageHP, defaultHP } = second;

    const randomIndex = random(logs.length - 1);
    let text = logs[randomIndex]
        .replace('[ПЕРСОНАЖ №1]', name1)
        .replace('[ПЕРСОНАЖ №2]', name2);

    const logMessage = `${text} -${damage} [${damageHP}/${defaultHP}]`;

    const $p = document.createElement('p');$p.innerText = logMessage;
    
    const $logs = document.getElementById('logs');$logs.insertBefore($p,$logs.children[0]);
}

function attack(attacker, receiver, minDamage, maxDamage) {
    const damage = random(maxDamage - minDamage) + minDamage;
    receiver.damageHP -= damage;

    if (receiver.damageHP <= 0) {
        receiver.damageHP = 0;
        alert(`${receiver.name} програв бій!`);
        $btnKick.disabled = true;
        if ($btnSuperKick)$btnSuperKick.disabled = true;
    }

    receiver.render();
    generateLog(attacker, receiver, damage);
}

$btnKick.addEventListener('click', function () {
    attack(character, currentEnemy, 0, 15);
    
    if (currentEnemy.damageHP > 0) {
        attack(currentEnemy, character, 0, 15);
    }
});

if ($btnSuperKick) {$btnSuperKick.addEventListener('click', function () {
        attack(character, currentEnemy, 10, 30);
        
        if (currentEnemy.damageHP > 0) {
            attack(currentEnemy, character, 5, 20);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    character.render();
    currentEnemy.render();
});