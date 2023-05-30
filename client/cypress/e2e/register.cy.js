describe('Register', () => {
    beforeEach( function(){
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.visit('http://localhost:3000')
        cy.get('#register-link').click()
    }
    )

    it('register view is open', function(){
        cy.url().should('include','/register')
        cy.should('contain', 'Rekisteröidy')
    })

    it('user cannot click next if fields are empty',function(){

        cy.window().then((win) => {
            cy.spy(win, 'handleNext').as('handleNextSpy')
        })
        cy.get('#next-button').click()
        cy.get('@handleNextSpy').should('not.have.been.calledOnce')
    })


    describe('First name check', function() {

        before(() => {
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if first name is too short', function() {
            cy.get('input[name="firstname"]').type('O')
            cy.get('#next-button').click()
            cy.get('#firstname-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')
        })


        it ('user first name will not be too long', function() {
            cy.get('input[name="firstname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="firstname"]').should('have.length', 40)
        })
    })

    describe('Last name check', function() {

        before(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if last name is too short', function() {

            cy.get('input[name="lastname"]').type('O')
            cy.get('#next-button').click()
            cy.get('#lastname-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')
        })


        it ('user last name will not be too long', function() {

            cy.get('input[name="lastname"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="lastname"]').should('have.length', 40)
        })

    })



    describe('Address check', function() {

        before(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if address is too short', function() {

            cy.get('input[name="address"]').type('O')
            cy.get('#next-button').click()
            cy.get('#address-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')

        })

        it ('user address will not be too long', function() {

            cy.get('input[name="address"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="address"]').should('have.length', 40)
        })

    })

    describe('Postal code check', function() {

        before(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="city"]').type('Akaa')
        })

        it ('user cannot click next if postal code is too short', function(){

            cy.get('input[name="postalCode"]').type('12')
            cy.get('#next-button').click()
            cy.get('#postalcode-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')

        })

        it ('postal code will not be too long', function(){

            cy.get('input[name="postalCode"]').type('098740')
            cy.get('input[name="postalCode"]').should('have.length', 5)
        })

        it ('postal code only contains numbers', function(){

            cy.get('input[name="postalCode"]').type('ABCDE')
            cy.get('#next-button').click()
            cy.get('#postalcode-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')

        })
    })

    describe('City check', function() {

        before(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
        })
        it ('name of the city must contain at least two characters', function(){

            cy.get('input[name="city"]').type('A')
            cy.get('#next-button').click()
            cy.get('#city-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')

        })

        it ('user cannot click next if city name is too long', function(){

            cy.get('input[name="city"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
            cy.get('input[name="address"]').should('have.length', 40)
        })
    })


    describe('Step changes', function () {

        before(() => {
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

    })

    describe('Registration step1', function () {
        before(() => {
            cy.get('input[name="firstname"]').type('Olli')
            cy.get('input[name="lastname"]').type('Korhonen')
            cy.get('input[name="address"]').type('Kotkakuja 5')
            cy.get('input[name="postalCode"]').type('02670')
            cy.get('input[name="city"]').type('Akaa')
            cy.get('#next-button').click()
        })

        it('user cannot click next if phone number and email fields are empty',function(){

            cy.window().then((win) => {
                cy.spy(win, 'handleNext').as('handleNextSpy')
            })
            cy.get('#next-button').click()
            cy.get('@handleNextSpy').should('not.have.been.calledOnce')
        })

        it('Phone number must contain at least 5 characters', function() {
            cy.get('input[name="email"]').type('esimerkki@jippii.fi')
            cy.get('input[name="phoneNumber"]').type('24')
            cy.get('#next-button').click()
            cy.get('#phoneNumber-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')
        })
        it ('phone number maximum is 15 characters', function() {
            cy.get('input[name="phoneNumber"]').type('034035454039583745')
            cy.get('input[name="phoneNumber"]').should('have.length', 15)
        })

        it ('email length must be over 4', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('i@fi')
            cy.get('#next-button').click()
            cy.get('#email-error')
                .should('have.class','peer-invalid')
                .sould('be.visible')
        })

        it ('email length max is 40 characters', function() {
            cy.get('input[name="phoneNumber"]').type('0450985677')
            cy.get('input[name="email"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg@email.fi')
            cy.get('input[name="firstname"]').should('have.length', 40)
        })
    })

    describe('Registration step2', function() {

        before(() => {
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

            cy.window().then((win) => {
                cy.spy(win, 'handleNext').as('handleSubmitSpy')
            })
            cy.get('#register-button').click()
            cy.get('@handleSubmitSpy').should('not.have.been.calledOnce')
        })

        describe('Username check', function() {

            before(() => {
                cy.get('input[name="password"]').type('salainen123')
                cy.get('input[name="passwordConfirm"]').type('salainen123')
            })

            it ('username must contain at least two characters', function(){

                cy.get('input[name="username"]').type('A')
                cy.get('#register-button').click()
                cy.get('#username-error')
                    .should('have.class','peer-invalid')
                    .sould('be.visible')

            })

            it ('username max length is 15 characters', function(){

                cy.get('input[name="username"]').type('Chargoggagoggmanchauggagoggchaubunagungamaugg')
                cy.get('input[name="address"]').should('have.length', 15)
            })
        })

        describe('Password check', function() {
            before(() => {
                cy.get('input[name="username"]').type('OlliKor')
            })

        })


    })



})