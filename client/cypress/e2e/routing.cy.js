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
            cy.request('POST', 'http://localhost:3001/api/register/', user)
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('User can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
            cy.contains('Tapahtumat')
        })

        it('User can go to add an event page', function() {
            cy.visit('http://localhost:3001/event')
            cy.url().should('include', 'event')
            cy.contains('Lisää tapahtuma')
        })

        it('User can go to add a job page', function() {
            cy.visit('http://localhost:3001/job')
            cy.url().should('include', 'job')
            cy.contains('Lisää työtunnit')
        })

        it('User gets redirected to home page if they try to go to login,password reset, request or register',
            function() {
                cy.visit('http://localhost:3001/')
                cy.contains('Tapahtumat')
                cy.visit('http://localhost:3001/resetpassword/123')
                cy.contains('Tapahtumat')
                cy.visit('http://localhost:3001/requestpassword')
                cy.contains('Tapahtumat')
                cy.visit('http://localhost:3001/register')
                cy.contains('Tapahtumat')
            })

        it('User gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.contains('Tapahtumat')
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

        it('User can go to home page', function() {
            cy.visit('http://localhost:3001/home')
            cy.url().should('include', 'home')
        })

        it('User gets redirected to home page if they try to go pages for other users', function() {
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

        it('User gets redirected to home page if they try to go somewhere that does not exist', function() {
            cy.visit('http://localhost:3001/olematonosoite')
            cy.url().should('include', '/home')
        })

    })

})

