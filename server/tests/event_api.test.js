const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Event } =  require('../models')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen', saltRounds)

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
        truncate: true
    })
    await User.create(initialUser[0])

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token


    const initialEvent = [
        {   

            team: 'Miehet I B',
            opponent: 'Honka I B',
            location: 'Espoonlahden urheiluhalli',
            date:'2023-06-19',
            time:'12:30',
            description: 'Tuomarointi',
            token: cryptedToken
        }
    ]
    await Event.destroy({
        where: {},
        truncate: true
    })
    await Event.create(initialEvent[0])
})

test('event can be added with correct input', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
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

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(200)
})




test('cannot add an event if team is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
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

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('cannot add an event if opponent is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
        opponent: '',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken 
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('cannot add an event if location is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: '',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('cannot add an event if date is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('cannot add an event if time is missing', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token

    const newEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('cannot add an event if token is missing', async () => {

    const newEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: 'invalid'
    }

    await api
        .post('/api/event')
        .send(newEvent)
        .expect(401)
})

test('correct number of events in database', async () => {

    const user = {username: 'Pekka35', password: 'salainen'}
    const loggedUser = await api.post('/api/login').send(user)

    const cryptedToken = loggedUser.body.token
    
    const firstNewEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date: '2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    const secondNewEvent = {

        team: 'Miehet I B',
        opponent: 'Honka I B',
        location: 'Espoonlahden urheiluhalli',
        date:'2023-06-19',
        time:'12:30',
        description: 'Lipunmyynti',
        token: cryptedToken
    }

    let events = await Event.findAll()
    expect(events.length).toBe(1)

    await api
        .post('/api/event')
        .send(firstNewEvent)

    events = await Event.findAll()
    expect(events.length).toBe(2)
    
    await api
        .post('/api/event')
        .send(secondNewEvent)

    events = await Event.findAll()
    expect(events.length).toBe(3)


})