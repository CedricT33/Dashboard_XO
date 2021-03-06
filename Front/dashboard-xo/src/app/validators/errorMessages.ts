/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
    usernameLength: 'L\'identifiant doit comporter entre 1 et 30 caractères.',
    usernameSame: 'Cet identifiant existe déjà, veuillez en choisir un autre.',
    passwordLength: 'Le mot de passe doit comporter entre 5 et 70 caractères.',
    messageLength: 'Le message ne doit pas faire plus de 100 caractères.',
    colisMax: 'Pas plus de 100 colis',
    objectifMin: 'L\'objectif doit être positif',
    objectifMax: 'L\'objectif ne peut excéder 2 000 000 000 !',
    intituleObjectif: 'L\'intitulé ne doit pas faire plus de 50 caractères.'
};
