const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const resetRouter = require('express').Router()
const config = require('../utils/config')
const { User } = require('../models')
const { Reset } = require('../models')
const { validateEmail, validateResetPasswordInput } = require('./validate_input.js')
const { sendResetEmail } = require('./email.js')


resetRouter.post('/', async (request, response) => {
    try {
        const { email } = request.body
        const checkInputIsCorrect = validateEmail(email)
        if (!checkInputIsCorrect) {
            return response.status(400).json({ error: 'Virheellinen sähköpostiosoite' })
        }

        const finduser = await User.findOne({ where: { email: email } })
        if (!finduser) {
            return response.status(404).json({ error: 'Sähköpostiosoitetta ei löytynyt' })
        }

        const userForToken = {
            username: finduser.username,
            id: finduser.id,
            email: finduser.email
        }

        const findtoken = await Reset.findOne({ where: { userId: finduser.id } })
        if (findtoken) {
            findtoken.destroy()
        }

        const token = jwt.sign(
            userForToken,
            config.SECRET,
            { expiresIn: '1d' }
        )

        const expirationDate = moment().add(1, 'day').toDate()

        const reset = new Reset({
            userId: finduser.id,
            token: token,
            expires: expirationDate
        })
        await reset.save()

        if (await sendResetEmail(email, token)) {
            return response.status(200).json({ message: 'Linkki salasanan vaihtoon lähetetty' })
        } else {
            return response.status(400).json({ error: 'Linkin lähetys epäonnistui'})
        }
    } catch {
        return response.status(400)
    }
})

resetRouter.post('/:token', async (request, response) => {
    try {
        const reset = await Reset.findOne({ where: { token: request.params.token } })
        if (!reset) {
            return response.status(404).json({ error: 'Salasanan nollauspyyntöä ei löytynyt' })
        }

        const expirationTime = moment(reset.expires)
        const currentTime = moment()

        if (currentTime.isAfter(expirationTime)) {
            reset.destroy()
            return response.status(400).json({ error: 'Salasanan nollauspyyntö vanhentunut' })
        }
        const { password, passwordConfirm } = request.body

        if (password != passwordConfirm) {
            return response.status(400).json({ error: 'Salasanat eivät täsmää' })
        }

        const checkInputErrors = validateResetPasswordInput(password, passwordConfirm)
        if (checkInputErrors.length > 0) {
            return response.status(401).json({error: `${checkInputErrors}`})
        }

        const finduser = await User.findOne({ where: { id: reset.userId } })

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        finduser.update({ password: passwordHash })
        reset.destroy()
        return response.status(200).json({ message: 'Salasanan vaihto onnistui' })
    } catch {
        return response.status(400)
    }
}
)

module.exports = resetRouter