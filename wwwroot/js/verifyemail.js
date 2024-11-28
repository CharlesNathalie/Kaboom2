var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class VerifyEmail {
    constructor() {
        this.InitializeForm();
        this.SetEmailValue(); // Set the email value on initialization
    }
    InitializeForm() {
        const form = document.getElementById('verifyEmailForm');
        form.addEventListener('submit', this.handleFormLoginSubmit.bind(this));
    }
    SetEmailValue() {
        const emailInput = document.getElementById('Email');
        const storedEmail = localStorage.getItem('RegisterEmail');
        if (storedEmail) {
            emailInput.value = storedEmail;
        }
        localStorage.removeItem("RegisterEmail");
    }
    handleFormLoginSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const Email = document.getElementById('Email').value;
            const TempCode = document.getElementById('TempCode').value;
            const code = { Email, TempCode };
            const jsonCode = JSON.stringify(code);
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const response = yield fetch(`${baseURL}/en/api/auth/verifyemail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: jsonCode
                });
                if (!response.ok) {
                    const errorText = yield response.text();
                    throw new Error(errorText || 'Network response was not ok');
                }
                const data = yield response.json();
                alert('Email verification successful!');
                window.location.href = 'login.html';
            }
            catch (errorMessage) {
                console.error('There was a problem with the verify email request:', errorMessage);
                alert(`Login failed: ${errorMessage}. Please try again.`);
            }
        });
    }
}
// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new VerifyEmail();
});
