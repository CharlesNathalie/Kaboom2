var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RandomEval } from './randomeval.js';
export class Index {
    constructor() {
        this.gameActive = false;
        this.gridSize = 0;
        this.buttons = document.querySelectorAll('.button-grid button');
        this.numberOfButtons = 0;
        this.mineCount = 0;
        this.score = 0;
        this.startTime = null;
        this.endTime = null;
        this.randomEval = new RandomEval();
        if (!localStorage.getItem('userToken') || !localStorage.getItem('playerID')) {
            window.location.href = 'auth/login.html';
        }
        this.resetValues();
        this.initializeEventListeners();
        this.updateGrid();
    }
    resetValues() {
        const gridSizeElement = document.getElementById('gridSizeSlider');
        this.gridSize = parseInt(gridSizeElement.value);
        this.numberOfButtons = this.gridSize * this.gridSize;
        const mineCountElement = document.getElementById('mineCount');
        this.mineCount = parseInt(mineCountElement.value, 10);
    }
    initializeEventListeners() {
        var _a, _b, _c, _d, _e;
        (_a = document.getElementById('gridSizeSlider')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', () => {
            var _a;
            (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
            this.updateGrid();
        });
        (_b = document.getElementById('playButton')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            if (this.mineCount > 0 && this.mineCount < this.numberOfButtons) {
                this.updateGrid();
                this.generateRandomValues();
                const playButton = document.getElementById('playButton');
                if (playButton) {
                    playButton.innerText = 'Replay';
                    playButton.style.display = 'none';
                }
                const stopButton = document.getElementById('stopButton');
                if (stopButton)
                    stopButton.style.display = 'inline-block';
            }
            else {
                alert(`Please enter a number between 1 and ${this.numberOfButtons - 1}`);
            }
        });
        (_c = document.getElementById('stopButton')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
            this.gameActive = false;
            this.buttons = document.querySelectorAll('.button-grid button');
            this.buttons.forEach(btn => btn.disabled = true);
            const playButton = document.getElementById('playButton');
            if (playButton)
                playButton.style.display = 'inline-block';
            const stopButton = document.getElementById('stopButton');
            if (stopButton)
                stopButton.style.display = 'none';
        });
        (_d = document.getElementById('mineCount')) === null || _d === void 0 ? void 0 : _d.addEventListener('keyup', () => {
            var _a;
            (_a = document.getElementById('stopButton')) === null || _a === void 0 ? void 0 : _a.click();
            this.updateGrid();
        });
        (_e = document.getElementById('logOff')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('playerID');
            window.location.href = 'auth/login.html';
        });
    }
    generateRandomValues() {
        let zerosCount = 0;
        let onesCount = 0;
        this.buttons = document.querySelectorAll('.button-grid button');
        // Reset all buttons
        this.buttons.forEach(button => {
            button.style.backgroundColor = '#333'; // Reset background color
            button.disabled = false; // Enable buttons
        });
        // Shuffle buttons array
        const shuffledButtons = Array.from(this.buttons).sort(() => Math.random() - 0.5);
        // Assign zeros and ones with eval expressions
        shuffledButtons.forEach((button, index) => {
            if (zerosCount < this.mineCount) {
                let found = false;
                let randomIndex = 0;
                while (!found) {
                    randomIndex = Math.floor(Math.random() * this.randomEval.evalArray.length);
                    if (eval(this.randomEval.evalArray[randomIndex]) === 0) {
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
                    randomIndex = Math.floor(Math.random() * this.randomEval.evalArray.length);
                    if (eval(this.randomEval.evalArray[randomIndex]) != 0) {
                        found = true;
                    }
                    ;
                }
                ;
                button.dataset.value = '' + randomIndex;
                onesCount++;
            }
        });
        this.gameActive = true;
        this.score = 0; // Reset score
        this.startTime = new Date(); // Set start time
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}`;
        }
    }
    updateGrid() {
        this.resetValues();
        const buttonGrid = document.getElementById('buttonGrid');
        if (buttonGrid) {
            buttonGrid.innerHTML = ''; // Clear existing buttons
            for (let i = 1; i <= this.numberOfButtons; i++) {
                const button = document.createElement('button');
                button.className = 'game-button';
                button.id = `button${i}`;
                buttonGrid.appendChild(button);
            }
            // Update CSS grid layout
            buttonGrid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
            // Add event listeners to new buttons
            this.buttons = document.querySelectorAll('.button-grid button');
            this.buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    if (this.gameActive && !button.disabled) {
                        button.disabled = true; // Disable the button after click
                        const value = eval(this.randomEval.evalArray[parseInt('' + button.dataset.value)]);
                        if (value === 0) {
                            button.style.backgroundColor = 'red';
                            this.gameActive = false;
                            document.querySelectorAll('.button-grid button')
                                .forEach(btn => btn.disabled = true);
                            const playButton = document.getElementById('playButton');
                            const stopButton = document.getElementById('stopButton');
                            if (playButton)
                                playButton.style.display = 'inline-block';
                            if (stopButton)
                                stopButton.style.display = 'none';
                            const scoreElement = document.getElementById('score');
                            if (scoreElement)
                                scoreElement.textContent = `Game Over, Score: ${this.score}`;
                            this.endTime = new Date(); // Set end time
                            this.addGameToDatabase();
                        }
                        else {
                            button.style.backgroundColor = 'green';
                            this.score++;
                            const scoreElement = document.getElementById('score');
                            if (scoreElement)
                                scoreElement.textContent = `Score: ${this.score}`;
                            if (this.score === this.numberOfButtons - this.mineCount) {
                                this.gameActive = false;
                                document.querySelectorAll('.button-grid button')
                                    .forEach(btn => btn.disabled = true);
                                const playButton = document.getElementById('playButton');
                                const stopButton = document.getElementById('stopButton');
                                if (playButton)
                                    playButton.style.display = 'inline-block';
                                if (stopButton)
                                    stopButton.style.display = 'none';
                                const scoreElement = document.getElementById('score');
                                if (scoreElement)
                                    scoreElement.textContent = `You Win! Score: ${this.score}`;
                                this.endTime = new Date(); // Set end time
                                this.addGameToDatabase();
                            }
                        }
                    }
                });
            });
        }
        this.resetValues();
    }
    addGameToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const GameID = 0;
                const PlayerID = parseInt(`${localStorage.getItem('playerID')}`);
                const NumberOfButtons = this.numberOfButtons;
                const MineCount = this.mineCount;
                const Score = this.score;
                const TimeInSeconds = this.startTime && this.endTime ? Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 1000) : 0;
                const game = { GameID, PlayerID, NumberOfButtons, MineCount, Score, TimeInSeconds };
                const jsonGame = JSON.stringify(game);
                const response = yield fetch(`${baseURL}/en/api/games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${localStorage.getItem('userToken')}`
                    },
                    body: jsonGame
                });
                if (!response.ok) {
                    const errorText = yield response.text();
                    throw new Error(errorText || 'Network response was not ok');
                }
                const data = yield response.json();
                alert(`Game added successful!`);
                console.log('Game added:', data);
            }
            catch (error) {
                console.error('There was a problem with the add game request:', error);
                alert(`Failed to add game: ${error}. Please try again.`);
            }
        });
    }
}
// Initialize the Index class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Index();
});
