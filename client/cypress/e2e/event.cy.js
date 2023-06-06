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
        const team = {
            name: 'Joukkue 1',
            category: 'm20'
        }
        cy.request('POST', 'http://localhost:3001/api/team', team)
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

        it('user cannot send form if fields are empty',function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Team check', function() {
        beforeEach(function() {
            cy.get('input[id="opponent"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="time"]').type('11:00')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user cannot send form without inputing team', function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Opponent check', function() {
        beforeEach(function() {
            cy.get('select[id="team"]').select('Joukkue 1')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="time"]').type('11:00')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user cannot send form if opponent name is too short', function() {
            cy.get('input[id="opponent"]').type('A')
            cy.get('Body').click({ x:266, y:32 })
            cy.get('#add-event').should('be.disabled')
        })

        it ('opponent name will not be too long', function() {
            cy.get('input[id="opponent"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="opponent"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Location check', function() {
        beforeEach(function() {
            cy.get('select[id="team"]').select('Joukkue 1')
            cy.get('input[id="opponent"]').type('honka')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="time"]').type('11:00')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user cannot send form if location name is too short', function() {
            cy.get('input[id="location"]').type('E')
            cy.get('Body').click({ x:266, y:32 })
            cy.get('#add-event').should('be.disabled')
        })

        it ('location name will not be too long', function() {
            cy.get('input[id="location"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="location"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Date check', function() {
        beforeEach(function() {
            cy.get('select[id="team"]').select('Joukkue 1')
            cy.get('input[id="opponent"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="time"]').type('11:00')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user cannot send form without inputing date', function() {
            cy.get('#add-event').should('be.disabled')
        })

        it('user cannot send form if year format isnt 20xx', function() {
            cy.get('input[id="date"]').type('2123-06-01')
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Time check', function() {
        beforeEach(function() {
            cy.get('select[id="team"]').select('Joukkue 1')
            cy.get('input[id="opponent"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user cannot send form without inputing time', function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Description check', function() {
        it('description will not be too long', function() {
            cy.get('input[id="description"]').type('Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura.Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, niin harraste-, kilpa- kuin huipputasolla.')
            cy.get('input[id="description"]').invoke('val').should('have.length', 200)
        })
    })

    describe('Reset check', function() {
        beforeEach(function() {
            cy.get('select[id="team"]').select('Joukkue 1')
            cy.get('input[id="opponent"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="time"]').type('11:00')
            cy.get('input[id="description"]').type('tuomarointi')
        })

        it('user can reset fields with the reset button', function() {
            cy.get('#reset').click()
            cy.get('select[id="team"]').should('have.value', '0')
            cy.get('input[id="opponent"]').should('be.empty')
            cy.get('input[id="location"]').should('be.empty')
            cy.get('input[id="date"]').should('be.empty')
            cy.get('input[id="time"]').should('be.empty')
            cy.get('input[id="description"]').should('be.empty')
        })
    })
})