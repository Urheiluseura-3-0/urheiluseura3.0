const supertest = require('supertest')
const bcrypt = require('bcrypt')
const {User} = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen', saltRounds)

    const initialUser = [
        {
            firstName: 'Pekka Testinen',
            username: 'Pekka35',
            password: passwordHash,
        }
    ]
    await User.destroy({
        where: {},
        truncate: true
    })
    await User.create(initialUser[0])
})

test('can register with non-existing username', async () => {
    const newUser = {
        firstName: 'Jaakko',
        username: 'Jaakko35',
        password: 'salainen22'
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(200)
    
    const users = await User.findAll()
    expect(users.length).toBe(2)
})

test('correct number of users in database', async () => {
    const newUser = {
        firstName: 'Jaakko',
        username: 'Jaakko35',
        password: 'salainen22'
    }

    const existingUser = {
        firstName: 'Pekka',
        username: 'Pekka35',
        password: 'salainen'
    }

    let users = await User.findAll()
    expect(users.length).toBe(1)

    await api
        .post('/api/register')
        .send(newUser)

    users = await User.findAll()
    expect(users.length).toBe(2)

    await api
        .post('/api/register')
        .send(existingUser)

    users = await User.findAll()
    expect(users.length).toBe(2)
})

test('cannot register with existing username', async () => {
    const existingUser = {
        firstName: 'Pekka',
        username: 'Pekka35',
        password: 'salainen'
    }

    await api
        .post('/api/register')
        .send(existingUser)
        .expect(401)
})

test('cannot register if mandatory values are missing', async () => {
    const newUser = {
        firstName: 'Jaakko',
        username: 'Jaakko35',
        password: ''
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)
})
