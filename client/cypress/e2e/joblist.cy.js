describe('Joblist', function() {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            firstName: 'Tiina',
            lastName: 'Testaaja',
            address: 'Testauskatu 10',
            postalCode: '00100',
            city: 'Helsinki',
            phoneNumber: '0401234567',
            email: 'tiina.testaaja@keskitty.com',
            username: 'Tiina14',
            password: 'salainen1234',
            passwordConfirm: 'salainen1234'

        }

        cy.request('POST', 'http://localhost:3000/api/register/', user)

        const loggedUserInfo =
        {
            username: 'Tiina14',
            password: 'salainen1234'
        }

        const loggedUser = cy.request('POST', 'http://localhost:3000/api/login', loggedUserInfo)



        const jobs = [
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-27',
                //time: '20:30',
                location: 'Helsinki',
                hours: 2,
                minutes: '0'
            },
            {
                squad: 'Tytöt-15',
                context: 'Harjoitukset',
                date: '2023-05-22',
                //time: '18:00',
                location: 'Espoo',
                hours: 1,
                minutes: 30
            },
            {
                squad: 'Aikuiset',
                context: 'Kevyt palloilu',
                date: '2023-06-07',
                //time: '17:00',
                location: 'Helsinki',
                hours: 3,
                minutes: 15
            },
            {
                squad: 'Lapset',
                context: 'Lasten koripallovalmennus',
                date: '2023-06-21',
                //time: '11:00',
                location: 'Espoon alakoulu',
                hours: 1,
                minutes: 15
            },
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-29',
                //time: '21:30',
                location: 'Helsinki',
                hours: 1,
                minutes: 45
            },
            {
                squad: 'Miehet',
                context: 'Miesten treenit',
                date: '2023-06-15',
                //time: '19:00',
                location: 'Helsinki',
                hours: 4,
                minutes: 30
            }

        ]

        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[0]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[1]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[2]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[3]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[4]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3000/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[5]
        })

        cy.visit('http://localhost:3000/jobs')

        cy.get('#timeline-button').click()
        cy.get('#datefrom').type('2023-05-19')
        cy.get('#dateto').type('2023-06-30')
        cy.get('#timeline-button').click()
    })

    it('User can see all jobs', function() {
        cy.contains('Työtunnit')
    })






})