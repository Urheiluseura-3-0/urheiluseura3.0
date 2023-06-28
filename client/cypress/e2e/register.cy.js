import '../support/testHelpers'

describe('Register', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3001')
        cy.get('#register-link').click()
    }
    )

    describe('Register view', function() {
        it('register view is open', function(){
            cy.url().should('include','/register')
            cy.contains('Rekisteröidy')
        })

        it('user cannot click next if fields are empty',function(){
            cy.get('#next-button').should('be.disabled')
        })
    })


    describe('First name check', function() {

        beforeEach(() => {

            cy.setUpRegisterValuesStep1()
            cy.get('input[name="firstname"]').clear()
        })

        it ('user cannot click next if first name is too short', function() {
            cy.get('input[name="firstname"]').type('O')
            cy.contains('label', 'Etunimi').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#firstname-error')
        })


        it ('user first name will not be too long', function() {
            cy.get('input[name="firstname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[name="firstname"]', 40)
        })
    })

    describe('Last name check', function() {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
            cy.get('input[name="lastname"]').clear()
        })

        it ('user cannot click next if last name is too short', function() {

            cy.get('input[name="lastname"]').type('O')
            cy.contains('label', 'Sukunimi').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#lastname-error')
        })


        it ('user last name will not be too long', function() {

            cy.get('input[name="lastname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[name="lastname"]', 40)
        })

    })



    describe('Address check', function() {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
            cy.get('input[name="address"]').clear()
        })

        it ('user cannot click next if address is too short', function() {

            cy.get('input[name="address"]').type('O')
            cy.contains('label', 'Osoite').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#address-error')

        })

        it ('user address will not be too long', function() {

            cy.get('input[name="address"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[name="address"]', 40)
        })

    })

    describe('Postal code check', function() {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
            cy.get('input[name="postalCode"]').clear()
        })

        it ('user cannot click next if postal code is too short', function(){

            cy.get('input[name="postalCode"]').type('12')
            cy.contains('label', 'Postinumero').click()
            cy.checkErrorExist('#postalCode-error')
            cy.get('#next-button').should('be.disabled')
        })

        it ('postal code will not be too long', function(){

            cy.get('input[name="postalCode"]').type('098740')
            cy.checkCorrectLength('input[name="postalCode"]', 5)
        })

        it ('postal code only contains numbers', function(){

            cy.get('input[name="postalCode"]').type('ABCDE')
            cy.contains('label', 'Postinumero').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#postalCode-error')

        })
    })

    describe('City check', function() {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
            cy.get('input[name="city"]').clear()
        })
        it ('name of the city must contain at least two characters', function(){

            cy.get('input[name="city"]').type('A')
            cy.contains('label', 'Postitoimipaikka').click()
            cy.checkErrorExist('#city-error')
            cy.get('#next-button').should('be.disabled')

        })

        it ('user cannot click next if city name is too long', function(){

            cy.get('input[name="city"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.checkCorrectLength('input[name="city"]', 40)
        })
    })


    describe('Step changes', function () {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
        })

        it('Step1 follows when step0 is ready', function() {
            cy.get('#next-button').click()
            cy.contains('Puhelinnumero')
        })

        it('Back button changes view on step1', function() {
            cy.get('#next-button').click()
            cy.contains('Puhelinnumero')
            cy.get('#back-button').click()
            cy.contains('Etunimi')
        })

        it('Step2 follows when step1 is ready', function() {
            cy.get('#next-button').click()

            cy.setUpRegisterValuesStep2()

            cy.get('#next-button').click()

            cy.contains('Käyttäjänimi')
        })

        it ('Back button changes views on step2', function() {
            cy.get('#next-button').click()

            cy.setUpRegisterValuesStep2()

            cy.get('#next-button').click()

            cy.contains('Käyttäjänimi')
            cy.get('#back-button').click()
            cy.contains('Puhelinnumero')
        })

        it('User is logged in when registration is succesful', function() {
            cy.get('#next-button').click()

            cy.setUpRegisterValuesStep2()

            cy.get('#next-button').click()

            cy.setUpRegisterValuesStep3()

            cy.get('#register-button').click()
            cy.contains('Kirjaudu ulos')

        })

    })

    describe('Registration step1', function () {
        beforeEach(() => {
            cy.setUpRegisterValuesStep1()
            cy.get('#next-button').click()
        })

        it('user cannot click next if phone number and email fields are empty',function(){
            cy.get('#next-button').should('be.disabled')
        })

        it('Phone number must contain at least 5 characters', function() {
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')
            cy.get('input[name="phoneNumber"]').type('24')
            cy.contains('label', 'Puhelinnumero').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#phoneNumber-error')
        })

        it('Phone number must only contain numbers', function() {
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')
            cy.get('input[name="phoneNumber"]').type('abcdefghijklmnopqr')
            cy.contains('label', 'Puhelinnumero').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#phoneNumber-error')
        })

        it ('phone number maximum is 15 characters', function() {
            cy.get('input[name="phoneNumber"]').type('034035454039583745')
            cy.checkCorrectLength('input[name="phoneNumber"]', 15)
        })

        it ('email length must be over 4', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('i@fi')
            cy.contains('label', 'Sähköposti').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#email-error')
        })

        it ('email length max is 40 characters', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg@email.fi')
            cy.checkCorrectLength('input[name="email"]', 40)
        })

        it('email must contain at sign', function () {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('thisemailisfalsy.fi')
            cy.contains('label', 'Sähköposti').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#email-error')
        })

        it('email must contain dot', function () {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('thisemailisfalsy@fi')
            cy.contains('label', 'Sähköposti').click()
            cy.get('#next-button').should('be.disabled')
            cy.checkErrorExist('#email-error')
        })
    })

    describe('Registration step2', function() {

        beforeEach(() => {
            cy.setUpRegisterValuesStep1()

            cy.get('#next-button').click()

            cy.setUpRegisterValuesStep2()
            cy.get('#next-button').click()
        })

        it('user cannot register if fields are empty',function(){
            cy.get('#register-button').should('be.disabled')
        })

        describe('Username check', function() {

            beforeEach(() => {
                cy.get('input[name="password"]').type('salainen123')
                cy.get('input[name="passwordConfirm"]').type('salainen123')
            })

            it ('username must contain at least two characters', function(){

                cy.get('input[name="username"]').type('A')
                cy.contains('label', 'Käyttäjänimi').click()
                cy.checkErrorExist('#username-error')
                cy.get('#register-button').should('be.disabled')

            })

            it ('username max length is 15 characters', function(){

                cy.get('input[name="username"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
                cy.checkCorrectLength('input[name="username"]', 15)
            })
        })

        describe('Password check', function() {
            beforeEach(() => {
                cy.get('input[name="username"]').type('OlliKor')
            })

            it('password min length is 10', function() {
                cy.get('input[name="password"]').type('sala12')
                cy.get('input[name="passwordConfirm"]').type('sala12')
                cy.contains('label', 'Salasana').click()
                cy.get('#register-button').should('be.disabled')
                cy.checkErrorExist('#password-error')
            })

            it('password max length is 30', function() {
                cy.get('input[name="password"]').type('salainensalasananionylikolmekymmentä')
                cy.get('input[name="passwordConfirm"]').type('salainensalasananionylikolmekymmentä')
                cy.checkCorrectLength('input[name="password"]', 30)
                cy.checkCorrectLength('input[name="passwordConfirm"]', 30)

            })

            it('password must be confirmed', function() {
                cy.get('input[name="password"]').type('salainen123')
                cy.get('input[name="passwordConfirm"]').type('salainen')
                cy.contains('label', 'Salasana').click()
                cy.get('#register-button').should('be.disabled')
                cy.get('#passwordConfirm-error')

                    .should('be.visible')
            })

        })


    })



})