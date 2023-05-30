const supertest = require('supertest')
const bcrypt = require('bcrypt')
const {User} = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen12', saltRounds)

    const initialUser = [
        {
            firstName: 'Pekka',
            lastName: 'Testinen',
            username: 'Pekka35',
            password: passwordHash,
            address: 'Osoite',
            city: 'Helsinki',
            postalCode: '00300',
            phoneNumber: '0509876543',
            email: 'osoite@email.com'
        }
    ]
    await User.destroy({
        where: {},
        truncate: true
    })
    await User.create(initialUser[0])
})

test('non-existing user can not log in', async () => {
    const nonexistingUser = {
        username: 'Jaakko35',
        password: 'salainen2'
    }

    await api
        .post('/api/login')
        .send(nonexistingUser)
        .expect(401)
})


test('existing user can log in', async () => {
    const existingUser = {
        username: 'Pekka35',
        password: 'salainen12'
    }

    await api
        .post('/api/login')
        .send(existingUser)
        .expect(200)
})

