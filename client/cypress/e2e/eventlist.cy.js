describe('Eventlist', function(){

    beforeEach(function(){
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
        const teams = [
            {
                name: 'Miehet IB',
                category: 'edustus'
            },
            { name: 'EBT Naiset',
                category: 'edustus' },
            { name: 'Pojat UI19 ',
                category: 'u19' }
        ]

        cy.request('POST', 'http://localhost:3001/api/team', teams[0])
        cy.request('POST', 'http://localhost:3001/api/team', teams[1])
        cy.request('POST', 'http://localhost:3001/api/team', teams[2])

        const loggedUser =
        {
            username:'Tiina14',
            password: 'salainen1234'
        }

        cy.request('POST', 'http://localhost:3001/api/login', loggedUser)
        cy.request('GET', 'http://localhost:3001/api/login')

        const events = [
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
                team: 'EBT Naistet',
                opponent: 'Honka naiset',
                date: '2023-05-27',
                time: '18:00',
                location: 'Hyvinkää',
                description: 'Lipunmyynti'
            },
            {
                team: 'EBT Naistet',
                opponent: 'Honka naiset',
                date: '2023-05-29',
                time: '20:00',
                location: 'Helsinki',
                description: 'Lipunmyynti'
            },
            {
                team: 'Pojat U19',
                opponent: 'Honka U19',
                date: '2023-06-5',
                time: '20:30',
                location: 'Hyvinkää',
                description: 'Tuomarointi'
            },
            {
                team: ' Pojat U19',
                opponent: 'Pojat U20',
                date: '2023-05-20',
                time: '19:00',
                location: 'Espoo',
                description: 'Toimitsija'
            }
        ]
        cy.request('POST', 'http://localhost:3001/api/event', events[0])
        cy.request('POST', 'http://localhost:3001/api/event', events[1])
        cy.request('POST', 'http://localhost:3001/api/event', events[2])
        cy.request('POST', 'http://localhost:3001/api/event', events[3])
        cy.request('POST', 'http://localhost:3001/api/event', events[4])
        cy.request('POST', 'http://localhost:3001/api/event', events[5])

        cy.visit('http://localhost:3000')
    })

    it('User can see all events', function() {
        cy.contains('Tapahtumat')
    })

    it('User can sort events by ')
})