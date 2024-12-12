export class Language {
    constructor() {
        Language.Initialize();
    }
    static Initialize() {
        const language = localStorage.getItem("language");
        this.lang = "en";
        this.index = 0;
        if (language === "fr") {
            this.lang = "fr";
            this.index = 1;
        }
    }
    static format(template, ...args) {
        return template.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
}
Language.lang = 'en';
Language.index = 0;
// language variables
Language.buttonLogOff = ["Log Off", "Déconnexion"];
Language.buttonLogin = ["Login", "Connexion"];
Language.buttonPlay = ["Play", "Jouer"];
Language.buttonRegister = ["Register", "Inscription"];
Language.buttonStop = ["Stop", "Arrêter"];
Language.buttonVerify = ["Verify", "Vérifier"];
Language.jsEmailVerificationFailed_PleaseTryAgain = ["Email verification failed. {0}. Please try again.", "La vérification de l'email a échoué. {0}. Veuillez réessayer."];
Language.jsEmailVerificationSuccessful = ["Email verification successful!", "Vérification de l'email réussie !"];
Language.jsFailedToAddGame_PleaseTryAgain = ["Failed to add game. {0}. Please try again.", "Échec de l'ajout du jeu. {0}. Veuillez réessayer."];
Language.jsGameAdded_ = ["Game added: {0}", "Jeu ajouté: {0}"];
Language.jsGameAddedSuccessfully = ["Game added successfully", "Jeu ajouté avec succès"];
Language.jsGameOverScore_ = ["Game over, score: {0}", "Parti fini, pointage: {0}"];
Language.jsLoginFailedError_PleaseTryAgain = ["Login failed. {0}. Please try again.", "Échec de la connexion. {0}. Veuillez réessayer."];
Language.jsLoginSuccessful = ["Login successful!", "Connexion réussie !"];
Language.jsLoginSuccessfulToken_ = ["Login successful token: {0}", "Jeton de connexion réussi: {0}"];
Language.jsNetworkResponseWasNotOk = ["Network response was not ok", "La réponse du réseau n'était pas correcte"];
Language.jsPasswordsDoNotMatch = ["Passwords do not match!", "Mots de passe ne concordent pas !"];
Language.jsPleaseEnterNumberBetween1And_ = ["Please enter a number between 1 and {0}", "SVP entrer un chiffre entre 1 et {0}"];
Language.jsPproblemAddingGameError_ = ["Problem adding game: {0}", "Problème d'ajout de jeu: {0}"];
Language.jsRegistrationFailed_PleaseTryAgain = ["Registration failed: {0}. Please try again.", "L'inscription a échoué: {0}. Veuillez réessayer."];
Language.jsRegistrationSuccessful = ["Registration successful", "Inscription réussie"];
Language.jsRegistrationSuccessful_TempCode = ["Registration successful! Temp Code: {0}", "Inscription réussi ! Code temporaire: {0}"];
Language.jsThereWasAProblemWithTheEmailVerification_ = ["There was a problem with the email verification: {0}", "Il y a eu un problème avec la vérification de l'email: {0}"];
Language.jsThereWasAProblemWithTheLogin_ = ["There was a problem with the login: {0}", "Il y a eu un problème avec la connexion: {0}"];
Language.jsThereWasAProblemWithTheRegistration_ = ["There was a problem with the registration: {0}", "Il y a eu un problème avec l'inscription: {0}"];
Language.labelConfirmPassword = ["Confirm Password:", "Confirmer le mot de passe:"];
Language.labelEmail = ["Email:", "Courriel:"];
Language.labelFirstName = ["First Name:", "Prénom:"];
Language.labelGridSize = ["Grid Size:", "Taille de la grille:"];
Language.labelInitial = ["Initial:", "Initiale:"];
Language.labelLastName = ["Last Name:", "Nom de famille:"];
Language.labelMineCount = ["# Mines:", "Nombre de mines:"];
Language.labelPassword = ["Password:", "Mot de passe:"];
Language.labelVerificationCode = ["Verification Code:", "Code de vérification:"];
Language.textAlreadyHaveAnAccount = ["Already have an account? ", "Vous avez déjà un compte ? "];
Language.textDidNotReceiveCode = ["Did not receive the code? ", "Vous n'avez pas reçu le code ? "];
Language.textDontHaveAnAcount = ["Don't have an account? ", "Vous n'avez pas de compte ? "];
Language.textLogin = ["Login", "Connexion"];
Language.textLoginHere = ["Login here", "Connectez-vous ici"];
Language.textRegister = ["Register", "Inscription"];
Language.textRegisterHere = ["Register here", "Inscrivez-vous ici"];
Language.textReplay = ["Replay", "Rejouer"];
Language.textResendCode = ["Resend code", "Renvoyer le code"];
Language.textScore_ = ["Score: {0}", "Pointage: {0}"];
Language.textVerifyEmail = ["Verify Email", "Vérifier l'email"];
Language.textYouWinScore_ = ["You win, score: {0}", "Vous gagnez, pointage: {0}"];
Language.titleKaboom = ["Kaboom", "Kaboom"];
Language.titleLogin = ["Login", "Connexion"];
Language.titleRegister = ["Register", "Inscription"];
Language.titleSelectLanguage = ["Select Language", "Sélectionnez la langue"];
Language.titleVerifyEmail = ["Verify Email", "Vérifier l'email"];
// Initialize the Language class when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    new Language();
});
