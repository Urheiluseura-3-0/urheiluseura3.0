const supertest = require('supertest')
const { Team } = require('../models')
const { User } = require('../models')
const testhelper = require('./test.helper')
const app = require('../app')
const Cookies = require('universal-cookie')


const api = supertest(app)



let user
let loggedUser
let cookies
let cryptedToken
let finalToken
let initialUser
let newTeam

const expectFalsyAddedTeam = async(team, token, message) => {

    const result = await api
        .post('/api/team')
        .set('Cookie', token)
        .send(team)
        .expect(401)

    expect(result.body.error).toContain(message)
}

beforeEach(async () => {
    const initialTeams = testhelper.initialTeams

    const initialUsers = await testhelper.initializeInitialUsers()

    initialUser = initialUsers[0]

    testhelper.destroyAllUsers()
    testhelper.destroyAllTeams()
    
    user = await User.create(initialUser)
    user = { username: 'Pekka35', password: 'salainen1234' }
    loggedUser = await api.post('/api/auth/login').send(user)
    cookies = new Cookies(loggedUser.headers['set-cookie'])
    cryptedToken = cookies.cookies[0]

    finalToken = testhelper.handleToken(cryptedToken)

    await Team.bulkCreate(initialTeams)

    newTeam = {
        name:'WU19 Black',
        category:'Nuorten kilpa'
    }



})

test('Get all returns all teams', async () => {

    const response = await api
        .get('/api/team')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.name)
    expect(response.body).toHaveLength(3)
    expect(contents).toContain('Naiset 3')
    expect(contents).toContain('EBT SB')

})

test('Get by id returns correct team', async () => {
    const allTeams = await testhelper.teamsInDb()
    const teamToReturn = allTeams[1]
    const response = await api
        .get(`/api/team/${teamToReturn.id}`)
        .set('Cookie', finalToken)
    expect(response.body.name).toContain('EBT SB')

})

test('Incorrect id returns error code', async () => {
    const invalidId = 'thisIdISInvalid'
    await api
        .get(`/api/team/${invalidId}`)
        .set('Cookie', finalToken)
        .expect(400)
})

test('Team without a name can not be added', async () => {
    newTeam = {...newTeam, name:''}

    await expectFalsyAddedTeam(newTeam, finalToken, 'Nimi ei saa olla tyhjä')
    
})

test('Team with an existing name can not be added', async () => {
    newTeam = {...newTeam, name:'Naiset 3'}

    await expectFalsyAddedTeam(newTeam, finalToken, 'Joukkue on jo olemassa')
})

test('Team with too short of a name can not be added', async () => {
    newTeam = {...newTeam, name:'x'}
    await expectFalsyAddedTeam(newTeam, finalToken, ' Sallittu pituus kentälle Nimi on 2-40 merkkiä')
})

test('Team with too long of a name can not be added', async () => {
    newTeam = {...newTeam,
        name: 'ThisNameIsWayTooLooooooooooooooooooooooooooooooong'
    }
    await expectFalsyAddedTeam(newTeam, finalToken, ' Sallittu pituus kentälle Nimi on 2-40 merkkiä')
})

test('Team with correct input can be added', async () => {
    
    await api
        .post('/api/team')
        .set('Cookie', finalToken)
        .send(newTeam)
        .expect(200)
})

test('Team with too long of a category name can not be added', async () => {
    newTeam = {...newTeam,
        category: 'ThisCategoryIsWayTooLooooooooooooooooooooooooooooooong'
    }
    await expectFalsyAddedTeam(newTeam, finalToken, ' Sallittu pituus kentälle Kategoria on 40 merkkiä')
})