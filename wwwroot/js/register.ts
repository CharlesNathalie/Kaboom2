﻿export class Register {
    constructor() {
        this.InitializeForm();
    }

    private InitializeForm(): void {
        const form = document.getElementById('registerForm') as HTMLFormElement;
        form.addEventListener('submit', this.handleFormRegisterSubmit.bind(this));
    }

    private async handleFormRegisterSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const FirstName = (document.getElementById('FirstName') as HTMLInputElement).value;
        const LastName = (document.getElementById('LastName') as HTMLInputElement).value;
        const Initial = (document.getElementById('Initial') as HTMLInputElement).value;
        const Email = (document.getElementById('Email') as HTMLInputElement).value;
        const Password = (document.getElementById('Password') as HTMLInputElement).value;
        const ConfirmPassword = (document.getElementById('ConfirmPassword') as HTMLInputElement).value;

        if (Password !== ConfirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const user = { FirstName, LastName, Initial, Email, Password };
        const jsonUser = JSON.stringify(user);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/en/api/auth/register`, {
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
            console.log('User registered:', data);
            if (window.location.hostname !== 'localhost') {
                alert(`Registration successful!`);
            }
            else {
                alert(`Registration successful! ${data}`);
            }
            localStorage.setItem('RegisterEmail', Email); // Store email in localStorage
            localStorage.setItem('userToken', data.Token);
            localStorage.setItem('playerID', data.PlayerID);
            window.location.href = 'verifyemail.html';
        } catch (error) {
            console.error('There was a problem with the registration request:', error);
            alert(`Registration failed: ${error}. Please try again.`);
        }
    }
}

// Initialize the Register class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Register();
});
