var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Login {
    constructor() {
        this.InitializeForm();
    }
    InitializeForm() {
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', this.handleFormLoginSubmit.bind(this));
    }
    handleFormLoginSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const FirstName = '';
            const LastName = '';
            const Initial = '';
            const Email = document.getElementById('Email').value;
            const Password = document.getElementById('Password').value;
            const user = { FirstName, LastName, Initial, Email, Password };
            const jsonUser = JSON.stringify(user);
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const response = yield fetch(`${baseURL}/en/api/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonUser
                });
                if (!response.ok) {
                    const errorText = yield response.text();
                    throw new Error(errorText || 'Network response was not ok');
                }
                const data = yield response.json();
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('playerID', data.PlayerID);
                alert(`Login successful!`);
                window.location.href = '../index.html';
            }
            catch (errorMessage) {
                console.error('There was a problem with the login request:', errorMessage);
                alert(`Login failed: ${errorMessage}. Please try again.`);
            }
        });
    }
}
// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Login();
});
