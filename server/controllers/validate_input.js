const validateNotEmpty = (value) => {
    if (value === '' || value === undefined) {
        return false
    }

    return true
}

const validateLength = (field, min, max) => {
    if (field !== undefined && field.length > 0) {
        if (field.length < min || field.length > max) {
            return false
        }
        return true
    }

    return true
}

const validateMandatoryField = (value, field, min, max) => {
    const errors = []

    if (!validateNotEmpty(value)) {
        errors.push(` ${field} ei saa olla tyhjä`)
    } else if (!validateLength(value, min, max)) {
        errors.push(` Sallittu pituus kentälle ${field} on ${min}-${max} merkkiä`)
    }

    return errors
}

const validateGeneralField = (value, field, min, max) => {
    const errors = []
    if (!validateLength(value, min, max)) {
        errors.push(` Sallittu pituus kentälle ${field} on ${min}-${max} merkkiä`)
    }
    return errors
}


const validateRegisterInput = (firstName, lastName, username, password, address, city,
    postalCode, phoneNumber, email) => {
    let errors = []
    errors = errors.concat(validateMandatoryField(firstName, 'Etunimi', 2, 50))
    errors = errors.concat(validateGeneralField(lastName, 'Sukunimi', 2, 50))
    errors = errors.concat(validateMandatoryField(username, 'Käyttäjätunnus', 5, 15))
    errors = errors.concat(validateMandatoryField(password, 'Salasana', 10, 30))
    errors = errors.concat(validateGeneralField(address, 'Osoite', 2, 50))
    errors = errors.concat(validateGeneralField(city, 'Kaupunki', 2, 50))
    errors = errors.concat(validateGeneralField(postalCode, 'Postinumero', 5, 5))
    errors = errors.concat(validateGeneralField(phoneNumber, 'Puhelinnumero', 2, 50))
    errors = errors.concat(validateGeneralField(email, 'E-mail', 2, 50))

    return errors
}

module.exports = {validateRegisterInput, validateNotEmpty, validateLength}