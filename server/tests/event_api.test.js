const supertest = require('supertest')
const { User } = require('../models')
const { Event } =  require('../models')
const { Team } =  require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')
const testhelper = require('../tests/test.helper')

const api = supertest(app)

const handleToken = (token) => {

    const finalToken = token.split(';')[0]
    return finalToken
    
}

const expectTruthyAddedEvent = async (newEvent, token) => {
    await api
        .post('/api/event')
        .set('Cookie', token)
        .send(newEvent)
        .expect(200)
        
}
const expectFalsyAddedEvent = async (newEvent, token, message) => {
    const response = await api
        .post('/api/event')
        .set('Cookie', token)
        .send(newEvent)

    
    expect(response.status).toBe(401)
    expect(response.body.error).toContain(message)
    
        
}



let user
let loggedUser 
let cookies
let cryptedToken

let finalToken
let team
let teams
let event

let newEvent

beforeEach(async () => {


    testhelper.destroyAllUsers()

    const initialUsers = await testhelper.initializeInitialUsers()

    await User.bulkCreate(initialUsers)

    const initialTeams = testhelper.initialTeams

    testhelper.destroyAllTeams()

    teams = await Team.bulkCreate(initialTeams)

    const dateString = '2023-06-19T12:30:00.000Z'
    const timestamp = Date.parse(dateString)
    const dateTime = new Date(timestamp)
    user = await User.findOne({where: {username: 'Pekka35'}})
    const mikko = await User.findOne({where: {username: 'Mikko35'}})

    const initialEvents = [
        {   

            opponent: 'Honka I B',
            location: 'Espoonlahden urheiluhalli',
            dateTime: dateTime,
            description: 'Tuomarointi',
            teamId: teams[0].id,
            createdById: user.id,
            
        },
        {   

            opponent: 'Honka II B',
            location: 'Espoonlahden urheiluhalli',
            dateTime: dateTime,
            description: 'Kirjuri',
            teamId: teams[1].id,
            status: 1,
            createdById: user.id,
            
        },
        {   

            opponent: 'Honka III B',
            location: 'Espoonlahden urheiluhalli',
            dateTime: dateTime,
            description: 'Kirjuri',
            teamId: teams[1].id,
            status: 1,
            createdById: mikko.id,
            
        }
    ]
    
    await Event.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    await Event.bulkCreate(initialEvents)

    event = await Event.findOne({where: {opponent: 'Honka I B'}})

    user = {username: 'Pekka35', password: 'salainen1234'}
    loggedUser = await api.post('/api/login').send(user)
    cookies = new Cookies(loggedUser.headers['set-cookie'])
    cryptedToken = cookies.cookies[0]

    finalToken = handleToken(cryptedToken)

    team = await Team.findOne({where: {name: 'EBT SB'}})

    newEvent = {

        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    
})

test('event can be added with correct input', async () =>{

    newEvent = {...newEvent, team:team.id}
    await expectTruthyAddedEvent(newEvent, finalToken)
    
    
})


test('event can be added without description', async () => {

    newEvent = {...newEvent, description:'', team:team.id}
    
    await expectTruthyAddedEvent(newEvent, finalToken)
})


test('cannot add an event if team is missing', async () => {

    newEvent = {...newEvent, team:''}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Virheellinen tiimi')
    
})

test('cannot add an event if opponent is missing', async () => {

    newEvent = {...newEvent, opponent:'', team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Virheellinen vastustaja')
    
})

test('cannot add an event if location is missing', async () => {

    newEvent = {...newEvent, location:'', team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Virheellinen sijainti')

   
})

test('cannot add an event if date is missing', async () => {

    newEvent = {...newEvent, date:'', team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Virheellinen päivämäärä')

})

test('cannot add an event if time is missing', async () => {

    newEvent = {...newEvent, time:'', team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Virheellinen aika')

})



test('cannot add an event if token is invalid', async () => {

    newEvent = {...newEvent, team:team.id}

    await expectFalsyAddedEvent(newEvent, 'invalidToken', 'Kirjaudu ensin sisään')

})

test('cannot add an event if some input is too short', async () => {

    newEvent = {...newEvent, opponent:'H', team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken,'Sallittu pituus kentälle Vastustaja on 2-40 merkkiä')

   
})

test('cannot add an event if some input is too long', async () => {

    newEvent = {...newEvent, 
        opponent:'Honka 00000000000000000000000000000000000', 
        team:team.id}

    await expectFalsyAddedEvent(newEvent, finalToken, 'Sallittu pituus kentälle Vastustaja on 2-40 merkkiä')

})

test('cannot add an event if team is not found', async () => {

    newEvent = {...newEvent, team:1234566}
    await expectFalsyAddedEvent(newEvent, finalToken, 'Tiimin hakeminen epäonnistui')
})

test('correct number of events in database', async () => {
    
    newEvent = {...newEvent, team:team.id}

    await expectTruthyAddedEvent(newEvent, finalToken)
    
    const events = await Event.findAll()
    expect(events.length).toBe(4)

})

test('events can be fetched for user', async () => {
    const response = await api
        .get('/api/event')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.opponent)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('Honka I B')
    expect(contents).toContain('Honka II B')
})

test('events for user return teamnames', async () => {
    const response = await api
        .get('/api/event')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.EventTeam.name)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('Naiset 3')
    expect(contents).toContain('EBT SB')
})

test('Get by event id returns correct event', async () => {
    const response = await api
        .get(`/api/event/${event.id}`)
        .set('Cookie', finalToken)
    expect(response.body.opponent).toContain('Honka I B')
})

test('Get by event returns error code if id is invalid', async () => {
    const invalidId = 'ThisIdIsNotRight'
    await api
        .get(`/api/event/${invalidId}`)
        .set('Cookie', finalToken)
        .expect(400)
})

test('Get by event id returns teamname', async() => {
    const response = await api
        .get(`/api/event/${event.id}`)
        .set('Cookie', finalToken)
    expect(response.body.EventTeam.name).toContain('Naiset 3')
})