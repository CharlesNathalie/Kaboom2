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
import { Language as l } from "./language.js";
export class Kaboom {
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
        this.addGameToDatabase = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const GameID = 0;
                //const PlayerID: number = parseInt(`${localStorage.getItem('playerID')}`);
                const NumberOfButtons = this.numberOfButtons;
                const MineCount = this.mineCount;
                const Score = this.score;
                const TimeInMilliSeconds = this.startTime && this.endTime ? Math.floor((this.endTime.getTime() - this.startTime.getTime())) : 1;
                const game = { GameID, /*PlayerID, */ NumberOfButtons, MineCount, Score, TimeInMilliSeconds };
                const jsonGame = JSON.stringify(game);
                const response = yield fetch(`${baseURL}/en/api/games`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: jsonGame
                });
                if (!response.ok) {
                    const errorText = yield response.text();
                    throw new Error(errorText || l.jsNetworkResponseWasNotOk[l.index]);
                }
                const data = yield response.json();
                alert(l.jsGameAddedSuccessfully[l.index]);
                console.log(l.format(l.jsGameAdded_[l.index], data));
            }
            catch (error) {
                console.error(l.format(l.jsPproblemAddingGameError_[l.index], error));
                alert(l.format(l.jsFailedToAddGame_PleaseTryAgain[l.index], error));
            }
        });
        this.labelNumberOfMines = document.getElementById('labelNumberOfMines');
        this.buttonLogOff = document.getElementById('logOff');
        this.labelGridSize = document.getElementById('labelGridSize');
        this.inputGridSizeSlider = document.getElementById('gridSizeSlider');
        this.buttonPlay = document.getElementById('playButton');
        this.buttonStop = document.getElementById('stopButton');
        this.inputMineCount = document.getElementById('mineCount');
        this.textScore = document.getElementById('score');
        this.buttonGrid = document.getElementById('buttonGrid');
        this.initialize();
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
        if (this.textScore) {
            this.textScore.textContent = l.format(l.textScore_[l.index], this.score);
        }
    }
    handleButtonClick(button) {
        if (this.gameActive && !button.disabled) {
            button.disabled = true; // Disable the button after click
            const value = eval(this.randomEval.evalArray[parseInt('' + button.dataset.value)]);
            if (value === 0) {
                button.style.backgroundColor = 'red';
                this.gameActive = false;
                this.buttons.forEach(btn => btn.disabled = true);
                this.buttonPlay.style.display = 'inline-block';
                this.buttonStop.style.display = 'none';
                if (this.textScore)
                    this.textScore.textContent = l.format(l.jsGameOverScore_[l.index], this.score);
                this.endTime = new Date(); // Set end time
                this.addGameToDatabase();
            }
            else {
                button.style.backgroundColor = 'green';
                this.score++;
                if (this.textScore)
                    this.textScore.textContent = l.format(l.textScore_[l.index], this.score);
                if (this.score === this.numberOfButtons - this.mineCount) {
                    this.gameActive = false;
                    this.buttons.forEach(btn => btn.disabled = true);
                    this.buttonPlay.style.display = 'inline-block';
                    this.buttonStop.style.display = 'none';
                    if (this.textScore)
                        this.textScore.textContent = l.format(l.textYouWinScore_[l.index], this.score);
                    this.endTime = new Date(); // Set end time
                    this.addGameToDatabase();
                }
            }
        }
    }
    handleGridSizeChange() {
        this.buttonStop.click();
        this.updateGrid();
    }
    handleLogOffClick() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }
    handleMineCountKeyUp() {
        this.buttonStop.click();
        this.updateGrid();
    }
    handlePlayButtonClick() {
        if (this.mineCount > 0 && this.mineCount < this.numberOfButtons) {
            this.updateGrid();
            this.generateRandomValues();
            this.buttonPlay.innerText = l.textReplay[l.index];
            this.buttonPlay.style.display = 'none';
            this.buttonStop.style.display = 'inline-block';
        }
        else {
            alert(l.format(l.jsPleaseEnterNumberBetween1And_[l.index], (this.numberOfButtons - 1)));
        }
    }
    handleStopButtonClick() {
        this.gameActive = false;
        this.buttons = document.querySelectorAll('.button-grid button');
        this.buttons.forEach(btn => btn.disabled = true);
        this.buttonPlay.style.display = 'inline-block';
        this.buttonStop.style.display = 'none';
    }
    initialize() {
        this.redirect();
        this.labelGridSize.textContent = l.labelGridSize[l.index];
        this.buttonPlay.textContent = l.buttonPlay[l.index];
        this.buttonStop.textContent = l.buttonStop[l.index];
        this.buttonLogOff.textContent = l.buttonLogOff[l.index];
        this.textScore.textContent = l.format(l.textScore_[l.index], this.score);
        this.resetValues();
        this.initializeEventListeners();
        this.updateGrid();
        document.title = l.titleKaboom[l.index];
    }
    initializeEventListeners() {
        this.inputGridSizeSlider.addEventListener('change', this.handleGridSizeChange.bind(this));
        this.buttonPlay.addEventListener('click', this.handlePlayButtonClick.bind(this));
        this.buttonStop.addEventListener('click', this.handleStopButtonClick.bind(this));
        this.inputMineCount.addEventListener('keyup', this.handleMineCountKeyUp.bind(this));
        this.buttonLogOff.addEventListener('click', this.handleLogOffClick.bind(this));
    }
    redirect() {
        const token = localStorage.getItem("token");
        const language = localStorage.getItem("language");
        if (language == null) {
            window.location.href = "index.html";
        }
        else {
            if (token == null) {
                window.location.href = "login.html";
                return;
            }
        }
    }
    removeEventListeners() {
        this.inputGridSizeSlider.removeEventListener('change', this.handleGridSizeChange.bind(this));
        this.buttonPlay.removeEventListener('click', this.handlePlayButtonClick.bind(this));
        this.buttonStop.removeEventListener('click', this.handleStopButtonClick.bind(this));
        this.inputMineCount.removeEventListener('keyup', this.handleMineCountKeyUp.bind(this));
        this.buttonLogOff.removeEventListener('click', this.handleLogOffClick.bind(this));
        this.buttons.forEach(button => button.removeEventListener('click', this.handleButtonClick.bind(this, button)));
    }
    resetValues() {
        this.inputGridSizeSlider = document.getElementById('gridSizeSlider');
        this.gridSize = parseInt(this.inputGridSizeSlider.value);
        this.numberOfButtons = this.gridSize * this.gridSize;
        this.inputMineCount = document.getElementById('mineCount');
        this.mineCount = parseInt(this.inputMineCount.value, 10);
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
                button.addEventListener('click', this.handleButtonClick.bind(this, button));
            });
        }
        this.resetValues();
    }
    destroy() {
        this.removeEventListeners();
    }
}
// Initialize the Kaboom class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Kaboom();
});
