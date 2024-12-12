export class Language {

    public static lang: string = 'en';
    public static index: number = 0;

    constructor() {
        Language.Initialize();
    }

    public static Initialize() {
        const language = localStorage.getItem("language");

        this.lang = "en";
        this.index = 0;

        if (language === "fr") {
            this.lang = "fr";
            this.index = 1;
        }
    }

    public static format(template: string, ...args: any[]): string {
        return template.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    // language variables
    public static buttonLogOff: string[] = ["Log Off", "Déconnexion"];
    public static buttonLogin: string[] = ["Login", "Connexion"];
    public static buttonPlay: string[] = ["Play", "Jouer"];
    public static buttonRegister: string[] = ["Register", "Inscription"];
    public static buttonStop: string[] = ["Stop", "Arrêter"];
    public static buttonVerify: string[] = ["Verify", "Vérifier"];
    public static jsEmailVerificationFailed_PleaseTryAgain: string[] = ["Email verification failed. {0}. Please try again.", "La vérification de l'email a échoué. {0}. Veuillez réessayer."];
    public static jsEmailVerificationSuccessful: string[] = ["Email verification successful!", "Vérification de l'email réussie !"];
    public static jsFailedToAddGame_PleaseTryAgain: string[] = ["Failed to add game. {0}. Please try again.", "Échec de l'ajout du jeu. {0}. Veuillez réessayer."];
    public static jsGameAdded_: string[] = ["Game added: {0}", "Jeu ajouté: {0}"];
    public static jsGameAddedSuccessfully: string[] = ["Game added successfully", "Jeu ajouté avec succès"];
    public static jsGameOverScore_: string[] = ["Game over, score: {0}", "Parti fini, pointage: {0}"];
    public static jsLoginFailedError_PleaseTryAgain: string[] = ["Login failed. {0}. Please try again.", "Échec de la connexion. {0}. Veuillez réessayer."];
    public static jsLoginSuccessful: string[] = ["Login successful!", "Connexion réussie !"];
    public static jsLoginSuccessfulToken_: string[] = ["Login successful token: {0}", "Jeton de connexion réussi: {0}"];
    public static jsNetworkResponseWasNotOk: string[] = ["Network response was not ok", "La réponse du réseau n'était pas correcte"];
    public static jsPasswordsDoNotMatch: string[] = ["Passwords do not match!", "Mots de passe ne concordent pas !"];
    public static jsPleaseEnterNumberBetween1And_: string[] = ["Please enter a number between 1 and {0}", "SVP entrer un chiffre entre 1 et {0}"];
    public static jsPproblemAddingGameError_: string[] = ["Problem adding game: {0}", "Problème d'ajout de jeu: {0}"];
    public static jsRegistrationFailed_PleaseTryAgain: string[] = ["Registration failed: {0}. Please try again.", "L'inscription a échoué: {0}. Veuillez réessayer."];
    public static jsRegistrationSuccessful: string[] = ["Registration successful", "Inscription réussie"];
    public static jsRegistrationSuccessful_TempCode: string[] = ["Registration successful! Temp Code: {0}", "Inscription réussi ! Code temporaire: {0}"];
    public static jsThereWasAProblemWithTheEmailVerification_: string[] = ["There was a problem with the email verification: {0}", "Il y a eu un problème avec la vérification de l'email: {0}"];
    public static jsThereWasAProblemWithTheLogin_: string[] = ["There was a problem with the login: {0}", "Il y a eu un problème avec la connexion: {0}"];
    public static jsThereWasAProblemWithTheRegistration_: string[] = ["There was a problem with the registration: {0}", "Il y a eu un problème avec l'inscription: {0}"];
    public static labelConfirmPassword: string[] = ["Confirm Password:", "Confirmer le mot de passe:"];
    public static labelEmail: string[] = ["Email:", "Courriel:"];
    public static labelFirstName: string[] = ["First Name:", "Prénom:"];
    public static labelGridSize: string[] = ["Grid Size:", "Taille de la grille:"];
    public static labelInitial: string[] = ["Initial:", "Initiale:"];
    public static labelLastName: string[] = ["Last Name:", "Nom de famille:"];
    public static labelMineCount: string[] = ["# Mines:", "Nombre de mines:"];
    public static labelPassword: string[] = ["Password:", "Mot de passe:"];
    public static labelVerificationCode: string[] = ["Verification Code:", "Code de vérification:"];
    public static textAlreadyHaveAnAccount: string[] = ["Already have an account? ", "Vous avez déjà un compte ? "];
    public static textDidNotReceiveCode: string[] = ["Did not receive the code? ", "Vous n'avez pas reçu le code ? "];
    public static textDontHaveAnAcount: string[] = ["Don't have an account? ", "Vous n'avez pas de compte ? "];
    public static textLogin: string[] = ["Login", "Connexion"];
    public static textLoginHere: string[] = ["Login here", "Connectez-vous ici"];
    public static textRegister: string[] = ["Register", "Inscription"];
    public static textRegisterHere: string[] = ["Register here", "Inscrivez-vous ici"];
    public static textReplay: string[] = ["Replay", "Rejouer"];
    public static textResendCode: string[] = ["Resend code", "Renvoyer le code"];
    public static textScore_: string[] = ["Score: {0}", "Pointage: {0}"];
    public static textVerifyEmail: string[] = ["Verify Email", "Vérifier l'email"];
    public static textYouWinScore_: string[] = ["You win, score: {0}", "Vous gagnez, pointage: {0}"];
    public static titleKaboom: string[] = ["Kaboom", "Kaboom"];
    public static titleLogin: string[] = ["Login", "Connexion"];
    public static titleRegister: string[] = ["Register", "Inscription"];
    public static titleSelectLanguage: string[] = ["Select Language", "Sélectionnez la langue"];
    public static titleVerifyEmail: string[] = ["Verify Email", "Vérifier l'email"];

}

// Initialize the Language class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Language();
});

