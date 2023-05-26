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
            name: 'Pekka Testinen',
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
        password: 'salainen'
    }

    await api
        .post('/api/login')
        .send(existingUser)
        .expect(200)
})

