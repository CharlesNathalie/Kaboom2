let gameActive: boolean = false;
let score: number = 0;

function generateRandomValues(numZeros: number): void {
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-grid button');
    let zerosCount: number = 0;
    let onesCount: number = 0;

    // Reset all buttons
    buttons.forEach(button => {
        button.style.backgroundColor = '#333'; // Reset background color
        button.disabled = false; // Enable buttons
        button.dataset.value = ''; // Reset value
    });

    // Shuffle buttons array
    const shuffledButtons: HTMLButtonElement[] = Array.from(buttons).sort(() => Math.random() - 0.5);

    // Assign zeros
    shuffledButtons.forEach(button => {
        if (zerosCount < numZeros) {
            button.dataset.value = '0';
            zerosCount++;
        } else {
            button.dataset.value = '1';
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

function updateGrid(): void {
    const gridSizeElement = document.getElementById('gridSizeSlider') as HTMLInputElement;
    const gridSize: number = parseInt(gridSizeElement.value);
    const numberOfButtons: number = gridSize * gridSize;
    const buttonGrid = document.getElementById('buttonGrid');
    if (buttonGrid) {
        buttonGrid.innerHTML = ''; // Clear existing buttons

        for (let i = 1; i <= numberOfButtons; i++) {
            const button: HTMLButtonElement = document.createElement('button');
            button.className = 'game-button';
            button.id = `button${i}`;
            buttonGrid.appendChild(button);
        }

        // Update CSS grid layout
        buttonGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        // Add event listeners to new buttons
        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-grid button');

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                if (gameActive && !button.disabled) {
                    button.disabled = true; // Disable the button after click
                    if (button.dataset.value === '0') {
                        button.style.backgroundColor = 'red';
                        gameActive = false;
                        const buttons2: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-grid button');
                        buttons2.forEach(btn => btn.disabled = true);
                        const playButton = document.getElementById('playButton');
                        const stopButton = document.getElementById('stopButton');
                        if (playButton) playButton.style.display = 'inline-block';
                        if (stopButton) stopButton.style.display = 'none';
                        const scoreElement = document.getElementById('score');
                        if (scoreElement) scoreElement.textContent = `Game Over, Score: ${score}`;
                    } else {
                        button.style.backgroundColor = 'green';
                        score++;
                        const scoreElement = document.getElementById('score');
                        if (scoreElement) scoreElement.textContent = `Score: ${score}`;
                    }
                }
            });
        });
    }
}

document.getElementById('gridSizeSlider')?.addEventListener('input', updateGrid);
document.getElementById('playButton')?.addEventListener('click', function () {
    const numZerosElement = document.getElementById('numZeros') as HTMLInputElement;
    const numZeros: number = parseInt(numZerosElement.value, 10);
    const totalButtons: number = document.querySelectorAll('.button-grid button').length;

    if (numZeros > 0 && numZeros < totalButtons) {
        generateRandomValues(numZeros);
        this.innerText = 'Replay';
        this.style.display = 'none';
        const stopButton = document.getElementById('stopButton');
        if (stopButton) stopButton.style.display = 'inline-block';
    } else {
        alert(`Please enter a number between 1 and ${totalButtons - 1}`);
    }
});

document.getElementById('stopButton')?.addEventListener('click', function () {
    gameActive = false;
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-grid button');
    buttons.forEach(btn => btn.disabled = true);
    const playButton = document.getElementById('playButton');
    if (playButton) playButton.style.display = 'inline-block';
    this.style.display = 'none';
});

// Initialize grid on page load
updateGrid();
