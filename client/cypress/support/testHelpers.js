
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

Cypress.env('events', [
    {
        team: 'Miehet IB',
        opponent: 'Joukkue2',
        date: '2023-05-27',
        time: '20:30',
        location: 'Helsinki',
        description: 'Toimitsija'
    },
    {
        team: 'Miehet IB',
        opponent: 'Joukkue2',
        date: '2023-05-25',
        time: '20:30',
        location: 'Helsinki',
        description: 'Toimitsija'
    },
    {
        team: 'EBT Naiset',
        opponent: 'Honka naiset',
        date: '2023-05-27',
        time: '18:00',
        location: 'Hyvinkää',
        description: 'Lipunmyynti'
    },
    {
        team: 'EBT Naiset',
        opponent: 'Honka naiset',
        date: '2023-05-29',
        time: '20:00',
        location: 'Helsinki',
        description: 'Lipunmyynti'
    },
    {
        team: 'Pojat UI19 ',
        opponent: 'Honka U19',
        date: '2023-06-05',
        time: '20:30',
        location: 'Vantaa',
        description: 'Tuomarointi'
    },
    {
        team: 'Pojat UI19 ',
        opponent: 'Pojat U20',
        date: '2023-05-20',
        time: '19:00',
        location: 'Espoo',
        description: 'Toimitsija'
    }

])

Cypress.Commands.add('logUserIn', () => {

    cy.request('POST', 'http://localhost:3001/api/login', Cypress.env('loggedUserInfo'))
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

Cypress.Commands.add('checkErrorExist', (error) => {
    cy.contains('label', 'Vastustaja').click()
    cy.get('#add-event').should('be.disabled')
    cy.get(error)
        .should('be.visible')
})

Cypress.Commands.add('addTeams', () => {

    const teams = Cypress.env('teams')
    cy.request('POST', 'http://localhost:3001/api/team', teams[0])
    cy.request('POST', 'http://localhost:3001/api/team', teams[1])
    cy.request('POST', 'http://localhost:3001/api/team', teams[2])
})