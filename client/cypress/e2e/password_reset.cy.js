describe('Password reset', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
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
        cy.request('POST', 'http://localhost:3001/api/register/', user)
        const team = {
            name: 'Joukkue 1',
            category: 'm20'
        }
        cy.request('POST', 'http://localhost:3001/api/team', team)
        cy.request('GET', 'http://localhost:3001/api/login')
        cy.visit('http://localhost:3000')
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen1234')
        cy.get('#login-button').click() })


    describe('Page view', function() {
        it('user can see reset form', function() {
            cy.url().should('include', '/resetpassword')
            cy.contains('Vaihda salasana')

        })
        /* if send-button is disabled then check
            it('user cannot send form if fields are empty', function() {
            cy.get('# MUUTA').should('be.disabled')
        })*/
    })

    describe('Password reset with correct input', function() {
        it('user sees a notification/is directed to right place after succesful password reset ', function() {
            cy.get('input[id="password"').type('salainen12345')
            cy.get('input[id="passwordConfirmed"').type('salainen12345')
            cy.get('#send').click()
        })

        // Onnistuneen salasanan lähetyksen jälkeiset tapahtumat
    })

    describe('Password reset with incorrect input', function() {
        it('user sees a notification if password is too short', function() {
            cy.get('input[id= "password"]').type('sala')
        })

        it('user sees a notification if given passwords do not match', function() {
            cy.get('input[id= "password" ]').type('salainen12345')
            cy.get('input[id= " passwordConfimed"]').type('Salainen12345')
            cy.get('#send').click()
        })
    })


})