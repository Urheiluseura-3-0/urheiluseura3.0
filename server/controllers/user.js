const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const config = require('../utils/config')
const { User } = require('../models')
const { validateLoginInput } = require('./validate_input.js')

userRouter.post('/', async (request, response) => {

    try {

        const { username, password } = request.body

        const checkInputErrors = validateLoginInput(username, password)

        if (checkInputErrors.length > 0) {
            return response.status(401).json({ error: `${checkInputErrors}` })
        }

        const finduser = await User.findOne({ where: { username: username } })

        let user = null

        if (finduser) {
            user = finduser.dataValues
        }
        else {
            return response.status(401).json({ error: 'Virheellinen käyttäjänimi tai salasana' })
        }

        const checkPassword = user === null
            ? false
            : await bcrypt.compare(password, user.password)


        if (!(user && checkPassword)) {
            return response.status(401).json({ error: 'Virheellinen käyttäjänimi tai salasana' })
        }

        const userForToken = {
            username: user.username,
            id: user.id
        }

        const token = jwt.sign(
            userForToken,
            config.SECRET,
            { expiresIn: 60 * 60 }
        )

        return response
            .cookie('Token', token, { maxAge: 900000 })
            .status(200)
            .send({ username: user.username, name: user.name })

    } catch (error) {
        return response.status(400)
    }

})

//Log out
userRouter.get('/', async (request, response) => {
    try {
        return response
            .clearCookie('Token')
            .status(200)
            .json({ message: 'Succesfully logged out' })
    } catch (error) {
        return response.status(400)
    }
})


module.exports = userRouter