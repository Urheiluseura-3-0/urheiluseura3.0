

describe('Register', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
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

            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if first name is too short', function() {
            cy.get('input[name="firstname"]').type('O')
            cy.get('#next-button').should('be.disabled')
            cy.get('#firstname-error')
                .should('be.visible')
        })


        it ('user first name will not be too long', function() {
            cy.get('input[name="firstname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="firstname"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Last name check', function() {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if last name is too short', function() {

            cy.get('input[name="lastname"]').type('O')
            cy.get('#next-button').should('be.disabled')
            cy.get('#lastname-error')
                .should('be.visible')
        })


        it ('user last name will not be too long', function() {

            cy.get('input[name="lastname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="lastname"]').invoke('val').should('have.length', 40)
        })

    })



    describe('Address check', function() {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if address is too short', function() {

            cy.get('input[name="address"]').type('O')
            cy.get('#next-button').should('be.disabled')
            cy.get('#address-error')
                .should('be.visible')

        })

        it ('user address will not be too long', function() {

            cy.get('input[name="address"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="address"]').invoke('val').should('have.length', 40)
        })

    })

    describe('Postal code check', function() {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if postal code is too short', function(){

            cy.get('input[name="postalCode"]').type('12')
            cy.get('#postalCode-error')
                .should('be.visible')
            cy.get('#next-button').should('be.disabled')
        })

        it ('postal code will not be too long', function(){

            cy.get('input[name="postalCode"]').type('098740')
            cy.get('input[name="postalCode"]').invoke('val').should('have.length', 5)
        })

        it ('postal code only contains numbers', function(){

            cy.get('input[name="postalCode"]').type('ABCDE')
            cy.get('#next-button').should('be.disabled')
            cy.get('#postalCode-error')

                .should('be.visible')

        })
    })

    describe('City check', function() {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
        })
        it ('name of the city must contain at least two characters', function(){

            cy.get('input[name="city"]').type('A')
            cy.get('#next-button').should('be.disabled')
            cy.get('#city-error')

                .should('be.visible')

        })

        it ('user cannot click next if city name is too long', function(){

            cy.get('input[name="city"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="city"]').invoke('val').should('have.length', 40)
        })
    })


    describe.skip('Step changes', function () {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it('Step1 follows when step0 is ready', function() {
            cy.window().then((win) => {
                cy.spy(win, 'handleNext').as('handleNextSpy')
            })
            cy.get('#next-button').click()
            cy.get('@handleNextSpy').should('have.been.calledOnce')
        })

        it('Step2 follows when step1 is ready', function() {
            cy.get('#next-button').click()

            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')

            cy.window().then((win) => {
                cy.spy(win, 'handleNext').as('handleNextSpy')
            })
            cy.get('#next-button').click()
            cy.get('@handleNextSpy').should('have.been.calledOnce')
        })

        it('Login view is followed when step2 is ready', function() {
            cy.get('#next-button').click()

            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')

            cy.get('#next-button').click()

            cy.get('input[name="password"]').type('salainen123')
            cy.get('input[name="passwordConfirm"]').type('salainen123')

            cy.window().then((win) => {
                cy.spy(win, 'handleSubmit').as('handleSubmitSpy')
            })
            cy.get('#register-button').click()
            cy.get('@handleSubmiySpy').should('have.been.calledOnce')

        })

    })

    describe('Registration step1', function () {
        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
            cy.get('#next-button').click()
        })

        it('user cannot click next if phone number and email fields are empty',function(){
            cy.get('#next-button').should('be.disabled')
        })

        it('Phone number must contain at least 5 characters', function() {
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')
            cy.get('input[name="phoneNumber"]').type('24')
            cy.get('#next-button').should('be.disabled')
            cy.get('#phoneNumber-error')

                .should('be.visible')
        })
        it ('phone number maximum is 15 characters', function() {
            cy.get('input[name="phoneNumber"]').type('034035454039583745')
            cy.get('input[name="phoneNumber"]').invoke('val').should('have.length', 15)
        })

        it ('email length must be over 4', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('i@fi')
            cy.get('#next-button').should('be.disabled')
            cy.get('#email-error')

                .should('be.visible')
        })

        it ('email length max is 40 characters', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg@email.fi')
            cy.get('input[name="firstname"]').invoke('val').should('have.length', 40)
        })
    })

    describe('Registration step2', function() {

        beforeEach(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')

            cy.get('#next-button').click()

            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')
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
                cy.get('#register-button').should('be.disabled')
                cy.get('#username-error')

                    .should('be.visible')

            })

            it ('username max length is 15 characters', function(){

                cy.get('input[name="username"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
                cy.get('input[name="address"]').invoke('val').should('have.length', 15)
            })
        })

        describe('Password check', function() {
            beforeEach(() => {
                cy.get('input[name="username"]').type('OlliKor')
            })

            it('password min length is 10', function() {
                cy.get('input[name="password"]').type('sala12')
                cy.get('input[name="passwordConfirm"]').type('sala12')
                cy.get('#register-button').should('be.disabled')
                cy.get('#passwordConfirm-error')

                    .should('be.visible')
            })

            it('password max length is 30', function() {
                cy.get('input[name="password"]').type('salainensalasananionylikolmekymmentä')
                cy.get('input[name="passwordConfirm"]').type('salainensalasananionylikolmekymmentä')
                cy.get('input[name="password"]').invoke('val').should('have.length', 40)
                cy.get('input[name="passwordConfirm"]').invoke('val').should('have.length', 40)

            })

            it('password must be confirmed', function() {
                cy.get('input[name="password"]').type('salainen123')
                cy.get('input[name="passwordConfirm"]').type('salainen')
                cy.get('#register-button').should('be.disabled')
                cy.get('#passwordConfirm-error')

                    .should('be.visible')
            })

        })


    })



})