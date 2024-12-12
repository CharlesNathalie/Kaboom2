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
export class Login {
    constructor() {
        this.textLogin = document.getElementById('textLogin');
        this.labelEmail = document.getElementById('labelEmail');
        this.labelPassword = document.getElementById('labelPassword');
        this.inputEmail = document.getElementById('inputEmail');
        this.inputPassword = document.getElementById('inputPassword');
        this.buttonLogin = document.getElementById('buttonLogin');
        this.textDontHaveAnAccount = document.getElementById('textDontHaveAnAccount');
        this.textRegisterHere = document.getElementById('textRegisterHere');
        this.formLogin = document.getElementById('formLogin');
        this.initialize();
    }
    handleFormLoginSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            event.preventDefault();
            const FirstName = '';
            const LastName = '';
            const Initial = '';
            const Email = (_a = this.inputEmail) === null || _a === void 0 ? void 0 : _a.value;
            const PasswordHash = (_b = this.inputPassword) === null || _b === void 0 ? void 0 : _b.value;
            const player = { FirstName, LastName, Initial, Email, PasswordHash };
            const jsonPlayer = JSON.stringify(player);
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const response = yield fetch(`${baseURL}/${l.lang}/api/auth/login`, {
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
                localStorage.setItem("token", data);
                if (window.location.hostname !== 'localhost') {
                    alert(l.jsLoginSuccessful[l.index]);
                }
                else {
                    alert(l.format(l.jsLoginSuccessfulToken_[l.index], data));
                }
                window.location.href = '../kaboom.html';
            }
            catch (errorMessage) {
                console.error(l.jsThereWasAProblemWithTheLogin_[l.index], errorMessage);
                alert(l.format(l.jsLoginFailedError_PleaseTryAgain[l.index], errorMessage));
            }
        });
    }
    initialize() {
        this.redirect();
        this.textLogin.textContent = l.textLogin[l.index];
        this.labelEmail.textContent = l.labelEmail[l.index];
        this.labelPassword.textContent = l.labelPassword[l.index];
        this.buttonLogin.textContent = l.buttonLogin[l.index];
        this.textDontHaveAnAccount.textContent = l.textDontHaveAnAcount[l.index];
        this.textRegisterHere.textContent = l.textRegisterHere[l.index];
        document.title = l.titleLogin[l.index];
        this.formLogin.addEventListener('submit', this.handleFormLoginSubmit.bind(this));
    }
    redirect() {
        const token = localStorage.getItem("token");
        const language = localStorage.getItem("language");
        if (language == null) {
            window.location.href = "index.html";
        }
        else {
            if (token != null) {
                window.location.href = "kaboom.html";
                return;
            }
        }
    }
    removeEventListeners() {
        var _a;
        (_a = this.formLogin) === null || _a === void 0 ? void 0 : _a.removeEventListener('submit', this.handleFormLoginSubmit);
    }
    destroy() {
        this.removeEventListeners();
    }
}
// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Login();
});
