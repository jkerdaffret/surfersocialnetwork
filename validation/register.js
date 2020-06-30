const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateRegisterInput(data) {
    let errors = {}

    data.firstname = !isEmpty(data.firstname) ? data.firstname : ''
    data.lastname = !isEmpty(data.lastname) ? data.lastname : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if(!Validator.isLength(data.firstname, {min: 2, max: 40})){
        errors.firstname = 'Le prénom doit être compris entre 2 et 40 caractères'
    }

    if(Validator.isEmpty(data.firstname)) {
        errors.firstname = 'Le prénom est requis'
    }

    if(!Validator.isLength(data.lastname, {min: 2, max: 40})){
        errors.lastname = 'Le nom doit être compris entre 2 et 40 caractères'
    }

    if(Validator.isEmpty(data.lastname)) {
        errors.lastname = 'Le nom est requis'
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "L'email est requis";
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "L'email est invalide";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Le mot de passe est requis';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Le mot de passe doit comporter entre 6 et 30 caractères';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'La confirmation du mot de passe est requise';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Les mots de passe doivent être identique';
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    }
}