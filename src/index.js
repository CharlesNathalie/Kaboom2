"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const evalArray_1 = require("./evalArray");
let gameActive = false;
let score = 0;
function generateRandomValues(numZeros) {
    const buttons = document.querySelectorAll('.button-grid button');
    let zerosCount = 0;
    let onesCount = 0;
    // Reset all buttons
    buttons.forEach(button => {
        button.style.backgroundColor = '#333'; // Reset background color
        button.disabled = false; // Enable buttons
    });
    // Shuffle buttons array
    const shuffledButtons = Array.from(buttons).sort(() => Math.random() - 0.5);
    // Assign zeros and ones with eval expressions
    shuffledButtons.forEach((button, index) => {
        if (zerosCount < numZeros) {
            let found = false;
            let randomIndex = 0;
            while (!found) {
                randomIndex = Math.floor(Math.random() * evalArray_1.evalArray.length);
                if (eval(evalArray_1.evalArray[randomIndex]) === 0) {
                    found = true;
                }
                ;
            }
            ;
            button.dataset.value = '' + randomIndex;
            zerosCount++;
        }
        else {
            let found = false;
            let randomIndex = 0;
            while (!found) {
                randomIndex = Math.floor(Math.random() * evalArray_1.evalArray.length);
                if (eval(evalArray_1.evalArray[randomIndex]) != 0) {
                    found = true;
                }
                ;
            }
            ;
            button.dataset.value = '' + randomIndex;
            onesCount++;
        }
    });
    gameActive = true;
    score = 0; // Reset score
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}
function updateGrid() {
    const gridSizeElement = document.getElementById('gridSizeSlider');
    const gridSize = parseInt(gridSizeElement.value);
    const numberOfButtons = gridSize * gridSize;
    const buttonGrid = document.getElementById('buttonGrid');
    if (buttonGrid) {
        buttonGrid.innerHTML = ''; // Clear existing buttons
        for (let i = 1; i <= numberOfButtons; i++) {
            const button = document.createElement('button');
            button.className = 'game-button';
            button.id = `button${i}`;
            buttonGrid.appendChild(button);
        }
        // Update CSS grid layout
        buttonGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        // Add event listeners to new buttons
        const buttons = document.querySelectorAll('.button-grid button');
        buttons.forEach((button, index) => {
            // Clone the button to remove existing event listeners
            const newButton = button.cloneNode(true);
            button.replaceWith(newButton);
            newButton.addEventListener('click', function () {
                if (gameActive && !newButton.disabled) {
                    newButton.disabled = true; // Disable the button after click
                    const value = eval(evalArray_1.evalArray[parseInt('' + newButton.dataset.value)]);
                    if (value === 0) {
                        newButton.style.backgroundColor = 'red';
                        gameActive = false;
                        const buttons2 = document.querySelectorAll('.button-grid button');
                        buttons2.forEach(btn => btn.disabled = true);
                        const playButton = document.getElementById('playButton');
                        const stopButton = document.getElementById('stopButton');
                        if (playButton)
                            playButton.style.display = 'inline-block';
                        if (stopButton)
                            stopButton.style.display = 'none';
                        const scoreElement = document.getElementById('score');
                        if (scoreElement)
                            scoreElement.textContent = `Game Over, Score: ${score}`;
                    }
                    else {
                        newButton.style.backgroundColor = 'green';
                        score++;
                        const scoreElement = document.getElementById('score');
                        if (scoreElement)
                            scoreElement.textContent = `Score: ${score}`;
                    }
                }
            });
        });
    }
}
(_a = document.getElementById('gridSizeSlider')) === null || _a === void 0 ? void 0 : _a.addEventListener('input', function () {
    var _a;
    (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
    updateGrid();
});
(_b = document.getElementById('playButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    const numZerosElement = document.getElementById('numZeros');
    const numZeros = parseInt(numZerosElement.value, 10);
    const totalButtons = document.querySelectorAll('.button-grid button').length;
    if (numZeros > 0 && numZeros < totalButtons) {
        generateRandomValues(numZeros);
        this.innerText = 'Replay';
        this.style.display = 'none';
        const stopButton = document.getElementById('stopButton');
        if (stopButton)
            stopButton.style.display = 'inline-block';
    }
    else {
        alert(`Please enter a number between 1 and ${totalButtons - 1}`);
    }
});
(_c = document.getElementById('stopButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    gameActive = false;
    const buttons = document.querySelectorAll('.button-grid button');
    buttons.forEach(btn => btn.disabled = true);
    const playButton = document.getElementById('playButton');
    if (playButton)
        playButton.style.display = 'inline-block';
    this.style.display = 'none';
});
(_d = document.getElementById('numZeros')) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', function () {
    var _a;
    (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
    updateGrid();
});
// Initialize grid on page load
updateGrid();
