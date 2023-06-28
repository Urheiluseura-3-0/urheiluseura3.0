describe('Job', function () {
    beforeEach(function () {
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
        cy.request('POST', 'http://localhost:3001/api/auth/logout')
        cy.visit('http://localhost:3001')
        cy.get('#username').type('Tiina14')
        cy.get('#password').type('salainen1234')
        cy.get('#login-button').click()
        cy.wait(200)
        cy.visit('http://localhost:3001/job')
    })

    describe('Page view', function () {

        it('user can see job form', function () {
            cy.url().should('include', 'job')
            cy.contains('Lisää työtunnit')
        })

        it('user cannot send form if fields are empty', function () {
            cy.get('#add-job').should('be.disabled')
        })
    })

    describe('Squad check', function () {
        beforeEach(function () {
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="start-time"]').type('11:00')
            cy.get('input[id="context"]').type('Valmennusta')
            cy.get('input[id="hours"]').type('1')
        })

        it('user cannot send form if squad name is too short', function () {
            cy.get('input[id="squad"]').type('A')
            cy.get('input[id="location"]')
            cy.get('#add-job').should('be.disabled')
        })

        it('squad name will not be too long', function () {
            cy.get('input[id="squad"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="squad"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Location check', function () {
        beforeEach(function () {
            cy.get('input[id="squad"]').type('honka')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="start-time"]').type('11:00')
            cy.get('input[id="context"]').type('Valmennusta')
            cy.get('input[id="hours"]').type('1')
        })

        it('user cannot send form if location name is too short', function () {
            cy.get('input[id="location"]').type('E')
            cy.get('Body').click({ x: 266, y: 32 })
            cy.get('#add-job').should('be.disabled')
        })

        it('location name will not be too long', function () {
            cy.get('input[id="location"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[id="location"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Date check', function () {
        beforeEach(function () {
            cy.get('input[id="squad"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="start-time"]').type('11:00')
            cy.get('input[id="context"]').type('Valmennus')
            cy.get('input[id="hours"]').type('1')
        })

        it('user cannot send form without inputing date', function () {
            cy.get('#add-job').should('be.disabled')
        })

        it('user cannot send form if year format isnt 20xx', function () {
            cy.get('input[id="date"]').type('2123-06-01')
            cy.get('#add-job').should('be.disabled')
        })
    })

    describe('Time check', function () {
        beforeEach(function () {
            cy.get('input[id="squad"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="context"]').type('Valmennus')
            cy.get('input[id="hours"]').type('1')
        })

        it('user cannot send form without inputting time', function () {
            cy.get('#add-job').should('be.disabled')
        })
    })

    describe('Context check', function () {

        it('Context will not be too long', function () {
            cy.get('input[id="context"]').type('Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. \
            EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura. \
            Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, \
            niin harraste-, kilpa- kuin huipputasolla.')
            cy.get('input[id="context"]').invoke('val').should('have.length', 200)
        })
    })

    describe('Worked time check', function () {
        beforeEach(function () {
            cy.get('input[id="squad"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="start-time"]').type('11:00')
            cy.get('input[id="context"]').type('Valmennus')
        })

        it('User cannot send without inputting hours or minutes', function(){
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input over 24 hours', function(){
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="hours"]').type('25')
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input negative hours', function(){
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="hours"]').type('-1')
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input text as hours', function(){
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="hours"]').type('yksi')
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input over 59 minutes', function(){
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('60')
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input negative minutes', function(){
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('-1')
            cy.get('#add-job').should('be.disabled')
        })

        it('User cannot input text as minutes', function(){
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('one')
            cy.get('#add-job').should('be.disabled')
        })

        it('User can add exactly 24 hours', function(){
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('24')
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="hours"]').type('24')
            cy.get('#add-job').should('be.disabled')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('0')
            cy.get('#add-job').should('be.enabled')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('24')
            cy.get('#add-job').should('be.disabled')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('0')
            cy.get('#add-job').should('be.enabled')
        })
    })

    describe('Add job', function() {

        it('user can add a job with correct information', function() {
            cy.get('input[id="squad"]').type('honka')
            cy.get('input[id="location"]').type('espoon halli')
            cy.get('input[id="date"]').type('2023-06-01')
            cy.get('input[id="start-time"]').type('11:00')
            cy.get('input[id="context"]').type('Valmennus')
            cy.get('input[id="hours"]').type('8')
            cy.get('input[id="minutes"]').type('30')

            cy.get('#add-job').click()

            cy.contains('Työtunnit lähetetty')
        })
    })
})