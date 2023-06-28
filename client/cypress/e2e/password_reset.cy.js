const { recurse } = require('cypress-recurse')

describe('Password reset', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')

    })

    let userEmail
    let userPass

    describe('Password reset with correct input and token', function () {
        beforeEach(() => {
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
                userPass = testAccount.pass
                const user = {
                    firstName: 'Reiska',
                    lastName: 'Testaaja',
                    address: 'Testauskatu 10',
                    postalCode: '00100',
                    city: 'Helsinki',
                    phoneNumber: '0401234567',
                    email: userEmail,
                    username: 'Reiska70',
                    password: 'lolleropollero',
                    passwordConfirm: 'lolleropollero'
                }
                cy.request('POST', 'http://localhost:3001/api/register/', user)
                cy.request('POST', 'http://localhost:3001/api/auth/logout')
                cy.visit('http://localhost:3001/requestpassword')
                cy.get('#email').type(userEmail)
                cy.get('#send-request-button').click()
                cy.wait(5000)
                recurse(
                    () => cy.task('getLastEmail', { user: userEmail, pass: userPass }),
                    Cypress._.isObject,
                    {
                        log: true,
                        timeout: 90000,
                        delay: 10000,
                        error: 'Messages Not Found'
                    }
                ).then((message) => {
                    cy.task('parseEmail', { message })
                        .its('html')
                        .then((html) => {
                            cy.document().then(document => {
                                document.body.innerHTML = html
                            })
                        })
                    cy.wait(1000)
                    cy.get('a').click()
                    cy.wait(1000)
                })

            })
        })

        it('Link takes to the reset password page', function () {
            cy.contains('Vaihda salasana')
        })

        it('user is able to reset the password and is able to login', function () {
            cy.get('#password').type('reiska12345')
            cy.get('#passwordConfirmed').type('reiska12345')
            cy.get('#send').click()
            cy.contains('Salasanan vaihto onnistui')
            cy.get('#front-page-link').click()

            cy.get('#username').type('Reiska70')
            cy.get('#password').type('reiska12345')
            cy.get('#login-button').click()

            cy.contains('Työtunnit')
        })

    })


    describe('Password reset with incorrect input or invalid token', function () {
        beforeEach(() => {
            cy.visit('http://localhost:3001/resetpassword/invaliditoken')
        }
        )
        it('user sees a notification if password is too short', function () {
            cy.get('input[id="password"]').type('sala')
            cy.contains('Salasanan minimipituus on 10 merkkiä')
            cy.get('#send').should('be.disabled')
        })

        it('user sees a notification if given passwords do not match', function () {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('Salainen12345')
            cy.contains('Salasanat eivät täsmää tai se on liian lyhyt')
            cy.get('#send').should('be.disabled')
        })

        it('user sees a notification if resetting with invalid token', function () {
            cy.get('input[id="password"]').type('salainen12345')
            cy.get('input[id="passwordConfirmed"]').type('salainen12345')
            cy.get('#send').click()

            cy.contains('Salasanan nollauspyyntöä ei löytynyt')
        })


    })

})

