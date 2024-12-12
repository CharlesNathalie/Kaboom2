import { RandomEval } from './randomeval.js';
import { Language as l } from "./language.js";
import { ServerError } from "./servererror.js"

export class Kaboom {

    private labelNumberOfMines: HTMLLabelElement;
    private buttonLogOff: HTMLButtonElement;
    private labelGridSize: HTMLLabelElement;
    private inputGridSizeSlider: HTMLInputElement;
    private buttonPlay: HTMLButtonElement;
    private buttonStop: HTMLButtonElement;
    private inputMineCount: HTMLInputElement;
    private textScore: HTMLDivElement;
    private buttonGrid: HTMLDivElement;

    private gameActive: boolean = false;
    private gridSize: number = 0;
    private buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-grid button');
    private numberOfButtons: number = 0;
    private mineCount: number = 0;
    private score: number = 0;
    private startTime: Date | null = null;
    private endTime: Date | null = null;
    private randomEval: RandomEval = new RandomEval();

    constructor() {
        this.labelNumberOfMines = document.getElementById('labelNumberOfMines') as HTMLLabelElement;
        this.buttonLogOff = document.getElementById('logOff') as HTMLButtonElement
        this.labelGridSize = document.getElementById('labelGridSize') as HTMLLabelElement;
        this.inputGridSizeSlider = document.getElementById('gridSizeSlider') as HTMLInputElement;
        this.buttonPlay = document.getElementById('playButton') as HTMLButtonElement;
        this.buttonStop = document.getElementById('stopButton') as HTMLButtonElement;
        this.inputMineCount = document.getElementById('mineCount') as HTMLInputElement;
        this.textScore = document.getElementById('score') as HTMLDivElement;
        this.buttonGrid = document.getElementById('buttonGrid') as HTMLDivElement;
        this.initialize();
    }

    private addGameToDatabase = async (): Promise<void> => {
        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const GameID: number = 0;
            //const PlayerID: number = parseInt(`${localStorage.getItem('playerID')}`);
            const NumberOfButtons: number = this.numberOfButtons;
            const MineCount: number = this.mineCount;
            const Score: number = this.score;
            const TimeInMilliSeconds: number = this.startTime && this.endTime ? Math.floor((this.endTime.getTime() - this.startTime.getTime())) : 1;

            const game = { GameID, /*PlayerID, */NumberOfButtons, MineCount, Score, TimeInMilliSeconds };
            const jsonGame = JSON.stringify(game);

            const response = await fetch(`${baseURL}/en/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${localStorage.getItem('token')}`
                },
                body: jsonGame
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || l.jsNetworkResponseWasNotOk[l.index]);
            }

            const data = await response.json();
            alert(l.jsGameAddedSuccessfully[l.index]);
            console.log(l.format(l.jsGameAdded_[l.index], data));
        } catch (error) {
            console.error(l.format(l.jsPproblemAddingGameError_[l.index], error));
            alert(l.format(l.jsFailedToAddGame_PleaseTryAgain[l.index], error));
        }
    }

    private generateRandomValues(): void {
        let zerosCount: number = 0;
        let onesCount: number = 0;

        this.buttons = document.querySelectorAll('.button-grid button');

        // Reset all buttons
        this.buttons.forEach(button => {
            button.style.backgroundColor = '#333'; // Reset background color
            button.disabled = false; // Enable buttons
        });

        // Shuffle buttons array
        const shuffledButtons: HTMLButtonElement[] = Array.from(this.buttons).sort(() => Math.random() - 0.5);

        // Assign zeros and ones with eval expressions
        shuffledButtons.forEach((button, index) => {
            if (zerosCount < this.mineCount) {
                let found: boolean = false;
                let randomIndex: number = 0;
                while (!found) {
                    randomIndex = Math.floor(Math.random() * this.randomEval.evalArray.length);
                    if (eval(this.randomEval.evalArray[randomIndex]) === 0) {
                        found = true;
                    };
                };
                button.dataset.value = '' + randomIndex;
                zerosCount++;
            } else {
                let found: boolean = false;
                let randomIndex: number = 0;
                while (!found) {
                    randomIndex = Math.floor(Math.random() * this.randomEval.evalArray.length);
                    if (eval(this.randomEval.evalArray[randomIndex]) != 0) {
                        found = true;
                    };
                };
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

    private handleButtonClick(button: HTMLButtonElement): void {
        if (this.gameActive && !button.disabled) {
            button.disabled = true; // Disable the button after click
            const value = eval(this.randomEval.evalArray[parseInt('' + button.dataset.value)]);
            if (value === 0) {
                button.style.backgroundColor = 'red';
                this.gameActive = false;
                this.buttons.forEach(btn => btn.disabled = true);
                this.buttonPlay.style.display = 'inline-block';
                this.buttonStop.style.display = 'none';
                if (this.textScore) this.textScore.textContent = l.format(l.jsGameOverScore_[l.index], this.score);
                this.endTime = new Date(); // Set end time
                this.addGameToDatabase();
            } else {
                button.style.backgroundColor = 'green';
                this.score++;
                if (this.textScore) this.textScore.textContent = l.format(l.textScore_[l.index], this.score);
                if (this.score === this.numberOfButtons - this.mineCount) {
                    this.gameActive = false;
                    this.buttons.forEach(btn => btn.disabled = true);
                    this.buttonPlay.style.display = 'inline-block';
                    this.buttonStop.style.display = 'none';
                    if (this.textScore) this.textScore.textContent = l.format(l.textYouWinScore_[l.index], this.score);
                    this.endTime = new Date(); // Set end time
                    this.addGameToDatabase();
                }
            }
        }
    }

    private handleGridSizeChange(): void {
        this.buttonStop.click();
        this.updateGrid();
    }

    private handleLogOffClick(): void {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    }

    private handleMineCountKeyUp(): void {
        this.buttonStop.click();
        this.updateGrid();
    }

    private handlePlayButtonClick(): void {
        if (this.mineCount > 0 && this.mineCount < this.numberOfButtons) {
            this.updateGrid();
            this.generateRandomValues();
            this.buttonPlay.innerText = l.textReplay[l.index];
            this.buttonPlay.style.display = 'none';
            this.buttonStop.style.display = 'inline-block';
        } else {
            alert(l.format(l.jsPleaseEnterNumberBetween1And_[l.index], (this.numberOfButtons - 1)));
        }
    }

    private handleStopButtonClick(): void {
        this.gameActive = false;
        this.buttons = document.querySelectorAll('.button-grid button');
        this.buttons.forEach(btn => btn.disabled = true);
        this.buttonPlay.style.display = 'inline-block';
        this.buttonStop.style.display = 'none';
    }

    private initialize(): void {
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

    private initializeEventListeners(): void {
        this.inputGridSizeSlider.addEventListener('change', this.handleGridSizeChange.bind(this));
        this.buttonPlay.addEventListener('click', this.handlePlayButtonClick.bind(this));
        this.buttonStop.addEventListener('click', this.handleStopButtonClick.bind(this));
        this.inputMineCount.addEventListener('keyup', this.handleMineCountKeyUp.bind(this));
        this.buttonLogOff.addEventListener('click', this.handleLogOffClick.bind(this));
    }

    private redirect(): void {
        const token = localStorage.getItem("token");
        const language = localStorage.getItem("language");

        if (language == null) {
            window.location.href = "index.html";
        } else {
            if (token == null) {
                window.location.href = "login.html";
                return;
            }
        }
    }

    private removeEventListeners(): void {
        this.inputGridSizeSlider.removeEventListener('change', this.handleGridSizeChange.bind(this));
        this.buttonPlay.removeEventListener('click', this.handlePlayButtonClick.bind(this));
        this.buttonStop.removeEventListener('click', this.handleStopButtonClick.bind(this));
        this.inputMineCount.removeEventListener('keyup', this.handleMineCountKeyUp.bind(this));
        this.buttonLogOff.removeEventListener('click', this.handleLogOffClick.bind(this));
        this.buttons.forEach(button => button.removeEventListener('click', this.handleButtonClick.bind(this, button)));
    }

    private resetValues(): void {
        this.inputGridSizeSlider = document.getElementById('gridSizeSlider') as HTMLInputElement;
        this.gridSize = parseInt(this.inputGridSizeSlider.value);
        this.numberOfButtons = this.gridSize * this.gridSize;
        this.inputMineCount = document.getElementById('mineCount') as HTMLInputElement;
        this.mineCount = parseInt(this.inputMineCount.value, 10);
    }

    private updateGrid(): void {
        this.resetValues();

        const buttonGrid = document.getElementById('buttonGrid');
        if (buttonGrid) {
            buttonGrid.innerHTML = ''; // Clear existing buttons

            for (let i = 1; i <= this.numberOfButtons; i++) {
                const button: HTMLButtonElement = document.createElement('button');
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

    public destroy(): void {
        this.removeEventListeners();
    }
}

// Initialize the Kaboom class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Kaboom();
});
