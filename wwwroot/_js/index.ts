import { Language as l } from "./language.js";

export class Index {
    private buttonEnglish: HTMLElement;
    private buttonFrançais: HTMLElement;
    constructor() {
        this.buttonEnglish = document.getElementById("buttonEnglish") as HTMLElement;
        this.buttonFrançais = document.getElementById("buttonFrançais") as HTMLElement;
        this.initialize();
    }

    private handleEnglishClick = () => this.selectLanguage("en");
    private handleFrançaisClick = () => this.selectLanguage("fr");

    private initialize(): void {
        this.redirect();

        document.title = l.titleSelectLanguage[l.index];

        this.buttonEnglish.addEventListener("click", this.handleEnglishClick);
        this.buttonFrançais.addEventListener("click", this.handleFrançaisClick);
    }

    private redirect(): void {
        const userToken = localStorage.getItem("userToken");
        const language = localStorage.getItem("language");

        if (language != null) {
            if (userToken == null) {
                window.location.href = "login.html";
            } else {
                window.location.href = "kaboom.html";
            }
        }
    }

    private removeEventListeners(): void {
        this.buttonEnglish.removeEventListener("click", this.handleEnglishClick);
        this.buttonFrançais.removeEventListener("click", this.handleFrançaisClick);
    }

    private selectLanguage(language: string): void {
        localStorage.setItem("language", language);
        l.Initialize();
        this.redirect();
    }

    public destroy(): void {
        this.removeEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Index();
});

