describe('Login ', function() {
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
        cy.contains('virheellinen käyttäjänimi tai salasana')


    })
})