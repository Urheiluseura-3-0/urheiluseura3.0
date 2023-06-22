const supertest = require('supertest')
//const bcrypt = require('bcrypt')
const {User} = require('../models')
const app = require('../app')
const testhelper = require('../tests/test.helper')

const api = supertest(app)
let initialUser
let newUser

const expectFaultyRegisteredUser = async(newUser) => {
    await api
        .post('/api/register')
        .send(newUser)
        .expect(401)
}


beforeEach(async () => {


    const initialUsers = await testhelper.initializeInitialUsers()

    initialUser = initialUsers[0]

    testhelper.destroyAllUsers()

    await User.create(initialUser)

    newUser = {
        firstName: 'Jaakko',
        lastName: 'Testaaja',
        username: 'Jaakko35',
        password: 'salainen22',
        passwordConfirm: 'salainen22',
        address: 'Osoite',
        postalCode: '00300',
        city: 'Helsinki',
        phoneNumber: '0509876543',
        email: 'uusiosoite@email.com'
    }
})

test('can register with non-existing username and otherwise correct input', async () => {

    await api
        .post('/api/register')
        .send(newUser)
        .expect(200)
    
    const users = await User.findAll()
    expect(users.length).toBe(2)
})

test('correct number of users in database', async () => {

    const existingUser = { ...initialUser, 
        password: 'salainen123', 
        passwordConfirm:'salainen123',
        email: 'uusiosoite2@email.com'
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


    const existingUser = { ...initialUser,
        lastName: 'Testinen',
        password: 'salainen401',
        passwordConfirm: 'salainen401'
    }

    expectFaultyRegisteredUser(existingUser)
})

test('cannot register if first name is missing', async () => {
    newUser = {...newUser, firstName:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if last name is missing', async () => {
    newUser = {...newUser, lastName:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if username is missing', async () => {
    newUser = {...newUser, username:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if address is missing', async () => {
    newUser = {...newUser, address:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if city is missing', async () => {
    newUser = {...newUser, city:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if postal code is missing', async () => {
    newUser = {...newUser, postalCode:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if phone number is missing', async () => {
    newUser = {...newUser, phoneNumber:''}

    expectFaultyRegisteredUser(newUser)
})

test('cannot register if email is missing', async () => {
    newUser = {...newUser, email:''}

    expectFaultyRegisteredUser(newUser)
})


test('cannot register if postal code is invalid', async () => {

    newUser = {...newUser, postalCode : '0030'}

    expectFaultyRegisteredUser(newUser)  
})

test('cannot register if phone number is invalid', async () => {

    newUser = {...newUser, phoneNumber : 'ABCDE'}

    expectFaultyRegisteredUser(newUser)  
})

test('cannot register if email is invalid', async () => {

    newUser = {...newUser, email : 'invalidemail@'}

    expectFaultyRegisteredUser(newUser)  
})

test('cannot register if passwords do not match', async () => {
    
    newUser = {...newUser, password:'salainen401'}

    expectFaultyRegisteredUser(newUser)
})