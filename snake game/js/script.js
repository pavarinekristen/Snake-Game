let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    return false; // Removido o check de colisão com parede
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        scoreBox.innerHTML = 'Score: ' + score;
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;
        }
        scoreBox.innerHTML = 'Score: ' + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2, b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Lógica de atravessar paredes
    if (snakeArr[0].x >= 18) snakeArr[0].x = 0;
    if (snakeArr[0].x < 0) snakeArr[0].x = 17;
    if (snakeArr[0].y >= 18) snakeArr[0].y = 0;
    if (snakeArr[0].y < 0) snakeArr[0].y = 17;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add(index === 0 ? 'head' : 'snake');
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore ? JSON.parse(hiscore) : 0;
hiscoreBox.innerHTML = "Hi Score: " + hiscoreval;

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp": inputDir = { x: 0, y: -1 }; break;
        case "ArrowDown": inputDir = { x: 0, y: 1 }; break;
        case "ArrowLeft": inputDir = { x: -1, y: 0 }; break;
        case "ArrowRight": inputDir = { x: 1, y: 0 }; break;
    }
});
