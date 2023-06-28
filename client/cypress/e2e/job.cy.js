import '../support/testHelpers'

describe('Job', function () {
    beforeEach(function () {
        cy.createUserForTesting()
        cy.logUserIn()
        cy.visit('http://localhost:3001/job')
    })

    describe('Page view', function () {

        it('user can see job form', function () {
            cy.url().should('include', 'job')
            cy.contains('Lisää työtunnit')
        })

        it('user cannot send form if fields are empty', function () {
            cy.checkButtonIsDisabled('#add-job')
        })
    })

    describe('Squad check', function () {
        beforeEach(function () {
            cy.setupJob()
            cy.get('input[id="squad"]').clear()
        })

        it('user cannot send form if squad name is too short', function () {
            cy.get('input[id="squad"]').type('A')
            cy.get('input[id="location"]')
            cy.checkErrorExist('#squad-error')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('squad name will not be too long', function () {
            cy.get('input[id="squad"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[id="squad"]', 40)
        })
    })

    describe('Location check', function () {
        beforeEach(function () {
            cy.setupJob()
            cy.get('input[id="location"]').clear()
        })

        it('user cannot send form if location name is too short', function () {
            cy.get('input[id="location"]').type('E')
            cy.checkErrorExist('#location-error')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('location name will not be too long', function () {
            cy.get('input[id="location"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[id="location"]', 40)
        })
    })

    describe('Date check', function () {
        beforeEach(function () {
            cy.setupJob()
            cy.get('input[id="date"]').clear()
        })

        it('user cannot send form without inputing date', function () {
            cy.checkButtonIsDisabled('#add-job')
        })

        it('user cannot send form if year format isnt 20xx', function () {
            cy.get('input[id="date"]').type('2123-06-01')
            cy.checkErrorExist('#date-error')
            cy.checkButtonIsDisabled('#add-job')
        })
    })

    describe('Time check', function () {
        beforeEach(function () {
            cy.setupJob()
            cy.get('input[id="start-time"]').clear()
        })

        it('user cannot send form without inputting time', function () {
            cy.checkButtonIsDisabled('#add-job')
        })
    })

    describe('Context check', function () {

        it('Context will not be too long', function () {
            cy.get('input[id="context"]').type('Espoo Basket Team (EBT) on Suomen Koripalloliiton jäsenseura. \
            EBT on Espoon Akilleksen ja EPS-Basketin fuusiona vuonna 1993 perustettu koripallon erikoisseura. \
            Seura järjestää lasten, nuorten ja aikuisten koripallotoimintaa, \
            niin harraste-, kilpa- kuin huipputasolla.')
            cy.checkCorrectLength('input[id="context"]', 200)
        })
    })

    describe('Work time check', function () {
        beforeEach(function () {
            cy.setupJob()
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="minutes"]').clear()
        })

        it('User cannot send without inputting hours or minutes', function(){
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input over 24 hours', function(){
            cy.get('input[id="hours"]').type('25')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input negative hours', function(){

            cy.get('input[id="hours"]').type('-1')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input text as hours', function(){

            cy.get('input[id="hours"]').type('yksi')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input over 59 minutes', function(){
            cy.get('input[id="minutes"]').type('60')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input negative minutes', function(){

            cy.get('input[id="minutes"]').type('-1')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User cannot input text as minutes', function(){
            cy.get('input[id="minutes"]').type('one')
            cy.checkButtonIsDisabled('#add-job')
        })

        it('User can add exactly 24 hours', function(){
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('24')
            cy.get('input[id="hours"]').clear()
            cy.get('input[id="hours"]').type('24')
            cy.checkButtonIsDisabled('#add-job')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('0')
            cy.get('#add-job').should('be.enabled')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('24')
            cy.checkButtonIsDisabled('#add-job')
            cy.get('input[id="minutes"]').clear()
            cy.get('input[id="minutes"]').type('0')
            cy.get('#add-job').should('be.enabled')
        })
    })

    describe('Add job', function() {

        it('user can add a job with correct information', function() {
            cy.setupJob()
            cy.get('#add-job').click()
            cy.contains('Työtunnit lähetetty')
        })
    })
})