const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateSpotInput(data) {
    let errors = {}

    data.description = !isEmpty(data.description) ? data.description : ''
    data.latitude = !isEmpty(data.latitude) ? data.latitude : ''
    data.longitude = !isEmpty(data.longitude) ? data.longitude : ''

    if(Validator.isEmpty(data.description)) {
        errors.description = 'La description est requise'
    }

    if(Validator.isEmpty(data.latitude)) {
        errors.latitude = 'La latitude est requise'
    }

    if(Validator.isEmpty(data.longitude)) {
        errors.longitude = 'La longitude est requise'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}