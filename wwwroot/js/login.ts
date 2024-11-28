export class Login {
    constructor() {
        this.InitializeForm();
    }

    private InitializeForm(): void {
        const form = document.getElementById('loginForm') as HTMLFormElement;
        form.addEventListener('submit', this.handleFormLoginSubmit.bind(this));
    }

    private async handleFormLoginSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const FirstName = '';
        const LastName = '';
        const Initial = '';
        const Email = (document.getElementById('Email') as HTMLInputElement).value;
        const Password = (document.getElementById('Password') as HTMLInputElement).value;

        const user = { FirstName, LastName, Initial, Email, Password };
        const jsonUser = JSON.stringify(user);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/en/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonUser
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }

            const data = await response.json();
            alert(`Login successful!`);
            window.location.href = '../index.html';
        } catch (errorMessage) {
            console.error('There was a problem with the login request:', errorMessage);
            alert(`Login failed: ${errorMessage}. Please try again.`);
        }
    }
}

// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Login();
});
