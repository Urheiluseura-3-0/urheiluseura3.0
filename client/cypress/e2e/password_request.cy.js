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

        cy.request('GET', 'http://localhost:3001/api/login')
        cy.visit('http://localhost:3000')

        cy.get('#reset-password-link').click()
    })

    describe('Page view', function() {
        it('user can see reset form', function() {
            cy.url().should('include', '/requestpassword')
            cy.contains('Unohditko salasanasi?')

        })
    })

    describe('Password request with existing e-mail', function() {
        it('user sees a notification if sending e-mail address is successful', function() {
            cy.get('#email').type('tiina.testaaja@keskitty.com')
            cy.get('#send-request-button').click()

            cy.contains('Linkki salasanan vaihtoon lähetetty')
        })
    })

    describe('Password request with non-existing e-mail', function() {
        it('user sees a notification if e-mail address is invalid', function() {
            cy.get('#email').type('seppo@keskitty.com')
            cy.get('#send-request-button').click()

            cy.contains('Sähköpostiosoitetta ei löytynyt')
        })
    })
})