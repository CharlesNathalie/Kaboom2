var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Register {
    constructor() {
        this.InitializeForm();
    }
    InitializeForm() {
        const form = document.getElementById('registerForm');
        form.addEventListener('submit', this.handleFormRegisterSubmit.bind(this));
    }
    handleFormRegisterSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const FirstName = document.getElementById('FirstName').value;
            const LastName = document.getElementById('LastName').value;
            const Initial = document.getElementById('Initial').value;
            const Email = document.getElementById('Email').value;
            const Password = document.getElementById('Password').value;
            const ConfirmPassword = document.getElementById('ConfirmPassword').value;
            if (Password !== ConfirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            const user = { FirstName, LastName, Initial, Email, Password };
            const jsonUser = JSON.stringify(user);
            try {
                const response = yield fetch('https://localhost:7256/en/api/auth/register', {
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
                console.log('User registered:', data);
                alert('Registration successful!');
            }
            catch (error) {
                console.error('There was a problem with the registration request:', error);
                alert(`Registration failed: ${error}. Please try again.`);
            }
        });
    }
}
// Initialize the Register class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Register();
});
