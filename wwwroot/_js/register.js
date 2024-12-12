var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Language as l } from "./language.js";
export class Register {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.textRegister = document.getElementById('textRegister');
        this.labelFirstName = document.getElementById('labelFirstName');
        this.labelLastName = document.getElementById('labelLastName');
        this.labelInitial = document.getElementById('labelInitial');
        this.labelEmail = document.getElementById('labelEmail');
        this.labelPassword = document.getElementById('labelPassword');
        this.labelConfirmPassword = document.getElementById('labelConfirmPassword');
        this.buttonRegister = document.getElementById('buttonRegister');
        this.textAlreadyHaveAnAccount = document.getElementById('textAlreadyHaveAnAccount');
        this.textLoginHere = document.getElementById('textLoginHere');
        this.redirect();
        this.initialize();
    }
    handleFormRegisterSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const FirstName = document.getElementById('FirstName').value;
            const LastName = document.getElementById('LastName').value;
            const Initial = document.getElementById('Initial').value;
            const Email = document.getElementById('Email').value;
            const PasswordHash = document.getElementById('Password').value;
            const ConfirmPassword = document.getElementById('ConfirmPassword').value;
            if (PasswordHash !== ConfirmPassword) {
                alert(l.jsPasswordsDoNotMatch[l.index]);
                return;
            }
            const player = { FirstName, LastName, Initial, Email, PasswordHash };
            const jsonPlayer = JSON.stringify(player);
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const response = yield fetch(`${baseURL}/${l.lang}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonPlayer
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.Message || l.jsNetworkResponseWasNotOk[l.index]);
                }
                const data = yield response.json();
                if (window.location.hostname !== 'localhost') {
                    alert(l.jsRegistrationSuccessful[l.index]);
                }
                else {
                    alert(l.format(l.jsRegistrationSuccessful_TempCode[l.index], data));
                    let email = data;
                    email = email.substring(0, email.indexOf(" "));
                    localStorage.setItem("email", email);
                }
                window.location.href = 'verifyemail.html';
            }
            catch (errorMessage) {
                console.error(l.jsThereWasAProblemWithTheRegistration_[l.index], errorMessage);
                alert(l.format(l.jsRegistrationFailed_PleaseTryAgain[l.index], errorMessage));
            }
        });
    }
    initialize() {
        this.textRegister.textContent = l.textRegister[l.index];
        this.labelFirstName.textContent = l.labelFirstName[l.index];
        this.labelLastName.textContent = l.labelLastName[l.index];
        this.labelInitial.textContent = l.labelInitial[l.index];
        this.labelEmail.textContent = l.labelEmail[l.index];
        this.labelPassword.textContent = l.labelPassword[l.index];
        this.labelConfirmPassword.textContent = l.labelConfirmPassword[l.index];
        this.buttonRegister.textContent = l.buttonRegister[l.index];
        this.textAlreadyHaveAnAccount.textContent = l.textAlreadyHaveAnAccount[l.index];
        this.textLoginHere.textContent = l.textLoginHere[l.index];
        document.title = l.titleRegister[l.index];
        this.form.addEventListener('submit', this.handleFormRegisterSubmit.bind(this));
    }
    redirect() {
        const userToken = localStorage.getItem("userToken");
        const language = localStorage.getItem("language");
        if (language == null) {
            window.location.href = "index.html";
        }
        else {
            if (userToken != null) {
                window.location.href = "kaboom.html";
                return;
            }
        }
    }
    removeEventListeners() {
        this.form.removeEventListener('submit', this.handleFormRegisterSubmit.bind(this));
    }
    destroy() {
        this.removeEventListeners();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Register();
});
