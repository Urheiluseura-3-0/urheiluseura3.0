describe('Login ', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            firstName: 'Tiina',
            lastName: 'Testaaja',
            username: 'Tiina14',
            password: 'salainen',

        }
        cy.request('POST', 'http://localhost:3001/api/register/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page contains right form', function() {
        cy.contains('Kirjaudu sisään')
    })

    it('user can login', function() {
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
    })
    it('non-existing user cannot login', function() {
        cy.get('#username').type('Tarja')
        cy.get('#password').type('tarjansalainen')
        cy.get('#login-button').click()


    })
})