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


        cy.visit('http://localhost:3000/resetpassword/invaliditoken')
    })


    describe('Page view', function() {
        it('user can see reset form', function() {
            cy.url().should('include', '/resetpassword')
            cy.contains('Vaihda salasana') })

        it('user cannot send form if fields are empty', function() {
            cy.get('#send').should('be.disabled')
        })

    })

    describe('Password reset with correct input and token', function() {
        /* beforeEach(function() {
            cy.visit('http://localhost:3000/resetpassword:validToken')
        })*/

        it('user sees a notification/is directed to right place after succesful password reset', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('salainen12345')
            cy.get('#send').click()
            /* Onnistuneen salasanan lähetyksen jälkeiset tapahtumat
            cy.contains('Salasanan vaihto onnistui)
        })

        it('user can login in with the reset password', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('salainen12345')
            cy.get('#send').click()

            cy.get('#front-page-link').click()

            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen12345')
            cy.get('#login-button').click()

            cy.contains('Tapahtumat') */
        })
    })


    describe('Password reset with incorrect input or invalid token', function() {
        it('user sees a notification if password is too short', function() {
            cy.get('input[id="password"]').type('sala')
            cy.contains('Salasanan minimipituus on 10 merkkiä')
            cy.get('#send').should('be.disabled')
        })

        it('user sees a notification if given passwords do not match', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('Salainen12345')
            cy.contains('Salasanat eivät täsmää tai se on liian lyhyt')
            cy.get('#send').should('be.disabled')
        })

        it('user sees a notification if resetting with invalid token', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('salainen12345')
            cy.get('#send').click()

            cy.contains('Salasanan nollauspyyntöä ei löytynyt')
        })


    })

})

