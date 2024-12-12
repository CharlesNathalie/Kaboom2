import { Language as l } from "./language.js";
import { ServerError } from "./servererror.js";

export class VerifyEmail {
    private form: HTMLFormElement;
    private labelEmail: HTMLLabelElement;
    private inputEmail: HTMLInputElement;
    private textVerifyEmail: HTMLLabelElement;
    private labelVerificationCode: HTMLLabelElement;
    private inputVerificationCode: HTMLInputElement;
    private buttonVerify: HTMLButtonElement;
    private handleFormVerifyEmailSubmitBound: (event: Event) => void;

    constructor() {
        this.form = document.getElementById('verifyEmailForm') as HTMLFormElement;
        this.labelEmail = document.getElementById('labelEmail') as HTMLLabelElement;
        this.inputEmail = document.getElementById('inputEmail') as HTMLInputElement;
        this.textVerifyEmail = document.getElementById('textVerifyEmail') as HTMLLabelElement;
        this.labelVerificationCode = document.getElementById('labelVerificationCode') as HTMLLabelElement;
        this.inputVerificationCode = document.getElementById('VerificationCode') as HTMLInputElement;
        this.buttonVerify = document.getElementById('buttonVerify') as HTMLButtonElement;
        this.handleFormVerifyEmailSubmitBound = this.handleFormVerifyEmailSubmit.bind(this);
        this.initialize();
    }

    private async handleFormVerifyEmailSubmit(event: Event): Promise<void> {
        event.preventDefault();

        const code = { Email: this.inputEmail.value, TempCode: this.inputVerificationCode.value };
        const jsonCode = JSON.stringify(code);

        try {
            let baseURL: string = 'https://localhost:7256';
            if (window.location.hostname !== 'localhost') {
                baseURL = "https://kaboomwebapi.azurewebsites.net";
            }

            const response = await fetch(`${baseURL}/${l.lang}/api/auth/verifyemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonCode
            });

            if (!response.ok) {
                const error: ServerError = await response.json();
                throw new Error(error.Message || l.jsNetworkResponseWasNotOk[l.index]);
            }

            const data = await response.json();
            localStorage.removeItem("email");
            alert(l.jsEmailVerificationSuccessful[l.index]);
            window.location.href = 'login.html';
        } catch (errorMessage) {
            console.error(l.jsThereWasAProblemWithTheEmailVerification_[l.index], errorMessage);
            alert(l.format(l.jsEmailVerificationFailed_PleaseTryAgain[l.index], errorMessage));
        }
    }

    private initialize(): void {
        this.redirect();

        this.inputEmail.value = localStorage.getItem("email") ?? "";
        this.labelEmail.textContent = l.labelEmail[l.index];
        this.textVerifyEmail.textContent = l.textVerifyEmail[l.index];
        this.labelVerificationCode.textContent = l.labelVerificationCode[l.index];
        this.buttonVerify.textContent = l.buttonVerify[l.index];

        document.title = l.titleVerifyEmail[l.index];

        this.form.addEventListener('submit', this.handleFormVerifyEmailSubmitBound);
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

    public removeEventListeners(): void {
        this.form.removeEventListener('submit', this.handleFormVerifyEmailSubmitBound);
    }

    public destroy(): void {
        this.removeEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VerifyEmail();
});
