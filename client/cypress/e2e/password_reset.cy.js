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

        cy.visit('http://localhost:3000')

        cy.get('#reset-password-link').click()

        cy.wait(100)
        //sähköpostin kautta tuleva linkki oikeasti
        cy.visit('http://localhost:3000/resetpassword')
    })

    describe('Page view', function() {
        it('user can see reset form', function() {
            cy.url().should('include', '/resetpassword')
            cy.contains('Vaihda salasana')

        })
    })
    /*
        /* if send-button is disabled then check
            it('user cannot send form if fields are empty', function() {
            cy.get('# MUUTA').should('be.disabled')
        }) */


    describe('Password reset with correct input', function() {
        it('user sees a notification/is directed to right place after succesful password reset', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('salainen12345')
            cy.get('#send').click()
            // Onnistuneen salasanan lähetyksen jälkeiset tapahtumat
        })

        it('user can login in with the reset password', function() {
            cy.visit('http://localhost:3000')
            cy.get('#username').type('Tiina14')
            cy.get('#password').type('salainen1234')
            cy.get('#login-button').click()

            // mitä näkyy kirjautuneelle
        })
    })


    describe('Password reset with incorrect input', function() {
        it('user sees a notification if password is too short', function() {
            cy.get('input[id= "password"]').type('sala')
            //notifikaatio tsekkaus
        })

        it('user sees a notification if given passwords do not match', function() {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('Salainen12345')
            cy.get('#send').click()
            //notifikaatio tsekkaus
        })
    })

})

