const validateNotEmpty = (value) => {
    if (value === '' || value === undefined) {
        return false
    }

    return true
}

const validateLength = (value, min, max) => {
    if (value !== undefined && value.length > 0) {
        if (value.length < min || value.length > max) {
            return false
        }
        return true
    }

    return true
}

const validateOnlyNumbers = (value) => {
    if (value.match(/^[0-9]+$/) != null) {
        return true
    }

    return false
}

const validatePhoneNumber = (value) => {
    const stripped = value.replaceAll(' ','').replaceAll('-','')

    if (stripped.match(/^[+]?\d{3,14}$/) != null) {
        return true
    }

    return false

}

const validateEmail = (value) => {
    if (value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) != null) {
        return true
    }
    return false
}

const validateMandatoryField = (value, field, min, max) => {
    const errors = []

    if (!validateNotEmpty(value)) {
        errors.push(` ${field} ei saa olla tyhjä`)
    } else if (!validateLength(value, min, max)) {
        if (min === max) {
            errors.push(` Sallittu pituus kentälle ${field} on ${min} merkkiä`)
        } else {
            errors.push(` Sallittu pituus kentälle ${field} on ${min}-${max} merkkiä`)
        }
    } else if (field === 'Postinumero') {
        if (!validateOnlyNumbers(value)) {
            errors.push(` ${field} saa sisältää vain numeroita`)
        }
    } else if (field === 'Puhelinnumero') {
        if (!validatePhoneNumber(value)) {
            errors.push(` ${field} voi alkaa numerolla tai merkillä + ja sisältää muuten vain numeroita, välilyöntejä ja yhdysmerkkejä`)
        }
    } else if (field === 'E-mail') {
        if (!validateEmail(value)) {
            errors.push(` ${field} ei ole oikean muotoinen`)
        }
    }

    return errors
}


const validateRegisterInput = (firstName, lastName, username, password, address,
    postalCode, city, phoneNumber, email) => {
    let errors = []
    errors = errors.concat(validateMandatoryField(username, 'Käyttäjätunnus', 5, 15))
    errors = errors.concat(validateMandatoryField(password, 'Salasana', 10, 30))
    errors = errors.concat(validateMandatoryField(firstName, 'Etunimi', 2, 40))
    errors = errors.concat(validateMandatoryField(lastName, 'Sukunimi', 2, 40))
    errors = errors.concat(validateMandatoryField(address, 'Osoite', 2, 40))
    errors = errors.concat(validateMandatoryField(postalCode, 'Postinumero', 5, 5))
    errors = errors.concat(validateMandatoryField(city, 'Kaupunki', 2, 40))
    errors = errors.concat(validateMandatoryField(phoneNumber, 'Puhelinnumero', 5, 15))
    errors = errors.concat(validateMandatoryField(email, 'E-mail', 5, 40))

    return errors
}

const validateLoginInput = (username, password) => {
    let errors = []
    errors = errors.concat(validateMandatoryField(username, 'Käyttäjänimi', 5, 15))
    errors = errors.concat(validateMandatoryField(password, 'Salasana', 10, 30))
    return errors
}

module.exports = {validateRegisterInput,
    validateLoginInput,
    validateLength,
    validateNotEmpty,
    validateOnlyNumbers,
    validatePhoneNumber,
    validateEmail}