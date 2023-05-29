const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const {User} = require('../models/user')

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

registerRouter.post('/', async (request, response) => {
    try {
        const name = request.body.name
        const lastName = request.body.lastName
        const username = request.body.newusername
        const password = request.body.newpassword
        const address = request.body.address
        const city = request.body.city
        const postalCode = request.body.postalCode
        const phoneNumber = request.body.phoneNumber
        const email = request.body.email
        const identityCode = request.body.identityCode
        
        const finduser = await User.findOne({where: {username: username}})
        
        if (finduser) {
            return response.status(401).json({error: 'Käyttäjätunnus on jo olemassa.'}) 
        }

        if (!validateRegisterInput(name, lastName, username, password, address, city, 
            postalCode, phoneNumber, email, identityCode)) {
            return response.status(401).json({error: 'Virheellinen syöte.'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            password: passwordHash,
            name: name,
            lastName: lastName,
            address: address,
            city: city,
            postalCode: postalCode,
            phoneNumber: phoneNumber,
            email: email,
            identityCode: identityCode
        })

        const savedUser = await User.create(user.dataValues)

        return response.status(200).json(savedUser)
    } catch (error) {
        return response.status(400)
    }
})



module.exports = registerRouter