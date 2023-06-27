const supertest = require('supertest')
const { User } = require('../models')
const { Job } =  require('../models')
const app = require('../app')
const Cookies = require('universal-cookie')
const { hoursToDecimal } = require('../controllers/job')
const testhelper = require('../tests/test.helper')

const api = supertest(app)

const expectTruthyAddedJob = async (newJob, token) => {
    await api
        .post('/api/job')
        .set('Cookie', token)
        .send(newJob)
        .expect(200)
        
}
const expectFalsyAddedJob = async (newJob, token, message) => {
    const response = await api
        .post('/api/job')
        .set('Cookie', token)
        .send(newJob)

    
    expect(response.status).toBe(401)
    expect(response.body.error).toContain(message)   
}

let user
let loggedUser 
let cookies
let cryptedToken
let job

let finalToken
let newJob

beforeEach(async () => {

    const initialUsers = await testhelper.initializeInitialUsers()

    testhelper.destroyAllUsers() 

    await User.bulkCreate(initialUsers)

    const dateString = '2023-06-19T12:30:00.000Z'
    const timestamp = Date.parse(dateString)
    const dateTime = new Date(timestamp)
    user = await User.findOne({where: {username: 'Pekka35'}})
    const mikko = await User.findOne({where: {username: 'Mikko35'}})

    const initialJobs = [
        {
            createdById: user.id,
            squad: 'EBT Naiset',
            context: 'Psykologinen valmennus',
            dateTime: dateTime,
            location: 'Leppävaara',
            hours: 1.25
        },
        {
            createdById: user.id,
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
        }

    ]
    await Job.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    await Job.bulkCreate(initialJobs)

    job = await Job.findOne({where: {squad: 'EBT Naiset'}})

    user = {username: 'Pekka35', password: 'salainen1234'}
    loggedUser = await api.post('/api/auth/login').send(user)
    cookies = new Cookies(loggedUser.headers['set-cookie'])
    cryptedToken = cookies.cookies[0]

    finalToken = testhelper.handleToken(cryptedToken)

    newJob = {

        squad: 'EBT Tytöt',
        context: 'Lajivalmennus',
        date: '2023-06-11',
        time: '16:00',
        location: 'Leppävaara',
        hours: '3',
        minutes: '45'
    }

} )

test('job can be added with correct input', async () =>{

    await expectTruthyAddedJob(newJob, finalToken)
    
})

test('job can be added without context', async () =>{

    newJob = {...newJob, context:''}

    await expectTruthyAddedJob(newJob, finalToken)
})

test('cannot add a job if squad is missing', async () =>{

    newJob = {...newJob, squad:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheellinen ryhmä')
})

test('cannot add a job if date is missing', async () =>{

    newJob = {...newJob, date:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheellinen päivämäärä')

})

test('cannot add a job if date is invalid', async () =>{

    newJob = {...newJob, date:'Kolmastoista viidettä 2023'}

    await expectFalsyAddedJob(newJob, finalToken, 'Päivä on virheellinen')

})

test('cannot add a job if time is missing', async () =>{

    newJob = {...newJob, time:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheellinen aikaleima')

})

test('cannot add a job if time is invalid', async () =>{

    newJob = {...newJob, time:'Viisitoista kolmekymmentä'}

    await expectFalsyAddedJob(newJob, finalToken, 'Aika on virheellinen')

})

test('cannot add a job if location is missing', async () =>{

    newJob = {...newJob, location:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheellinen sijainti')
})

test('cannot add a job if hours are missing', async () =>{

    newJob = {...newJob, hours:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheelliset työtunnit')

})

test('cannot add a job if hours are invalid', async () =>{

    newJob = {...newJob, hours:'viisi'}

    await expectFalsyAddedJob(newJob, finalToken, 'Tunnit on virheellinen')

})

test('cannot add a job if hours are too high', async () =>{

    newJob = {...newJob, hours:'38'}

    await expectFalsyAddedJob(newJob, finalToken, 'Tunnit on virheellinen')

})

test('cannot add a job if minutes are missing', async () =>{

    newJob = {...newJob, minutes:''}

    await expectFalsyAddedJob(newJob, finalToken, 'Virheelliset minuutit')

})

test('cannot add a job if minutes are invalid', async () =>{

    newJob = {...newJob, minutes:'viisitoista'}

    await expectFalsyAddedJob(newJob, finalToken, 'Minuutit on virheellinen')

})

test('cannot add a job if minutes are too high', async () =>{

    newJob = {...newJob, minutes:'68'}

    await expectFalsyAddedJob(newJob, finalToken, 'Minuutit on virheellinen')

})

test('cannot add a job if token is invalid', async () =>{

    await expectFalsyAddedJob(newJob, 'invalidToken', 'Kirjaudu ensin sisään')

})

test('correct number of events in database', async () =>{

    await api
        .post('/api/job')
        .set('Cookie', finalToken)
        .send(newJob)
        .expect(200)

    const jobs = await Job.findAll()
    expect(jobs.length).toBe(4)
})

test('validation does not accept too short squad name', async () =>{

    newJob = {...newJob, squad:'O'}

    await expectFalsyAddedJob(newJob, finalToken,' Sallittu pituus kentälle Ryhmä on 2-40 merkkiä')

})

test('validation does not accept too long squad name', async () =>{

    newJob = {...newJob, squad:'Tämänkentänpituusonylineljäkymmentämerkkiä'}
    await expectFalsyAddedJob(newJob, finalToken,' Sallittu pituus kentälle Ryhmä on 2-40 merkkiä')

})

test('validation does not accept too long context', async () =>{
    newJob = {...newJob, context:
        'Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. \
        EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura. \
        Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, niin harraste-, kilpa- kuin huipputasolla.'
    }

    await expectFalsyAddedJob(newJob, finalToken,' Sallittu pituus kentälle Konteksti on 200 merkkiä')

})

test('validation does not accept too long location', async () =>{

    newJob = {...newJob, location:'Tämänkentänpituusonylineljäkymmentämerkkiä'}

    await expectFalsyAddedJob(newJob, finalToken, ' Sallittu pituus kentälle Sijainti on 2-40 merkkiä')

})

test('hoursToDecimal returns correct value', async () => {
    const result = hoursToDecimal(3,0)
    expect(result).toBe(3)

    const result2 = hoursToDecimal(2, 30)
    expect(result2).toBe(2.5)

    const result3 = hoursToDecimal(0, 45)
    expect(result3).toBe(0.75)
})

test('jobs for user return squads', async () => {
    const response = await api
        .get('/api/job')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.squad)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('EBT Naiset')
    expect(contents).toContain('EBT PojatU19')
})


test('jobs for user return context', async () => {
    const response = await api
        .get('/api/job')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.context)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('Psykologinen valmennus')
})

test('jobs for user return location', async () => {
    const response = await api
        .get('/api/job')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.location)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain('Leppävaara')
})

test('jobs for user return hours', async () => {
    const response = await api
        .get('/api/job')
        .set('Cookie', finalToken)
    const contents = response.body.map(r => r.hours)
    expect(response.body).toHaveLength(2)
    expect(contents).toContain(1.25)
    expect(contents).toContain(2.25)
})

test('Get by job id returns correct job', async () => {
    const response = await api
        .get(`/api/job/${job.id}`)
        .set('Cookie', finalToken)
    expect(response.body.squad).toContain('EBT Naiset')
})

test('Get by job returns error code if id is invalid', async () => {
    const invalidId = 'ThisIdIsNotRight'
    await api
        .get(`/api/job/${invalidId}`)
        .set('Cookie', finalToken)
        .expect(400)
})

test('Get by job returns error code if token is invalid', async () => {
    const invalidId = 'ThisIdIsNotRight'
    await api
        .get(`/api/job/${invalidId}`)
        .set('Cookie', 'invalidtoken')
        .expect(401)
})

test('Get by job returns error code if token is missing', async () => {
    const invalidId = 'ThisIdIsNotRight'
    await api
        .get(`/api/job/${invalidId}`)
        .set('Cookie', '')
        .expect(401)
})

test('Get by job id returns teamname', async() => {
    const response = await api
        .get(`/api/job/${job.id}`)
        .set('Cookie', finalToken)
    expect(response.body.squad).toContain('EBT Naiset')
})