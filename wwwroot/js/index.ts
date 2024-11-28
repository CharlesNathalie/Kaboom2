import { RandomEval } from './randomeval.js';

export class Index {
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
        if (!localStorage.getItem('userToken') || !localStorage.getItem('playerID')) {
            window.location.href = 'auth/login.html';
        }

        this.resetValues();
        this.initializeEventListeners();
        this.updateGrid();
    }

    private resetValues(): void {
        const gridSizeElement = document.getElementById('gridSizeSlider') as HTMLInputElement;
        this.gridSize = parseInt(gridSizeElement.value);
        this.numberOfButtons = this.gridSize * this.gridSize;
        const mineCountElement = document.getElementById('mineCount') as HTMLInputElement;
        this.mineCount = parseInt(mineCountElement.value, 10);
    }

    private initializeEventListeners(): void {
        document.getElementById('gridSizeSlider')?.addEventListener('change', () => {
            document.getElementById('stopButton')?.click();
            this.updateGrid();
        });

        document.getElementById('playButton')?.addEventListener('click', () => {
            if (this.mineCount > 0 && this.mineCount < this.numberOfButtons) {
                this.updateGrid();
                this.generateRandomValues();
                const playButton = document.getElementById('playButton');
                if (playButton) {
                    playButton.innerText = 'Replay';
                    playButton.style.display = 'none';
                }
                const stopButton = document.getElementById('stopButton');
                if (stopButton) stopButton.style.display = 'inline-block';
            } else {
                alert(`Please enter a number between 1 and ${this.numberOfButtons - 1}`);
            }
        });

        document.getElementById('stopButton')?.addEventListener('click', () => {
            this.gameActive = false;
            this.buttons = document.querySelectorAll('.button-grid button');
            this.buttons.forEach(btn => btn.disabled = true);
            const playButton = document.getElementById('playButton');
            if (playButton) playButton.style.display = 'inline-block';
            const stopButton = document.getElementById('stopButton');
            if (stopButton) stopButton.style.display = 'none';
        });

        document.getElementById('mineCount')?.addEventListener('keyup', () => {
            document.getElementById('stopButton')?.click();
            this.updateGrid();
        });

        document.getElementById('logOff')?.addEventListener('click', () => {
            localStorage.removeItem('userToken');
            localStorage.removeItem('playerID');
            window.location.href = 'auth/login.html';
        });
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
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `Score: ${this.score}`;
        }
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
                button.addEventListener('click', () => {
                    if (this.gameActive && !button.disabled) {
                        button.disabled = true; // Disable the button after click
                        const value = eval(this.randomEval.evalArray[parseInt('' + button.dataset.value)]);
                        if (value === 0) {
                            button.style.backgroundColor = 'red';
                            this.gameActive = false;
                            (document.querySelectorAll('.button-grid button') as NodeListOf<HTMLButtonElement>)
                                .forEach(btn => btn.disabled = true);
                            const playButton = document.getElementById('playButton');
                            const stopButton = document.getElementById('stopButton');
                            if (playButton) playButton.style.display = 'inline-block';
                            if (stopButton) stopButton.style.display = 'none';
                            const scoreElement = document.getElementById('score');
                            if (scoreElement) scoreElement.textContent = `Game Over, Score: ${this.score}`;
                            this.endTime = new Date(); // Set end time
                            this.addGameToDatabase();
                        } else {
                            button.style.backgroundColor = 'green';
                            this.score++;
                            const scoreElement = document.getElementById('score');
                            if (scoreElement) scoreElement.textContent = `Score: ${this.score}`;
                            if (this.score === this.numberOfButtons - this.mineCount) {
                                this.gameActive = false;
                                (document.querySelectorAll('.button-grid button') as NodeListOf<HTMLButtonElement>)
                                    .forEach(btn => btn.disabled = true);
                                const playButton = document.getElementById('playButton');
                                const stopButton = document.getElementById('stopButton');
                                if (playButton) playButton.style.display = 'inline-block';
                                if (stopButton) stopButton.style.display = 'none';
                                const scoreElement = document.getElementById('score');
                                if (scoreElement) scoreElement.textContent = `You Win! Score: ${this.score}`;
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

    private async addGameToDatabase(): Promise<void> {
        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const GameID: number = 0;
            const PlayerID: number = parseInt(`${localStorage.getItem('playerID')}`);
            const NumberOfButtons: number = this.numberOfButtons;
            const MineCount: number = this.mineCount;
            const Score: number = this.score;
            const TimeInSeconds: number = this.startTime && this.endTime ? Math.floor((this.endTime.getTime() - this.startTime.getTime()) / 1000) : 0;

            const game = { GameID, PlayerID, NumberOfButtons, MineCount, Score, TimeInSeconds };
            const jsonGame = JSON.stringify(game);

            const response = await fetch(`${baseURL}/en/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': `Bearer ${localStorage.getItem('userToken')}`
                },
                body: jsonGame
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }

            const data = await response.json();
            alert(`Game added successful!`);
            console.log('Game added:', data);
        } catch (error) {
            console.error('There was a problem with the add game request:', error);
            alert(`Failed to add game: ${error}. Please try again.`);
        }
    }
}

// Initialize the Index class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Index();
});


