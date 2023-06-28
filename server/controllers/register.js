const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerRouter = require('express').Router()
const config = require('../utils/config')
const { User } = require('../models')
const { validateRegisterInput } = require('../utils/validate_input.js')
const { checkMissing } = require('../utils/checks')

registerRouter.post('/', async (request, response) => {
    try {

        const {
            username, password, passwordConfirm, firstName, lastName, address, city, postalCode, phoneNumber, email
        } = request.body
        checkMissing(username, 'Käyttäjänimi puuttuu', response)
        checkMissing(password,'Salasana puuttuu', response)
        checkMissing(passwordConfirm, 'Salasanan varmistus puuttuu', response)
        checkMissing(firstName, 'Etunimi puuttuu', response)
        checkMissing(lastName, 'Sukunimi puuttuu', response)
        checkMissing(address, 'Osoite puuttuu', response)
        checkMissing(city, 'Kaupunki puuttuu', response)
        checkMissing(postalCode, 'Postiosoite puuttuu', response)
        checkMissing(phoneNumber, 'Puhelinnumero puuttuu', response)
        checkMissing(email, 'Sähköpostiosoite puuttuu', response)

        if (password != passwordConfirm) {
            return response.status(401).json({ error: 'Salasanat eivät täsmää.' })
        }

        const finduser = await User.findOne({ where: { username: username } })

        if (finduser) {
            return response.status(401).json({ error: 'Käyttäjätunnus on jo olemassa.' })
        }

        const findemail = await User.findOne({ where: { email: email } })
        if (findemail) {
            return response.status(401).json({ error: 'Sähköpostiosoite on jo käytössä' })
        }

        const checkInputErrors = validateRegisterInput(firstName, lastName, username, password, address, city,
            postalCode, phoneNumber, email)

        if (checkInputErrors.length > 0) {
            return response.status(401).json({ error: `${checkInputErrors}` })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            password: passwordHash,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            postalCode: postalCode,
            phoneNumber: phoneNumber,
            email: email
        })

        const savedUser = await User.create(user.dataValues)

        const userForToken = {
            username: savedUser.username,
            id: savedUser.id,
            isWorker: savedUser.isWorker,
            isForeman: savedUser.isForeman,
            isCoach: savedUser.isCoach,
            isSupervisor: savedUser.isSupervisor,
            isAdmin: savedUser.isAdmin
        }
        const token = jwt.sign(
            userForToken,
            config.SECRET,
            { expiresIn: 60 * 30 }
        )

        return response
            .cookie('UrheiluseuraToken', token, { maxAge: 1800000 })
            .status(200)
            .json(savedUser)

    } catch (error) {
        return response.status(400)
    }
})



module.exports = registerRouter