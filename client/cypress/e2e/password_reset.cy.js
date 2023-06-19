const { recurse } = require('cypress-recurse')

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

    let userEmail
    let userPass

    describe('Password reset with correct input and token', function() {

        beforeEach(() => {
            cy.request('POST', 'http://localhost:3001/api/testing/reset')
            recurse(
                () => cy.task('createTestEmail'),
                Cypress._.isObject, // keep retrying until the task returns an object
                {
                    log: true,
                    timeout: 20000, // retry up to 20 seconds
                    delay: 5000, // wait 5 seconds between attempts
                    error: 'Could not create test email'
                }
            ).then((testAccount) => {
                userEmail = testAccount.user
                userPass = testAccount.pass
                cy.log(`Email account created - (for debugging purposes): ${userEmail}, ${typeof userEmail} `)
                cy.log(`Email account password - (for debugging purposes): ${userPass}, ${typeof userPass} `)
                const user = {
                    firstName: 'Reiska',
                    lastName: 'Testaaja',
                    address: 'Testauskatu 10',
                    postalCode: '00100',
                    city: 'Helsinki',
                    phoneNumber: '0401234567',
                    email: userEmail,
                    username: 'Reiska70',
                    password: userPass,
                    passwordConfirm: userPass
                }
                cy.request('POST', 'http://localhost:3001/api/register/', user)
                cy.visit('http://localhost:3000/requestpassword')
                cy.get('#email').type(userEmail)
                cy.get('#send-request-button').click()
            })

        })

        it('get message', function() {
            cy.log('get message userEmail', userEmail)
            cy.log('get message userPass', userPass)
            recurse(
                () => cy.task('getLastEmail', { user: userEmail, pass: userPass }), // Cypress commands to retry
                Cypress._.isObject, // keep retrying until the task returns an object
                {
                    log: true,
                    timeout: 90000, // retry up to 90 seconds
                    delay: 10000, // wait 10 seconds between attempts
                    error: 'Messages Not Found'
                }
            ).then((message) => {
                cy.log('message', { message })
                    .its('html')
                    .then((html) => {
                        cy.document().then(document => {
                            document.body.innerHTML = html
                        })
                    })
                //link button name needs to be checked!
                cy.get('#a.link-button').click()
                cy.wait(1000)
                cy.get('#password').type('reiska12345')
                cy.get('#passwordConfirmed').type('reiska12345')
                cy.contains('Salasanan vaihto onnistui')
                cy.get('#send').click()
            })
        })
        /* Onnistuneen salasanan lähetyksen jälkeiset tapahtumat
            cy.contains('Salasanan vaihto onnistui)
        })
        /*
            cy.visit('http://localhost:3000/resetpassword:validToken')
        })

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

            cy.contains('Tapahtumat')
        })*/
    })


    describe('Password reset with incorrect input or invalid token', function() {
        beforeEach (() => {
            cy.visit('http://localhost:3000/resetpassword/invaliditoken')}
        )
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

