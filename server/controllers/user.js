const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const config = require('../utils/config')
const { User } = require('../models')
const { validateLoginInput } = require('../utils/validate_input.js')
const { checkMissing } = require('../utils/checks')

userRouter.post('/login', async (request, response) => {

    try {

        const { username, password } = request.body
        checkMissing(username, 'Käyttäjänimi puuttuu', response)
        checkMissing(password,'Salasana puuttuu', response)

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
            id: user.id,
            isWorker: user.isWorker,
            isForeman: user.isForeman,
            isCoach: user.isCoach,
            isSupervisor: user.isSupervisor,
            isAdmin: user.isAdmin
        }

        const token = jwt.sign(
            userForToken,
            config.SECRET,
            { expiresIn: 60 * 60 }
        )

        return response
            .cookie('UrheiluseuraToken', token, { maxAge: 900000 })
            .status(200)
            .send({ username: user.username, name: user.name })

    } catch (error) {
        return response.status(400)
    }

})

userRouter.post('/logout', async (request, response) => {

    try {
        return response
            .clearCookie('UrheiluseuraToken')
            .status(200)
            .json({ message: 'Uloskirjautuminen onnistui' })
    } catch (error) {
        return response.status(400)
    }

})


module.exports = userRouter