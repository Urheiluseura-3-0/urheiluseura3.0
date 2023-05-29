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

test('can register with non-existing username', async () => {
    const newUser = {
        name: 'Jaakko',
        newusername: 'Jaakko35',
        newpassword: 'salainen2'
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(200)
})


test('cannot register with existing username', async () => {
    const existingUser = {
        name: 'Pekka',
        newusername: 'Pekka35',
        newpassword: 'salainen'
    }

    await api
        .post('/api/register')
        .send(existingUser)
        .expect(401)
})

test('cannot register if mandatory values are missing', async () => {
    const newUser = {
        name: 'Jaakko',
        newusername: 'Jaakko35',
        newpassword: ''
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)
})
