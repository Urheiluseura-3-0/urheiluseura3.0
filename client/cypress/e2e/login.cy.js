import '../support/testHelpers'

describe('Login ', function() {
    beforeEach(function() {
        cy.createUserForTesting()
        cy.request('POST', 'http://localhost:3001/api/auth/logout')
        cy.visit('http://localhost:3001')
    })
    it('front page contains right form', function() {
        cy.contains('Kirjaudu sisään')
    })

    it('user can login', function() {
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen1234')
        cy.get('#login-button').click()
        cy.contains('Lisää tapahtuma')
    })

    it('user can logout', function() {
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen1234')
        cy.get('#login-button').click()
        cy.get('#logout-button').click()
        cy.contains('Kirjaudu sisään')
    })

    it('non-existing user cannot login', function() {
        cy.get('#username').type('Tarja')
        cy.get('#password').type('tarjansalainen')
        cy.get('#login-button').click()
        cy.contains('Virheellinen käyttäjänimi tai salasana')


    })
})