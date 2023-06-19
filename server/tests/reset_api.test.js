const supertest = require('supertest')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Reset } = require('../models')
const app = require('../app')
const api = supertest(app)

let user
let reset

let userEmail


beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)
    const testAccount = await nodemailer.createTestAccount()
    userEmail = testAccount.user
    console.log('userEmail', userEmail)
    const initialUsers = [
        {
            firstName: 'Pekka',
            lastName: 'Testinen',
            username: 'Pekka35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
            phoneNumber: '0509876543',
            email: userEmail
        },
        {
            firstName: 'Mikko',
            lastName: 'Testinen',
            username: 'Mikko35',
            password: passwordHash,
            address: 'Osoitetie 1',
            postalCode: '03300',
            city: 'Vantaa',
            phoneNumber: '0509876542',
            email: 'testi@email.com'
        },
    ]
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    await User.bulkCreate(initialUsers)
    user = await User.findOne({where: {username: 'Pekka35'}})
})

test('Password request can be requested with valid email', async () => {
    const validEmail = { email: user.email }
    console.log('validEmail', validEmail)
    const result = await api
        .post('/api/reset')
        .send(validEmail)
        .expect(200)

    expect(result.body.message).toBe('Linkki salasanan vaihtoon lähetetty')
}, 20000)

test('Password can not be requested with invalid email', async () => {
    const invalidEmail = { email: 'tes.com' }

    const result = await api
        .post('/api/reset')
        .send(invalidEmail)
        .expect(400)

    expect(result.body.error).toBe('Virheellinen sähköpostiosoite')
})

test('Password can not be requested with not existing email', async () => {
    const invalidEmail = { email: 'test@test.com' }

    const result = await api
        .post('/api/reset')
        .send(invalidEmail)
        .expect(404)

    expect(result.body.error).toBe('Sähköpostiosoitetta ei löytynyt')
})

describe('When a reset request has been made', () => {
    beforeEach(async () => {
        await Reset.destroy({
            where: {},
            truncate: true,
            cascade: true
        })
        console.log('EMAIL', user)
        await api
            .post('/api/reset')
            .send({ email: user.email })
            .expect(200)
        reset = await Reset.findOne({ where: { userId: user.id } })
    })

    test('Password is changed with a valid token and passwords', async () => {

        const passwords = {
            password: 'kissakoira223',
            passwordConfirm: 'kissakoira223'
        }
        const result = await api
            .post(`/api/reset/${reset.token}`)
            .send(passwords)
            .expect(200)
        expect(result.body.message).toBe('Salasanan vaihto onnistui')

    })

    test('Password is not changed with mismatching passwords', async () => {

        const passwords = {
            password: 'kissakoira223',
            passwordConfirm: 'kissakoira123'
        }
        const result = await api
            .post(`/api/reset/${reset.token}`)
            .send(passwords)
            .expect(400)
        expect(result.body.error).toBe('Salasanat eivät täsmää')

    })

    test('Password is not changed with an invalid token', async () => {

        const passwords = {
            password: 'kissakoira223',
            passwordConfirm: 'kissakoira223'
        }
        const erroneousToken = 'asd123asdlkjasdoij123jnahsdokjajsd'

        const result = await api
            .post(`/api/reset/${erroneousToken}`)
            .send(passwords)
            .expect(404)

        expect(result.body.error).toBe('Salasanan nollauspyyntöä ei löytynyt')

    }, 20000)
})