const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
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
        truncate: true,
        cascade: true
    })
    await User.create(initialUser[0])
})

test('non-existing user can not log in', async () => {
    const nonexistingUser = {
        username: 'Jaakko35',
        password: 'salainen123'
    }

    const response = await api
        .post('/api/login')
        .send(nonexistingUser)
    
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Virheellinen käyttäjänimi tai salasana')
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

test('existing user cannot log in with wrong password', async () => {
    const existingUser = {
        username: 'Pekka35',
        password: 'salainen12345'
    }

    const response = await api
        .post('/api/login')
        .send(existingUser)
    
    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Virheellinen käyttäjänimi tai salasana')
})

test('logged in user can log out', async () => {
    const existingUser = {
        username: 'Pekka35',
        password: 'salainen12'
    }

    await api
        .post('/api/login')
        .send(existingUser)
    
    const response = await api
        .get('/api/login')
    
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Uloskirjautuminen onnistui')

})

