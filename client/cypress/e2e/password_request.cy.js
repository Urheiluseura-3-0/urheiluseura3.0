const { recurse } = require('cypress-recurse')

let userEmail

describe('Password request', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

        const firstUser = {
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
        cy.request('POST', 'http://localhost:3001/api/register/', firstUser)

        recurse(
            () => cy.task('createTestEmail'),
            Cypress._.isObject,
            {
                log: true,
                timeout: 20000,
                delay: 5000,
                error: 'Could not create test email'
            }
        ).then((testAccount) => {
            userEmail = testAccount.user
            const secondUser = {
                firstName: 'Reiska',
                lastName: 'Testaaja',
                address: 'Testauskatu 10',
                postalCode: '00100',
                city: 'Helsinki',
                phoneNumber: '0401234567',
                email: userEmail,
                username: 'Reiska70',
                password: 'salainensalasana',
                passwordConfirm: 'salainensalasana'
            }
            cy.request('POST', 'http://localhost:3001/api/register/', secondUser)
        })

        cy.request('GET', 'http://localhost:3001/api/login')
        cy.visit('http://localhost:3001')

        cy.get('#reset-password-link').click()
    })

    describe('Page view', function () {
        it('user can see reset form', function () {
            cy.url().should('include', '/requestpassword')
            cy.contains('Unohditko salasanasi?')

        })
    })

    describe('Password reset link request with an existing and functioning e-mail', function () {
        it('user sees a notification if reset link is successfully sent to given email address', function () {
            cy.get('#email').type(userEmail)
            cy.get('#send-request-button').click()

            cy.contains('Linkki salasanan vaihtoon lähetetty')
        })
    })

    describe('Password reset link request with an existing but not functioning e-mail', function () {
        it('user sees a notification if link cannot be sent ', function () {
            cy.get('#email').type('tiina.testaaja@keskitty.com')
            cy.get('#send-request-button').click()

            cy.contains('Linkin lähetys epäonnistui')
        })
    })

    describe('Password request with non-existing e-mail', function () {
        it('user sees a notification if e-mail address is not found', function () {
            cy.get('#email').type('seppo@keskitty.com')
            cy.get('#send-request-button').click()

            cy.contains('Sähköpostiosoitetta ei löytynyt')
        })

        it('user sees a notification if e-mail address is invalid', function () {
            cy.get('#email').type('seppokeskitty.com')
            cy.get('#send-request-button').click()

            cy.contains('Virheellinen sähköpostiosoite')
        })

    })
})