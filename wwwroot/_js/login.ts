import { Language as l } from "./language.js";
import { ServerError } from "./servererror.js";

export class Login {

    private textLogin: HTMLLabelElement;
    private labelEmail: HTMLLabelElement;
    private labelPassword: HTMLLabelElement;
    private inputEmail: HTMLInputElement;
    private inputPassword: HTMLInputElement;
    private buttonLogin: HTMLButtonElement;
    private textDontHaveAnAccount: HTMLSpanElement;
    private textRegisterHere: HTMLAnchorElement;
    private formLogin: HTMLFormElement;

    constructor() {
        this.textLogin = (document.getElementById('textLogin') as HTMLLabelElement);
        this.labelEmail = (document.getElementById('labelEmail') as HTMLLabelElement);
        this.labelPassword = (document.getElementById('labelPassword') as HTMLLabelElement);
        this.inputEmail = (document.getElementById('inputEmail') as HTMLInputElement);
        this.inputPassword = (document.getElementById('inputPassword') as HTMLInputElement);
        this.buttonLogin = (document.getElementById('buttonLogin') as HTMLButtonElement);
        this.textDontHaveAnAccount = (document.getElementById('textDontHaveAnAccount') as HTMLSpanElement);
        this.textRegisterHere = (document.getElementById('textRegisterHere') as HTMLAnchorElement);
        this.formLogin = document.getElementById('formLogin') as HTMLFormElement;
        this.initialize();
    }

    private async handleFormLoginSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const FirstName = '';
        const LastName = '';
        const Initial = '';
        const Email = this.inputEmail?.value;
        const PasswordHash = this.inputPassword?.value;

        const player = { FirstName, LastName, Initial, Email, PasswordHash };
        const jsonPlayer = JSON.stringify(player);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/${l.lang}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonPlayer
            });

            if (!response.ok) {
                const error: ServerError = await response.json();
                throw new Error(error.Message || l.jsNetworkResponseWasNotOk[l.index]);
            }

            const data = await response.json();
            localStorage.setItem("token", data);
            if (window.location.hostname !== 'localhost') {
                alert(l.jsLoginSuccessful[l.index]);
            }
            else {
                alert(l.format(l.jsLoginSuccessfulToken_[l.index], data));
            }
            window.location.href = '../kaboom.html';
        } catch (errorMessage) {
            console.error(l.jsThereWasAProblemWithTheLogin_[l.index], errorMessage);
            alert(l.format(l.jsLoginFailedError_PleaseTryAgain[l.index], errorMessage));
        }
    }

    private initialize(): void {
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

    private redirect(): void {
        const token = localStorage.getItem("token");
        const language = localStorage.getItem("language");

        if (language == null) {
            window.location.href = "index.html";
        } else {
            if (token != null) {
                window.location.href = "kaboom.html";
                return;
            }
        }
    }

    private removeEventListeners(): void {
        this.formLogin?.removeEventListener('submit', this.handleFormLoginSubmit);
    }

    public destroy(): void {
        this.removeEventListeners();
    }
}

// Initialize the Login class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Login();
});

