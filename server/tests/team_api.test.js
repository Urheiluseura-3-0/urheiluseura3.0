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