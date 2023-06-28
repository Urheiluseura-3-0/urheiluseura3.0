import '../support/testHelpers'

describe('Event', function() {


    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = Cypress.env('user')

        cy.request('POST', 'http://localhost:3001/api/register/', user)
        const team = {
            name: 'Joukkue 1',
            category: 'm20'
        }
        cy.request('POST', 'http://localhost:3001/api/team', team)
        cy.logUserIn()
        cy.get('#addevent-link').click()
    })

    describe('Page view', function() {

        it('user can see event form', function() {
            cy.url().should('include','/event')
            cy.contains('Lisää tapahtuma')
        })

        it('user cannot send form if fields are empty',function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Team check', function() {
        beforeEach(function() {
            cy.setupEvent()
            cy.get('select[id="team"]').select('Valitse joukkue')
        })

        it('user cannot send form without inputing team', function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Opponent check', function() {
        beforeEach(function() {
            cy.setupEvent()
            cy.get('input[id="opponent"]').clear()

        })

        it('user cannot send form if opponent name is too short', function() {
            cy.get('input[id="opponent"]').type('A')
            cy.checkErrorExist('#opponent-error')
        })

        it ('opponent name will not be too long', function() {
            cy.get('input[id="opponent"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="opponent"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Location check', function() {
        beforeEach(function() {
            cy.setupEvent()
            cy.get('input[id="location"]').clear()
        })

        it('user cannot send form if location name is too short', function() {
            cy.get('input[id="location"]').type('E')
            cy.checkErrorExist('#location-error')
        })

        it ('location name will not be too long', function() {
            cy.get('input[id="location"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="location"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Date check', function() {
        beforeEach(function() {
            cy.setupEvent()
            cy.get('input[id="date"]').clear()
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
            cy.setupEvent()
            cy.get('input[id="time"]').clear()
        })

        it('user cannot send form without inputing time', function() {
            cy.get('#add-event').should('be.disabled')
        })
    })

    describe('Description check', function() {
        it('description will not be too long', function() {
            cy.get('input[id="description"]').type('Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. \
            EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura. \
            Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, \
            niin harraste-, kilpa- kuin huipputasolla.')
            cy.get('input[id="description"]').invoke('val').should('have.length', 200)
        })
    })

    describe('Add event', function() {
        it('user can add event with correct information', function() {
            cy.setupEvent()
            cy.get('#add-event').click()

            cy.contains('Tapahtuma lisätty')
        })
    })
})