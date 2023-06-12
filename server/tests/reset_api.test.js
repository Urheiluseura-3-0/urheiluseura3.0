const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Reset } = require('../models')
const app = require('../app')
const api = supertest(app)


let user
let reset

beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)

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
            email: 'osoite@email.com'
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

    const result = await api
        .post('/api/reset')
        .send(validEmail)
        .expect(200)

    expect(result.body.message).toBe('Linkki salasanan vaihtoon lähetetty')
})

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
        await api
            .post('/api/reset')
            .send({ email: user.email })
        reset = await Reset.findOne({ where: { email: user.email } })
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
})