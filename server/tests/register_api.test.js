const supertest = require('supertest')
const {User} = require('../models')
const app = require('../app')
const testhelper = require('../tests/test.helper')

const api = supertest(app)
let initialUser
let newUser

const expectFalsyRegisteredUser = async(newUser) => {
    const response= await api
        .post('/api/register')
        .send(newUser)

    expect(response.status).toBe(401)
    
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

    await expectFalsyRegisteredUser(existingUser)
})

test('cannot register if first name is missing', async () => {
    newUser = {...newUser, firstName:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if last name is missing', async () => {
    newUser = {...newUser, lastName:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if username is missing', async () => {
    newUser = {...newUser, username:''}

    await await expectFalsyRegisteredUser(newUser)
})

test('cannot register if address is missing', async () => {
    newUser = {...newUser, address:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if city is missing', async () => {
    newUser = {...newUser, city:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if postal code is missing', async () => {
    newUser = {...newUser, postalCode:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if phone number is missing', async () => {
    newUser = {...newUser, phoneNumber:''}

    await expectFalsyRegisteredUser(newUser)
})

test('cannot register if email is missing', async () => {
    newUser = {...newUser, email:''}

    await expectFalsyRegisteredUser(newUser)
})


test('cannot register if postal code is invalid', async () => {

    newUser = {...newUser, postalCode : '0030'}

    await expectFalsyRegisteredUser(newUser)  
})

test('cannot register if phone number is invalid', async () => {

    newUser = {...newUser, phoneNumber : 'ABCDE'}

    await expectFalsyRegisteredUser(newUser)  
})

test('cannot register if email is invalid', async () => {

    newUser = {...newUser, email : 'invalidemail@'}

    await expectFalsyRegisteredUser(newUser)  
})

test('cannot register if passwords do not match', async () => {
    
    newUser = {...newUser, password:'salainen401'}

    await expectFalsyRegisteredUser(newUser)
})