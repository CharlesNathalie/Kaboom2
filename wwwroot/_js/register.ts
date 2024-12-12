import { Language as l } from "./language.js";
import { ServerError } from "./servererror.js";

export class Register {
    private form: HTMLFormElement;
    private textRegister: HTMLLabelElement;
    private labelFirstName: HTMLLabelElement;
    private labelLastName: HTMLLabelElement;
    private labelInitial: HTMLLabelElement;
    private labelEmail: HTMLLabelElement;
    private labelPassword: HTMLLabelElement;
    private labelConfirmPassword: HTMLLabelElement;
    private buttonRegister: HTMLButtonElement;
    private textAlreadyHaveAnAccount: HTMLSpanElement;
    private textLoginHere: HTMLAnchorElement;

    constructor() {
        this.form = document.getElementById('registerForm') as HTMLFormElement;
        this.textRegister = document.getElementById('textRegister') as HTMLLabelElement;
        this.labelFirstName = document.getElementById('labelFirstName') as HTMLLabelElement;
        this.labelLastName = document.getElementById('labelLastName') as HTMLLabelElement;
        this.labelInitial = document.getElementById('labelInitial') as HTMLLabelElement;
        this.labelEmail = document.getElementById('labelEmail') as HTMLLabelElement;
        this.labelPassword = document.getElementById('labelPassword') as HTMLLabelElement;
        this.labelConfirmPassword = document.getElementById('labelConfirmPassword') as HTMLLabelElement;
        this.buttonRegister = document.getElementById('buttonRegister') as HTMLButtonElement;
        this.textAlreadyHaveAnAccount = document.getElementById('textAlreadyHaveAnAccount') as HTMLSpanElement;
        this.textLoginHere = document.getElementById('textLoginHere') as HTMLAnchorElement;
        this.redirect();

        this.initialize();
    }

    private async handleFormRegisterSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const FirstName = (document.getElementById('FirstName') as HTMLInputElement).value;
        const LastName = (document.getElementById('LastName') as HTMLInputElement).value;
        const Initial = (document.getElementById('Initial') as HTMLInputElement).value;
        const Email = (document.getElementById('Email') as HTMLInputElement).value;
        const PasswordHash = (document.getElementById('Password') as HTMLInputElement).value;
        const ConfirmPassword = (document.getElementById('ConfirmPassword') as HTMLInputElement).value;

        if (PasswordHash !== ConfirmPassword) {
            alert(l.jsPasswordsDoNotMatch[l.index]);
            return;
        }

        const player = { FirstName, LastName, Initial, Email, PasswordHash };
        const jsonPlayer = JSON.stringify(player);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/${l.lang}/api/auth/register`, {
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
            if (window.location.hostname !== 'localhost') {
                alert(l.jsRegistrationSuccessful[l.index]);
                let email: string = data;
                email = email.substring(0, email.indexOf(" "));
                localStorage.setItem("email", email);
            }
            else {
                alert(l.format(l.jsRegistrationSuccessful_TempCode[l.index], data));
                let email: string = data;
                email = email.substring(0, email.indexOf(" "));
                localStorage.setItem("email", email);
            }
            window.location.href = 'verifyemail.html';
        } catch (errorMessage) {
            console.error(l.jsThereWasAProblemWithTheRegistration_[l.index], errorMessage);
            alert(l.format(l.jsRegistrationFailed_PleaseTryAgain[l.index], errorMessage));
        }
    }

    private initialize(): void {
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

    private redirect(): void {
        const userToken = localStorage.getItem("userToken");
        const language = localStorage.getItem("language");

        if (language == null) {
            window.location.href = "index.html";
        } else {
            if (userToken != null) {
                window.location.href = "kaboom.html";
                return;
            }
        }
    }

    public removeEventListeners(): void {
        this.form.removeEventListener('submit', this.handleFormRegisterSubmit.bind(this));
    }

    public destroy(): void {
        this.removeEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Register();
});
