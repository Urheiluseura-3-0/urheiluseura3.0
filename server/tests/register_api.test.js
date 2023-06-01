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
            firstName: 'Pekka',
            lastName: 'Testinen',
            username: 'Pekka35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
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

test('can register with non-existing username and otherwise correct input', async () => {
    const newUser = {
        firstName: 'Jaakko',
        lastName: 'Testaaja',
        username: 'Jaakko35',
        password: 'salainen22',
        passwordConfirm: 'salainen22',
        address: 'Osoite',
        postalCode: '00300',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
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
        lastName: 'Testaaja',
        username: 'Jaakko35',
        password: 'salainen22',
        passwordConfirm: 'salainen22',
        address: 'Osoite',
        postalCode: '00300',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
    }

    const existingUser = {
        firstName: 'Pekka',
        lastName: 'Testinen',
        username: 'Pekka35',
        password: 'salainen123',
        passwordConfirm: 'salainen123',
        address: 'Osoite',
        postalCode: '00300',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
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

test('cannot register with existing username and otherwise correct input', async () => {
    const existingUser = {
        firstName: 'Pekka',
        lastName: 'Testaaja',
        username: 'Pekka35',
        password: 'salainen123',
        passwordConfirm: 'salainen123',
        address: 'Osoite',
        city: 'Helsinki',
        postalCode: '00300',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
    }

    await api
        .post('/api/register')
        .send(existingUser)
        .expect(401)
})

test('cannot register if mandatory values are missing', async () => {
    const newUser = {
        firstName: 'Jaakko',
        lastName: '',
        username: 'Jaakko35',
        password: 'salainen123',
        passwordConfirm: 'salainen123',
        address: 'Osoite',
        city: 'Helsinki',
        postalCode: '00300',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)
})

test('cannot register if input is invalid', async () => {
    const newUser = {
        firstName: 'Jaakko',
        lastName: 'Testaaja',
        username: 'Jaakko35',
        password: 'salainen123',
        passwordConfirm: 'salainen123',
        address: 'Osoite',
        postalCode: '0030',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)    
})

test('cannot register if passwords do not match', async () => {
    const newUser = {
        firstName: 'Jaakko',
        lastName: 'Testaaja',
        username: 'Jaakko35',
        password: 'salainen22',
        passwordConfirm: 'salainen123',
        address: 'Osoite',
        postalCode: '00300',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'osoite@email.com'
    }

    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)    
})