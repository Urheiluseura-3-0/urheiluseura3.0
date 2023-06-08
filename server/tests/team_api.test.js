const supertest = require('supertest')
const { Team } = require('../models')
const helper = require('./test.helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    const initialTeams = helper.initialTeams

    await Team.destroy({
        where: {},
        truncate:true,
        cascade: true
    })

    await Team.create(initialTeams[0])
    await Team.create(initialTeams[1])

})

test('Get all returns all teams', async () => {

    const response = await api.get('/api/team')
    const contents = response.body.map(r => r.name)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('Naiset 3')
    expect(contents).toContain('EBT SB')

})

test('Get by id returns correct team', async () => {
    const allTeams = await helper.teamsInDb()
    const teamToReturn = allTeams[1]
    const response = await api.get(`/api/team/${teamToReturn.id}`)
    expect(response.body.name).toContain('EBT SB')

})

test('Incorrect id returns error code', async () => {
    const invalidId = 'thisIdISInvalid'
    await api
        .get(`/api/team/${invalidId}`)
        .expect(400)
})

test('Team without a name can not be added', async() => {
    const newTeamNoName = {
        category: 'Juu'
    }
    const result = await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeamNoName)
        .expect(401)

    expect(result.body.error).toContain('ei saa olla tyhjä')
})

test('Team with an existing name can not be added', async() => {
    const newTeamExistingName = {
        name: 'Naiset 3'
    }
    const result = await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeamExistingName)
        .expect(401)

    expect(result.body.error).toContain('on jo olemassa')
})

test('Team with too short of a name can not be added', async() => {
    const newTeamShortName = {
        name: 'x'
    }
    const result = await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeamShortName)
        .expect(401)

    expect(result.body.error).toContain('pituus')
})

test('Team with too long of a name can not be added', async() => {
    const newTeamLongName = {
        name: 'ThisNameIsWayTooLooooooooooooooooooooooooooooooong'
    }
    const result = await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeamLongName)
        .expect(401)

    expect(result.body.error).toContain('pituus')
})

test('Team with correct input can be added', async() => {
    const newTeam = {
        name: 'GoodName',
        category: 'GoodCategory'
    }
    await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeam)
        .expect(200)
})

test('Team with too long of a category name can not be added', async() => {
    const newTeamLongCategory = {
        name: 'GoodName',
        category: 'ThisCategoryIsWayTooLooooooooooooooooooooooooooooooong'
    }
    const result = await api
        .post('/api/team')
        // .set('Cookie', finalToken)
        .send(newTeamLongCategory)
        .expect(401)

    expect(result.body.error).toContain('pituus')
})