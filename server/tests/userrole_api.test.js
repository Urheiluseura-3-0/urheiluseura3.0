const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')

const api = supertest(app)

const handleToken = (token) => {

    const finalToken = token.split(';')[0]
    return finalToken
    
}

beforeEach(async () => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen12', saltRounds)

    const initialUsers = [
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
        },
        {
            firstName: 'Mikko',
            lastName: 'Testinen',
            username: 'Mikko35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
            phoneNumber: '0509876543',
            email: 'osoite2@email.com'
        }
    ]
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    await User.bulkCreate(initialUsers)

})

test('User role is worker and coach when a new user is created', async () => {
    const user = await User.findOne({where: {username: 'Pekka35'}})
    expect(user.isWorker).toBe(1)
    expect(user.isCoach).toBe(1)
    expect(user.isSupervisor).toBe(0)
    expect(user.isForeman).toBe(0)
    expect(user.isAdmin).toBe(0)
})

test('Role changes when a request is made', async () => {
    const user = {username: 'Pekka35', password: 'salainen12'}
    const loggedUser = await api.post('/api/login').send(user)
    const cookies = new Cookies(loggedUser.headers['set-cookie'])
    const cryptedToken = cookies.cookies[0]
    const finalToken = handleToken(cryptedToken)

    const roles = {
        isWorker: 0,
        isCoach: 0,
        isSupervisor: 0,
        isForeman: 1
    }
    const userToChange = await User.findOne({where: {username: 'Mikko35'}})

    expect(userToChange.isWorker).toBe(1)
    expect(userToChange.isCoach).toBe(1)
    expect(userToChange.isSupervisor).toBe(0)
    expect(userToChange.isForeman).toBe(0)
    expect(userToChange.isAdmin).toBe(0)

    const id = userToChange.id
    await api.put(`/api/userrole/${id}`)
        .set('Cookie', finalToken)
        .send(roles)
        .expect(200)

    const changedUser = await User.findOne({where: {username: 'Mikko35'}})

    expect(changedUser.isWorker).toBe(0)
    expect(changedUser.isCoach).toBe(0)
    expect(changedUser.isSupervisor).toBe(0)
    expect(changedUser.isForeman).toBe(1)
    expect(changedUser.isAdmin).toBe(0)
})

test('Cannot change roles of id that does not exist', async () => {
    const user = {username: 'Pekka35', password: 'salainen12'}
    const loggedUser = await api.post('/api/login').send(user)
    const cookies = new Cookies(loggedUser.headers['set-cookie'])
    const cryptedToken = cookies.cookies[0]
    const finalToken = handleToken(cryptedToken)

    const roles = {
        isWorker: 0,
        isCoach: 0,
        isSupervisor: 0,
        isForeman: 1
    }
    const id = 34732468
    await api.put(`/api/userrole/${id}`)
        .set('Cookie', finalToken)
        .send(roles)
        .expect(404)
})