import '../support/testHelpers'


describe('Routing', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3001')
    })

    describe('Routing without logging in', function() {

        it('User can go to register page', function() {
            cy.visit('http://localhost:3001/register')
            cy.url().should('include', 'register')
            cy.contains('Rekisteröidy')
        })

        it('User can go to reset password request page', function() {
            cy.visit('http://localhost:3001/requestpassword')
            cy.url().should('include', 'requestpassword')
            cy.contains('Unohditko salasanasi')
        })

        it('User can go to reset password page', function() {
            cy.visit('http://localhost:3001/resetpassword/123')
            cy.url().should('include', 'resetpassword')
            cy.contains('Vaihda salasana')
        })

        it('User gets redirected to login page if they try to go to home, event or job', function() {
            cy.visit('http://localhost:3001/home')
            cy.contains('Käyttäjänimi')
            cy.visit('http://localhost:3001/event')
            cy.contains('Käyttäjänimi')
            cy.visit('http://localhost:3001/job')
            cy.contains('Käyttäjänimi')
        })

        it('User gets redirected to login page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.contains('Käyttäjänimi')
        })

    })

    describe('Routing when user is a worker', function() {
        beforeEach(function() {
            const user = Cypress.env('user')

            const role = {
                isForeman : 0,
                isSupervisor: 0,
                isWorker : 1,
                isCoach : 0
            }

            cy.request('POST', 'http://localhost:3001/api/register/', user)
                .then((response) => {
                    const id = response.body.id

                    cy.request('PUT', `http://localhost:3001/api/userrole/${id}`, role)
                })
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('Worker can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
        })

        it('Worker can go to allowed pages', function() {
            cy.visit('http://localhost:3001/event')
            cy.url().should('include', 'event')
            cy.visit('http://localhost:3001/events')
            cy.url().should('include', 'events')
        })

        it('Worker gets redirected to home page if they try to go pages for other users', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('exist')
            cy.get('#addjob-link').should('not.exist')
            cy.get('#logout-button').should('exist')

            cy.visit('http://localhost:3001/resetpassword/123')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/requestpassword')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/register')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/job')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/jobs')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/unconfirmed')
            cy.url().should('include', '/home')
        })

        it('Worker gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.url().should('include', '/home')
        })

    })

    describe('Routing when user is a coach', function() {
        beforeEach(function() {
            const user = Cypress.env('user')
            const role = {
                isForeman : 0,
                isSupervisor: 0,
                isWorker : 0,
                isCoach : 1
            }

            cy.request('POST', 'http://localhost:3001/api/register/', user)
                .then((response) => {
                    const id = response.body.id

                    cy.request('PUT', `http://localhost:3001/api/userrole/${id}`, role)
                })
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('Coach can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
        })

        it('Coach can go to allowed pages', function() {
            cy.visit('http://localhost:3001/job')
            cy.url().should('include', 'job')
            cy.visit('http://localhost:3001/jobs')
            cy.url().should('include', 'jobs')
        })

        it('Coach gets redirected to home page if they try to go pages for other users', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('not.exist')
            cy.get('#addjob-link').should('exist')
            cy.get('#logout-button').should('exist')

            cy.visit('http://localhost:3001/resetpassword/123')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/requestpassword')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/register')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/event')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/events')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/unconfirmed')
            cy.url().should('include', '/home')
        })

        it('Coach gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.url().should('include', '/home')
        })

    })

    describe('Routing when user is a worker and coach', function() {
        beforeEach(function() {
            const user = Cypress.env('user')
            cy.request('POST', 'http://localhost:3001/api/register/', user)
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('Workercoach can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
            cy.contains('Työtunnit')
        })

        it('Workercoach can go to add an event page', function() {
            cy.visit('http://localhost:3001/event')
            cy.url().should('include', 'event')
            cy.contains('Lisää tapahtuma')
        })

        it('Workercoach can go to add a job page', function() {
            cy.visit('http://localhost:3001/job')
            cy.url().should('include', 'job')
            cy.contains('Lisää työtunnit')
        })

        it('Workercoach gets redirected to home page if they try to go to login,password reset, request or register',
            function() {
                cy.visit('http://localhost:3001/')
                cy.url().should('include', '/home')
                cy.visit('http://localhost:3001/resetpassword/123')
                cy.url().should('include', '/home')
                cy.visit('http://localhost:3001/requestpassword')
                cy.url().should('include', '/home')
                cy.visit('http://localhost:3001/register')
                cy.url().should('include', '/home')
            })

        it('Workercoach gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.url().should('include', '/home')
        })

    })

    describe('Routing when user is a foreman', function() {
        beforeEach(function() {
            const user = Cypress.env('user')

            const role = {
                isForeman : 1,
                isSupervisor: 0,
                isWorker : 0,
                isCoach : 0
            }

            cy.request('POST', 'http://localhost:3001/api/register/', user)
                .then((response) => {
                    const id = response.body.id

                    cy.request('PUT', `http://localhost:3001/api/userrole/${id}`, role)
                })
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('Foreman can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
        })

        it('Foreman can go to unconfirmed page', function() {
            cy.visit('http://localhost:3001/unconfirmed')
            cy.url().should('include', 'unconfirmed')
        })

        it('Foreman gets redirected to home page if they try to go pages for other users', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('not.exist')
            cy.get('#addjob-link').should('not.exist')
            cy.get('#logout-button').should('exist')

            cy.visit('http://localhost:3001/resetpassword/123')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/requestpassword')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/register')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/event')
            cy.url().should('include', '/home')
            cy.visit('http://localhost:3001/job')
            cy.url().should('include', '/home')
        })

        it('Foreman gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.url().should('include', '/home')
        })

    })

})

