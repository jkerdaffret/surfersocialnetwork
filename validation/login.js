const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = "L'email est invalide";
    }
    
    if(Validator.isEmpty(data.email)) {
        errors.email = "L'email est requis";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Le mot de passe est requis';
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    }
}