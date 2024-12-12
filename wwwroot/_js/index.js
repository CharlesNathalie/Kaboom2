import { Language as l } from "./language.js";
export class Index {
    constructor() {
        this.handleEnglishClick = () => this.selectLanguage("en");
        this.handleFrançaisClick = () => this.selectLanguage("fr");
        this.buttonEnglish = document.getElementById("buttonEnglish");
        this.buttonFrançais = document.getElementById("buttonFrançais");
        this.initialize();
    }
    initialize() {
        this.redirect();
        document.title = l.titleSelectLanguage[l.index];
        this.buttonEnglish.addEventListener("click", this.handleEnglishClick);
        this.buttonFrançais.addEventListener("click", this.handleFrançaisClick);
    }
    redirect() {
        const userToken = localStorage.getItem("userToken");
        const language = localStorage.getItem("language");
        if (language != null) {
            if (userToken == null) {
                window.location.href = "login.html";
            }
            else {
                window.location.href = "kaboom.html";
            }
        }
    }
    removeEventListeners() {
        this.buttonEnglish.removeEventListener("click", this.handleEnglishClick);
        this.buttonFrançais.removeEventListener("click", this.handleFrançaisClick);
    }
    selectLanguage(language) {
        localStorage.setItem("language", language);
        l.Initialize();
        this.redirect();
    }
    destroy() {
        this.removeEventListeners();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Index();
});
