const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerRouter = require('express').Router()
const config = require('../utils/config')
const {User} = require('../models')
const {validateRegisterInput} = require('../utils/validate_input.js')

registerRouter.post('/', async (request, response) => {
    try {
        const username = request.body.username
        const password = request.body.password
        const passwordConfirm = request.body.passwordConfirm
        const firstName = request.body.firstName
        const lastName = request.body.lastName
        const address = request.body.address
        const city = request.body.city
        const postalCode = request.body.postalCode
        const phoneNumber = request.body.phoneNumber
        const email = request.body.email

        if (password != passwordConfirm) {
            return response.status(401).json({error: 'Salasanat eivät täsmää.'})
        }
        
        const finduser = await User.findOne({where: {username: username}})

        if (finduser) {
            return response.status(401).json({error: 'Käyttäjätunnus on jo olemassa.'}) 
        }

        const findemail = await User.findOne({where: {email: email}})
        if (findemail) {
            return response.status(401).json({error: 'Sähköpostiosoite on jo käytössä'})
        }

        const checkInputErrors = validateRegisterInput(firstName, lastName, username, password, address, city, 
            postalCode, phoneNumber, email)

        if (checkInputErrors.length > 0) {
            return response.status(401).json({error: `${checkInputErrors}`})
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
            id: savedUser.id
        }
        const token = jwt.sign(
            userForToken,
            config.SECRET,
            { expiresIn: 60 * 60 }
        )
        return response
            .cookie('Token', token, { maxAge: 900000 })
            .status(200)
            .json(savedUser)
    } catch (error) {
        return response.status(400)
    }
})



module.exports = registerRouter