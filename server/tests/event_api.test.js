const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Event } =  require('../models')
const { Team } =  require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')

const api = supertest(app)

const handleToken = (token) => {

    const finalToken = token.split(';')[0]
    return finalToken
    
}

let user
let loggedUser 
let cookies
let cryptedToken

let finalToken
let team
let teams
let event


beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)

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

    const initialTeams = [
        {
            name: 'Naiset 3',
            category: 'N2D'
        },
        {
            name: 'EBT SB',
            category: 'N4D'
        },
        {
            name: 'EBT',
            category: 'N3D'
        },
    ]
    await Team.destroy({
        where: {},
        truncate:true,
        cascade: true
    })

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

})

test('event can be added with correct input', async () =>{

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(200)
})


test('event can be added without description', async () => {

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: ''
    }

    await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(200)
})


test('cannot add an event if team is missing', async () => {

    const newEvent = {

        team: '',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(401)
    
    expect(result.body.error).toContain('Virheellinen tiimi')
})

test('cannot add an event if opponent is missing', async () => {



    const newEvent = {

        team: team.id,
        opponent: '',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(401)
    
    expect(result.body.error).toBe('Virheellinen vastustaja')
})

test('cannot add an event if location is missing', async () => {

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: '',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('Virheellinen sijainti')
})

test('cannot add an event if date is missing', async () => {

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('Virheellinen päivämäärä')
})

test('cannot add an event if time is missing', async () => {

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('Virheellinen aika')
})



test('cannot add an event if token is invalid', async () => {

    const newEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti'
    }

    const result = await api
        .post('/api/event')
        .set('Cookie', 'InvalidToken')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toContain('Kirjaudu ensin sisään')
})


test('correct number of events in database', async () => {
    
    const NewEvent = {

        team: team.id,
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date: '2023-06-19',
        time:'12:30',
        description: 'Siivous'
    }

    await api
        .post('/api/event')
        .set('Cookie', finalToken)
        .send(NewEvent)
        .expect(200)
    
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