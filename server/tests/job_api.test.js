const supertest = require('supertest')
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { Job } =  require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')
const { hoursToDecimal } = require('../controllers/job')

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
        },
        {
            firstName: 'Teemu',
            lastName: 'Testinen',
            username: 'Teemu35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
            phoneNumber: '0509876543',
            email: 'osoite3@email.com',
            isForeman: 1
        }
    ]

    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    await User.bulkCreate(initialUsers)

    const dateString = '2023-06-19T12:30:00.000Z'
    const timestamp = Date.parse(dateString)
    const dateTime = new Date(timestamp)
    const pekka = await User.findOne({where: {username: 'Pekka35'}})
    const mikko = await User.findOne({where: {username: 'Mikko35'}})
    const teemu = await User.findOne({where: {username: 'Teemu35'}})

    const initialJobs = [
        {
            createdById: pekka.id,
            squad: 'EBT Naiset',
            context: 'Psykologinen valmennus',
            dateTime: dateTime,
            location: 'Leppävaara',
            hours: 1.25
        },
        {
            createdById: pekka.id,
            squad: 'EBT PojatU19',
            context: 'Psykologinen valmennus',
            dateTime: dateTime,
            location: 'Leppävaara',
            hours: 2.25
        },
        {
            createdById: mikko.id,
            squad: 'EBT PojatU19',
            context: 'Lajivalmennus',
            dateTime: dateTime,
            location: 'Leppävaara',
            hours: 4.75
        },
        {
            createdById: mikko.id,
            squad: 'EBT Miehet',
            context: 'Lajivalmennus',
            dateTime: dateTime,
            location: 'Espoo',
            hours: 1.5,
            status: 1,
            confirmedById: teemu.id
        }

    ]
    await Job.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    await Job.bulkCreate(initialJobs)

    user = {username: 'Pekka35', password: 'salainen1234'}
    loggedUser = await api.post('/api/login').send(user)
    cookies = new Cookies(loggedUser.headers['set-cookie'])
    cryptedToken = cookies.cookies[0]

    finalToken = handleToken(cryptedToken)

} )

test('job can be added with correct input', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(200)
})

test('job can be added without context', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: '',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(200)
})

test('cannot add a job if squad is missing', async () =>{

    const newJob = {

        squad: '',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Virheellinen ryhmä')
})

test('cannot add a job if date is missing', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Virheellinen päivämäärä')

})

test('cannot add a job if date is invalid', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: 'Kolmastoista viidettä 2023',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Päivä on virheellinen')

})

test('cannot add a job if location is missing', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: '',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Virheellinen sijainti')

})

test('cannot add a job if hours are missing', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Virheelliset työtunnit')

})

test('cannot add a job if hours are invalid', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: 'Viisi',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Tunnit on virheellinen')

})

test('cannot add a job if hours are too high', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '38',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Tunnit on virheellinen')

})


test('cannot add a job if minutes are missing', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: ''
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Virheelliset minuutit')

})

test('cannot add a job if minutes are invalid', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: 'viisitoista'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Minuutit on virheellinen')

})

test('cannot add a job if minutes are too high', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '68'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Minuutit on virheellinen')

})


test('cannot add a job if token is invalid', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', 'InvalidToken')
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain('Kirjaudu ensin sisään')

})

test('correct number of events in database', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(200)

    const jobs = await Job.findAll()
    expect(jobs.length).toBe(5)
})

test('validation does not accept too short squad name', async () =>{

    const newJob = {

        squad: 'O',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain(' Sallittu pituus kentälle Ryhmä on 2-40 merkkiä')
})

test('validation does not accept too long squad name', async () =>{

    const newJob = {

        squad: 'Tämänkentänpituusonylineljäkymmentämerkkiä',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain(' Sallittu pituus kentälle Ryhmä on 2-40 merkkiä')
})

test('validation does not accept too long context', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura.Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, niin harraste-, kilpa- kuin huipputasolla.',
        date: '2023-06-11',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain(' Sallittu pituus kentälle Konteksti on 200 merkkiä')
})

test('validation does not accept too long location', async () =>{

    const newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        location: 'Tämänkentänpituusonylineljäkymmentämerkkiä',
        hours: '3',
        minutes: '45'
    }

    const result = await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(401)
    expect(result.body.error).toContain(' Sallittu pituus kentälle Sijainti on 2-40 merkkiä')
})

test('hoursToDecimal returns correct value', async () => {
    const result = hoursToDecimal(3,0)
    expect(result).toBe(3)

    const result2 = hoursToDecimal(2, 30)
    expect(result2).toBe(2.5)

    const result3 = hoursToDecimal(0, 45)
    expect(result3).toBe(0.75)
})

test('basic user can not fetch unaccepted events', async () => {
    const response = await api
        .get('/api/job/unaccepted')
        .set('Cookie', finalToken)
        .expect(403)
    expect(response.body.error).toContain('Oikeudet puuttuu')
})

test('foreman can fetch unaccepted events', async () => {

    user = {username: 'Teemu35', password: 'salainen1234'}
    loggedUser = await api.post('/api/login').send(user)
    cookies = new Cookies(loggedUser.headers['set-cookie'])
    cryptedToken = cookies.cookies[0]

    finalToken = handleToken(cryptedToken)

    const response = await api
        .get('/api/job/unaccepted')
        .set('Cookie', finalToken)
        .expect(200)
    expect(response.body).toHaveLength(3)
})