describe('Menu', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3001')
    })

    describe('Menu without logging in', function() {

        it('Navigation bar contains correct buttons', function() {
            cy.get('#navigationbar')
                .should('contain', 'Kirjaudu sisään')
                .should('contain', 'Rekisteröidy')
        })

        it('Register button routes to register page', function() {
            cy.get('#register-link').click()
            cy.contains('Etunimi')
            cy.contains('Sukunimi')
            cy.url().should('include', 'register')
        })

        it('Login button routes to login page', function() {
            cy.get('#register-link').click()
            cy.get('#login-link').click()
            cy.contains('Käyttäjänimi')
            cy.contains('Salasana')
            cy.url().should('include', '/')
        })
    })

    describe('Menu when user is logged in as a worker', function() {

        beforeEach(function() {
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
            cy.wait(500)
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()
        })

        it('Worker sees the correct frontpage', function() {
            cy.contains('Tapahtumat')
        })

        it('Navigation bar contains correct buttons', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('exist')
            cy.get('#user-events-link').should('exist')
            cy.get('#addjob-link').should('not.exist')
            cy.get('#user-jobs-link').should('not.exist')
            cy.get('#unconfirmed-jobs-link').should('not.exist')
            cy.get('#logout-button').should('exist')
        })

        it('Add event button routes to a page with event form', function() {
            cy.get('#addevent-link').click()
            cy.contains('Joukkue')
            cy.contains('Vastustaja')
            cy.contains('Lisätietoja')
            cy.url().should('include', '/event')
        })

        it('Frontpage button routes back to frontpage', function() {
            cy.get('#addevent-link').click()
            cy.get('#frontpage-link').click()
            cy.contains('Tapahtumat')
            cy.contains('Odottaa hyväksyntää')
            cy.contains('Hyväksytyt Tapahtumat')
            cy.url().should('include', '/home')
        })

        it('Logout button logs out the user', function() {
            cy.get('#logout-button').click()
            cy.contains('Käyttäjänimi')
            cy.contains('Salasana')
            cy.url().should('include', '/')
        })

    })

    describe('Menu when user is logged in as a foreman', function() {

        beforeEach(function() {
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
        it('Foreman sees the correct frontpage', function() {
            cy.contains('Hyväksymättömät työtunnit')
        })
        it('Navigation bar contains correct buttons', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('not.exist')
            cy.get('#user-events-link').should('not.exist')
            cy.get('#addjob-link').should('not.exist')
            cy.get('#user-jobs-link').should('not.exist')
            cy.get('#unconfirmed-jobs-link').should('exist')
            cy.get('#logout-button').should('exist')
        })

        it('Logout button logs out the user', function() {
            cy.get('#logout-button').click()
            cy.contains('Käyttäjänimi')
            cy.contains('Salasana')
            cy.url().should('include', '/')
        })

    })

    describe('Menu when user is logged in as a coach', function() {

        beforeEach(function() {
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

        it('Coach sees the correct frontpage', function() {
            cy.contains('Työtunnit')
        })
        it('Navigation bar contains correct buttons', function() {
            cy.get('#navigationbar').should('exist')
            cy.get('#frontpage-link').should('exist')
            cy.get('#addevent-link').should('not.exist')
            cy.get('#user-events-link').should('not.exist')
            cy.get('#addjob-link').should('exist')
            cy.get('#user-jobs-link').should('exist')
            cy.get('#unconfirmed-jobs-link').should('not.exist')
            cy.get('#logout-button').should('exist')
        })
        it('Logout button logs out the user', function() {
            cy.get('#logout-button').click()
            cy.contains('Käyttäjänimi')
            cy.contains('Salasana')
            cy.url().should('include', '/')
        })

    })


})