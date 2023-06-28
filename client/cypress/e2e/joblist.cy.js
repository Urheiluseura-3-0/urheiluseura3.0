import '../support/testHelpers'

describe('Joblist', function () {

    beforeEach(function () {

        cy.createUserForTesting()


        const loggedUser = cy.request('POST', 'http://localhost:3001/api/auth/login', Cypress.env('loggedUserInfo'))

        const jobs = [
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-27',
                time: '10:00',
                location: 'Helsinki',
                hours: '2',
                minutes: '0'
            },
            {
                squad: 'Tytöt-15',
                context: 'Harjoitukset',
                date: '2023-05-22',
                time: '10:00',
                location: 'Espoo',
                hours: '1',
                minutes: '30'
            },
            {
                squad: 'Aikuiset',
                context: 'Kevyt palloilu',
                date: '2023-06-07',
                time: '12:00',
                location: 'Helsinki',
                hours: '3',
                minutes: '15'
            },
            {
                squad: 'Lapset',
                context: 'Lasten koripallovalmennus',
                date: '2023-06-21',
                time: '14:30',
                location: 'Espoon alakoulu',
                hours: '2',
                minutes: '15'
            },
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-29',
                time: '15:30',
                location: 'Helsinki',
                hours: '1',
                minutes: '45'
            },
            {
                squad: 'Miehet',
                context: 'Miesten treenit',
                date: '2023-06-15',
                time: '19:00',
                location: 'Helsinki',
                hours: '4',
                minutes: '30'
            }

        ]

        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[0]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[1]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[2]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[3]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[4]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/job',
            headers: { Cookie: loggedUser.cookie }, body: jobs[5]
        })

        cy.visit('http://localhost:3001/jobs')

        cy.get('#timeline-button').click()
        cy.get('#datefrom').type('2023-05-19')
        cy.get('#dateto').type('2023-06-30')
        cy.get('#timeline-button').click()
    })

    it('User can see all jobs', function () {
        cy.contains('Työtunnit')
    })

    it('The first visible job is not accepted', function () {
        cy.get('#unconfirmedJobs-button')
            .should('have.class', 'bg-rose-400')
            .should('have.class', 'ring-rose-600')
        cy.get('#jobsrow').each(($row) => {
            cy.wrap($row)
                .find('td:nth-child(4)')
                .should('contain', 'Odottaa hyväksyntää')
        })
    })

    it('All jobs can be displayed by pressing the button', function () {
        cy.get('#allJobs-button').click()
        cy.get('#allJobs-button')
            .should('have.class', 'bg-blue-400')
            .should('have.class', 'ring-blue-600')
    })

    describe('Unconfirmed jobs', () => {

        it('User can choose timeline', function () {
            cy.get('#timeline-button').click()
            cy.get('#datefrom').type('2023-05-30')
            cy.get('#dateto').type('2023-06-10')
            cy.get('#jobs').find('#jobsrow').should('have.length', 1)
        })

        it('User can sort unconfirmed jobs by day', function () {
            cy.wait(1000)
            cy.get('#date').click()
            cy.get('#jobs').find('tbody').find('tr').first().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/2?1[/|.]0?6[/|.]2023|0?6[/|.]2?1[/|.]2023/)
                })
            cy.get('#jobs').find('tbody').find('tr').last().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/0?5[/|.]22[/|.]2023|22[/|.]0?5[/|.]2023/)
                })
        })

        it('User can sort unconfirmed jobs by hours', function() {
            cy.wait(1000)
            cy.get('#hours').click()
            cy.tableColumnHasValues('#jobs', 1,'1h 30min', '4h 30min')
        })

        it('User can sort unconfirmed jobs by squad', function () {
            cy.wait(1000)
            cy.get('#squad').click()
            cy.tableColumnHasValues('#jobs', 2,'Aikuiset', 'Tytöt-15')
        })

        it('User can see detailed information when clicking job', function () {
            cy.get('#jobs').find('tbody').find('tr').first().click()
            cy.get('#jobdetail')
                .should('contain', 'Ryhmä')
                .should('contain', 'Lapset')
                .should('contain', 'Tunnit')
                .should('contain', '2h 15min')
                .should('contain', 'Paikka')
                .should('contain', 'Espoon alakoulu')
                .should('contain', 'Päivä')
                .should('contain', 'Kellonaika')
                .should('contain', 'Lisätiedot')
                .should('contain', 'Lasten koripallovalmennus')
                .should('contain', 'Status')
                .should('contain', 'Odottaa hyväksyntää')
                .should('contain', 'Luotu')
                .should('contain', 'Hyväksyjän nimi')

        })

    })

    describe('Accepted jobs', () => {

        it('Acepted jobs can be displayed by pressing the button', function () {
            cy.get('#confirmedJobs-button').click()
            cy.get('#confirmedJobs-button')
                .should('have.class', 'bg-emerald-400')
                .should('have.class', 'ring-emerald-600')
        })

    })

    describe('All jobs', () => {

        beforeEach(() => {
            cy.get('#allJobs-button').click()
        })

        it('User can choose timeline for all jobs', function () {
            cy.get('#timeline-button').click()
            cy.get('#datefrom').type('2023-05-30')
            cy.get('#dateto').type('2023-06-10')
            cy.get('#jobs').find('#jobsrow').should('have.length', 1)
        })

        it('User can hide timeline for all jobs', function () {
            cy.wait(1000)
            cy.get('#timeline-button').click()
            cy.contains('Työtunnit alkaen')
            cy.contains('Työtunnit asti')
            cy.get('#timeline-button').click()
            cy.contains('Työtunnit alkaen').should('not.exist')
            cy.contains('Työtunnit asti').should('not.exist')
        })

        it('User can sort all jobs by day', function () {
            cy.wait(1000)
            cy.get('#date').click()
            cy.get('#jobs').find('tbody').find('tr').first().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/2?1[/|.]0?6[/|.]2023|0?6[/|.]2?1[/|.]2023/)
                })
            cy.get('#jobs').find('tbody').find('tr').last().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/0?5[/|.]22[/|.]2023|22[/|.]0?5[/|.]2023/)
                })
        })

        it('User can sort all jobs by hours', function() {
            cy.wait(1000)
            cy.get('#hours').click()
            cy.tableColumnHasValues('#jobs', 1,'1h 30min', '4h 30min')
        })

        it('User can sort all jobs by squad', function () {
            cy.wait(1000)
            cy.get('#squad').click()
            cy.tableColumnHasValues('#jobs', 2,'Aikuiset', 'Tytöt-15')
        })

    })


})