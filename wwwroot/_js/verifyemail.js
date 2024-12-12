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
export class VerifyEmail {
    constructor() {
        this.form = document.getElementById('verifyEmailForm');
        this.labelEmail = document.getElementById('labelEmail');
        this.inputEmail = document.getElementById('inputEmail');
        this.textVerifyEmail = document.getElementById('textVerifyEmail');
        this.labelVerificationCode = document.getElementById('labelVerificationCode');
        this.inputVerificationCode = document.getElementById('VerificationCode');
        this.buttonVerify = document.getElementById('buttonVerify');
        this.handleFormVerifyEmailSubmitBound = this.handleFormVerifyEmailSubmit.bind(this);
        this.initialize();
    }
    handleFormVerifyEmailSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const code = { Email: this.inputEmail.value, TempCode: this.inputVerificationCode.value };
            const jsonCode = JSON.stringify(code);
            try {
                let baseURL = 'https://localhost:7256';
                if (window.location.hostname !== 'localhost') {
                    baseURL = "https://kaboomwebapi.azurewebsites.net";
                }
                const response = yield fetch(`${baseURL}/${l.lang}/api/auth/verifyemail`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonCode
                });
                if (!response.ok) {
                    const error = yield response.json();
                    throw new Error(error.Message || l.jsNetworkResponseWasNotOk[l.index]);
                }
                const data = yield response.json();
                localStorage.removeItem("email");
                alert(l.jsEmailVerificationSuccessful[l.index]);
                window.location.href = 'login.html';
            }
            catch (errorMessage) {
                console.error(l.jsThereWasAProblemWithTheEmailVerification_[l.index], errorMessage);
                alert(l.format(l.jsEmailVerificationFailed_PleaseTryAgain[l.index], errorMessage));
            }
        });
    }
    initialize() {
        var _a;
        this.redirect();
        this.inputEmail.value = (_a = localStorage.getItem("email")) !== null && _a !== void 0 ? _a : "";
        this.labelEmail.textContent = l.labelEmail[l.index];
        this.textVerifyEmail.textContent = l.textVerifyEmail[l.index];
        this.labelVerificationCode.textContent = l.labelVerificationCode[l.index];
        this.buttonVerify.textContent = l.buttonVerify[l.index];
        document.title = l.titleVerifyEmail[l.index];
        this.form.addEventListener('submit', this.handleFormVerifyEmailSubmitBound);
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
        this.form.removeEventListener('submit', this.handleFormVerifyEmailSubmitBound);
    }
    destroy() {
        this.removeEventListeners();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new VerifyEmail();
});
