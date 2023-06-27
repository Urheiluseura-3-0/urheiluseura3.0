const supertest = require('supertest')
const { User } = require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')
const testhelper = require('../tests/test.helper')

const api = supertest(app)

beforeEach(async () => {
    testhelper.destroyAllUsers()
    const initialUsers = await testhelper.initializeInitialUsers()
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
    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/auth/login').send(user)
    const cookies = new Cookies(loggedUser.headers['set-cookie'])
    const cryptedToken = cookies.cookies[0]
    const finalToken = testhelper.handleToken(cryptedToken)

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
    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/auth/login').send(user)
    const cookies = new Cookies(loggedUser.headers['set-cookie'])
    const cryptedToken = cookies.cookies[0]
    const finalToken = testhelper.handleToken(cryptedToken)

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