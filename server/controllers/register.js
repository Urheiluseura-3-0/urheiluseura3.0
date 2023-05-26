const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const User = require('../models/user')



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

        response.json(savedUser)
    } catch (error) {
        return response.status(400)
    }
})



module.exports = registerRouter