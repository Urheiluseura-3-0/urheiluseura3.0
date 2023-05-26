const bcrypt = require('bcrypt')
const registerRouter = require('express').Router()
const User = require('../models/user')



registerRouter.post('/', async (request, response) => {
    try {
        const { name, newusername, newpassword } = request.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(newpassword, saltRounds)

        const user = new User({
            name: name,
            username: newusername,
            password: passwordHash,
        })

        const savedUser = await User.create(user.dataValues)

        response.json(savedUser)
    } catch (error) {
        return response.status(400)
    }
})

module.exports = registerRouter