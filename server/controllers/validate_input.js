const validateNotEmpty = (fields) => {
    let isOk = true
    fields.forEach(field => {
        if (field === '' || field === undefined) {
            isOk=false
        }
    })

    return isOk
}

const validateLength = (fields, min, max) => {
    let isOk = true
    fields.forEach(field => {
        if (field !== undefined && field.length > 0) {
            if (field.length < min || field.length > max) {
                isOk = false
            }
        }
    })

    return isOk
}

const validateRegisterInput = (name, lastName, username, password, address, city,
    postalCode, phoneNumber, email, identityCode) => {
    if (!validateNotEmpty([name, username, password])) {
        return false
    } else if (!validateLength([username], 5, 15)) {
        return false
    } else if (!validateLength([postalCode], 5, 5)) {
        return false
    } else if (!validateLength([identityCode], 11, 11)) {
        return false
    } else if (!validateLength([name, lastName, address, city, phoneNumber, email], 0, 50)) {
        return false
    } else {
        return true
    }
}

module.exports = {validateRegisterInput}