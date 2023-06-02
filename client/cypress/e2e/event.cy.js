describe('Event', function() {
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
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen1234')
        cy.get('#login-button').click()
    })
    describe('Page view', function() {
        it('user can see event form', function() {
            cy.url().should('include','/home')
            cy.contains('Lisää tapahtuma')
        })
    })
})