export class VerifyEmail {
    constructor() {
        this.InitializeForm();
        this.SetEmailValue(); // Set the email value on initialization
    }

    private InitializeForm(): void {
        const form = document.getElementById('verifyEmailForm') as HTMLFormElement;
        form.addEventListener('submit', this.handleFormLoginSubmit.bind(this));
    }

    private SetEmailValue(): void {
        const emailInput = document.getElementById('Email') as HTMLInputElement;
        const storedEmail = localStorage.getItem('RegisterEmail');
        if (storedEmail) {
            emailInput.value = storedEmail;
        }
        localStorage.removeItem("RegisterEmail");
    }

    private async handleFormLoginSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const Email = (document.getElementById('Email') as HTMLInputElement).value;
        const TempCode = (document.getElementById('TempCode') as HTMLInputElement).value;

        const code = { Email, TempCode };
        const jsonCode = JSON.stringify(code);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/en/api/auth/verifyemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonCode
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Network response was not ok');
            }

            const data = await response.json();
            localStorage.setItem('userToken', data.token);
            alert('Email verification successful!');
            window.location.href = '../index.html';
        } catch (errorMessage) {
            console.error('There was a problem with the verify email request:', errorMessage);
            alert(`Login failed: ${errorMessage}. Please try again.`);
        }
    }
}

// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new VerifyEmail();
});
