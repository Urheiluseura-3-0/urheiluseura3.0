const supertest = require('supertest')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Reset } = require('../models')
const app = require('../app')
const testhelper = require('./test.helper')
const api = supertest(app)

let user
let reset

let userEmail
let brokenEmailUser
let passwords 

const expectResetStatus = async (email, expectedStatus, message) => {

    const response = await api
        .post('/api/reset')
        .send(email)
    
    if(message){
        expect(response.body.error || response.body.message).toBe(message)
    }
    expect(response.status).toBe(expectedStatus)

}

const expectStatusForBothPasswords = async (token, passwords, expectedStatus, message) => {

    const response = await api
        .post(`/api/reset/${token}`)
        .send(passwords)
    
    if(message){
        expect(response.body.error || response.body.message).toBe(message)
    }
    expect(response.status).toBe(expectedStatus)

}


beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)
    const testAccount = await nodemailer.createTestAccount()
    userEmail = testAccount.user

    const initialUsers = await testhelper.initializeInitialUsers()

    initialUsers[0].email = userEmail
    const newUser = {
        firstName: 'Rikki',
        lastName: 'Sähköposti',
        username: 'RikkiOn',
        password: passwordHash,
        address: 'Rikkitie 1',
        postalCode: '03300',
        city: 'Vantaa',
        phoneNumber: '050123123',
        email: 'rikkiniston@11112312312312132.333'
    }
    
    initialUsers.push(newUser)

    testhelper.destroyAllUsers()

    await User.bulkCreate(initialUsers)
    user = await User.findOne({ where: { username: 'Pekka35' } })
    brokenEmailUser = await User.findOne({ where: { username: 'RikkiOn' } })
    passwords = {
        password: 'kissakoira223',
        passwordConfirm: 'kissakoira223'
    }

})

test('Password request can be requested with valid email', async () => {
    const validEmail = { email: user.email }

    await expectResetStatus(validEmail, 200, 'Linkki salasanan vaihtoon lähetetty' )

}, 20000)

test('Password can not be requested with invalid email', async () => {
    const invalidEmail = { email: 'tes.com' }

    await expectResetStatus(invalidEmail, 400, 'Virheellinen sähköpostiosoite')
})

test('User with an invalid email address is notified of failure to send email', async () => {
    const brokenEmail = { email: brokenEmailUser.email }

    await expectResetStatus(brokenEmail, 400, 'Linkin lähetys epäonnistui')
}, 20000)

test('Password can not be requested with not existing email', async () => {
    const invalidEmail = { email: 'test@test.com' }

    await expectResetStatus(invalidEmail, 404, 'Sähköpostiosoitetta ei löytynyt')
})

describe('When a reset request has been made', () => {
    beforeEach(async () => {
        await Reset.destroy({
            where: {},
            truncate: true,
            cascade: true
        })

        const email = {email : user.email}
        await expectResetStatus(email, 200)
        reset = await Reset.findOne({ where: { userId: user.id } })
    }, 20000)

    test('Password is changed with a valid token and passwords', async () => {
        
        await expectStatusForBothPasswords(reset.token, passwords, 200,'Salasanan vaihto onnistui')

    }, 20000)

    test('Password is not changed with mismatching passwords', async () => {

        passwords = {...passwords, passwordConfirm: 'kissakoira123'}

        await expectStatusForBothPasswords(reset.token, passwords, 400,'Salasanat eivät täsmää')

    }, 20000)

    test('Password is not changed with an invalid token', async () => {

        const erroneousToken = 'asd123asdlkjasdoij123jnahsdokjajsd'

        await expectStatusForBothPasswords(erroneousToken, passwords, 404,'Salasanan nollauspyyntöä ei löytynyt')

    }, 20000)

    test('Reset works also if there is already an existing token for user', async () => {

        await expectResetStatus({email: user.email}, 200)
        
    }, 20000)
})