
Cypress.env('user', {
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

})


Cypress.env('loggedUserInfo', {
    username: 'Tiina14',
    password: 'salainen1234'
})


Cypress.env('teams', [
    {
        name: 'Miehet IB',
        category: 'edustus'
    },
    {
        name: 'EBT Naiset',
        category: 'edustus'
    },

    {
        name: 'Pojat UI19 ',
        category: 'u19'
    }
])


Cypress.Commands.add('logUserIn', () => {

    cy.request('POST', 'http://localhost:3001/api/auth/login', Cypress.env('loggedUserInfo'))
    cy.visit('http://localhost:3001')
}
)

Cypress.Commands.add('setupEvent', () => {
    cy.get('select[id="team"]').select('Joukkue 1')
    cy.get('input[id="opponent"]').type('Honka')
    cy.get('input[id="location"]').type('espoon halli')
    cy.get('input[id="date"]').type('2023-06-01')
    cy.get('input[id="time"]').type('11:00')
    cy.get('input[id="description"]').type('tuomarointi')
})

Cypress.Commands.add('setupJob', () => {
    cy.get('input[id="squad"]').type('honka')
    cy.get('input[id="location"]').type('espoon halli')
    cy.get('input[id="date"]').type('2023-06-01')
    cy.get('input[id="start-time"]').type('11:00')
    cy.get('input[id="context"]').type('Valmennus')
    cy.get('input[id="hours"]').clear()
    cy.get('input[id="minutes"]').clear()
    cy.get('input[id="hours"]').type('8')
    cy.get('input[id="minutes"]').type('30')
})

Cypress.Commands.add('setUpRegisterValuesStep1', () => {

    cy.get('input[name="firstname"]').type('Olli')
    cy.get('input[name="lastname"]').type('Korhonen')
    cy.get('input[name="address"]').type('Kotkakuja 5')
    cy.get('input[name="postalCode"]').type('02670')
    cy.get('input[name="city"]').type('Akaa')

})

Cypress.Commands.add('setUpRegisterValuesStep2', () => {

    cy.get('input[name="phoneNumber"]').type('0450985677')
    cy.get('input[name="email"]').type('esimerkki@jippii.fi')

})

Cypress.Commands.add('setUpRegisterValuesStep3', () => {

    cy.get('input[name="username"]').type('OlliKor')
    cy.get('input[name="password"]').type('salainen123')
    cy.get('input[name="passwordConfirm"]').type('salainen123')

})



Cypress.Commands.add('checkErrorExist', (error) => {
    cy.get('label').first().click()
    cy.get(error)
        .should('be.visible')
})

Cypress.Commands.add('checkButtonIsDisabled', (button) => {
    cy.get(button).should('be.disabled')
})
Cypress.Commands.add('addTeams', () => {

    const teams = Cypress.env('teams')
    cy.request('POST', 'http://localhost:3001/api/team', teams[0])
    cy.request('POST', 'http://localhost:3001/api/team', teams[1])
    cy.request('POST', 'http://localhost:3001/api/team', teams[2])
})

Cypress.Commands.add('createUserForTesting', () => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = Cypress.env('user')
    cy.request('POST', 'http://localhost:3001/api/register/', user)

})

Cypress.Commands.add('tableColumnHasValues', (tablename, rownumber, firstvalue, lastvalue) => {
    cy.get(tablename).find('tbody').find('tr').first().find('td').eq(rownumber).should('have.text', firstvalue)
    cy.get(tablename).find('tbody').find('tr').last().find('td').eq(rownumber).should('have.text', lastvalue)
})

Cypress.Commands.add('checkCorrectLength', (field, length) => {
    cy.get(field).invoke('val').should('have.length', length)
})