const supertest = require('supertest')
const { User } = require('../models')
const app = require('../app')
const testhelper = require('./test.helper')

const api = supertest(app)
let existingUser
let initialUser

const expectLoginStatus = async (user, expectedStatus, message) => {

    const response = await api
        .post('/api/login')
        .send(user)
    
    if(message){
        expect(response.body.error || response.body.message).toBe(message)
    }
    expect(response.status).toBe(expectedStatus)

}

beforeEach(async () => {
    const initialUsers = await testhelper.initializeInitialUsers()

    initialUser = initialUsers[0]

    testhelper.destroyAllUsers()

    await User.create(initialUser)
    
    existingUser = {
        username: 'Pekka35',
        password: 'salainen1234'
    }

})

test('non-existing user can not log in', async () => {
    const nonexistingUser = {
        username: 'Jaakko35',
        password: 'salainen123'
    }

    await expectLoginStatus(nonexistingUser, 401, 'Virheellinen käyttäjänimi tai salasana')

})


test('existing user can log in', async () => {
   
    await expectLoginStatus(existingUser, 200)

})

test('existing user cannot log in with wrong password', async () => {
    existingUser = {... existingUser, password :'thisiswrong123'}
   
    await expectLoginStatus(existingUser, 401, 'Virheellinen käyttäjänimi tai salasana')
    
})

test('logged in user can log out', async () => {

    await api
        .post('/api/login')
        .send(existingUser)
    
    const response = await api
        .get('/api/login')
    
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Uloskirjautuminen onnistui')

})

