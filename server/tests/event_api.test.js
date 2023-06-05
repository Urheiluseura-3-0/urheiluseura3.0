const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Event } =  require('../models')
const { Team } =  require('../models')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)

    const initialUser = [
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
        }
    ]
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    const user = await User.create(initialUser[0])

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
    const team = await Team.create(initialTeams[0])
    await Team.create(initialTeams[1])
    await Team.create(initialTeams[2])

    const dateString = '2023-06-19T12:30:00.000Z'
    const timestamp = Date.parse(dateString)
    const dateTime = new Date(timestamp)

    const initialEvent = [
        {   

            opponent: 'Honka I B',
            location: 'Espoonlahden urheiluhalli',
            dateTime: dateTime,
            description: 'Tuomarointi',
            teamId: team.id,
            createdById: user.id,
            
        }
    ]
    
    await Event.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    await Event.create(initialEvent[0])

})

test('event can be added with correct input', async () => {
    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)
    const cryptedToken = loggedUser.body.token
    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(200)
})

test('event can be added without description', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: '',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(200)
})


test('cannot add an event if team is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: '',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken 
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
    
    expect(result.body.error).toContain('team missing')
})

test('cannot add an event if team is incorrect', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Helsingin lentopalloilijat',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken 
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
    
    expect(result.body.error).toContain('incorrect team')
})



test('cannot add an event if opponent is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'EBT SB',
        opponent: '',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken 
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
    
    expect(result.body.error).toBe('opponent missing')
})

test('cannot add an event if location is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: '',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('location missing')
})

test('cannot add an event if date is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('date missing')
})

test('cannot add an event if time is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('time missing')
})

test('cannot add an event if token is missing', async () => {

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: ''
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toBe('token missing')
})

test('cannot add an event if token is invalid', async () => {

    const newEvent = {

        team: 'EBT SB',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: 'invalid'
    }

    const result = await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)

    expect(result.body.error).toContain('invalid token')
})


test('correct number of events in database', async () => {

    const user = {username: 'Pekka35', password: 'salainen1234'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token
    
    const NewEvent = {

        team: 'EBT',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date: '2023-06-19',
        time:'12:30',
        description: 'Siivous',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(NewEvent)
        .expect(200)
    
    const events = await Event.findAll()
    expect(events.length).toBe(2)

})
