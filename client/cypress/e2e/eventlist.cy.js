describe('Eventlist', function () {


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
        const teams = [
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
        ]


        cy.request('POST', 'http://localhost:3001/api/team', teams[0])

        cy.request('POST', 'http://localhost:3001/api/team', teams[1])

        cy.request('POST', 'http://localhost:3001/api/team', teams[2])



        const loggedUserInfo =
        {
            username: 'Tiina14',
            password: 'salainen1234'
        }

        const loggedUser = cy.request('POST', 'http://localhost:3001/api/login', loggedUserInfo)



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

        ]
        cy.request('GET', 'http://localhost:3001/api/team').then(response => {
            const teamList = response.body
            events.forEach(event => {
                const team = teamList.find(team => team.name === event.team)
                if (team) {
                    event.team = team.id
                }
            })
        })

        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[0]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[1]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[2]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[3]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[4]
        })
        cy.request({
            method: 'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[5]
        })


        cy.visit('http://localhost:3000')
    })

    it('User can see all events', function () {
        cy.contains('Tapahtumat')

    })

    it('The first visible events are not accepted', function () {
        cy.get('#unconfirmedEvents-button')
            .should('have.class', 'bg-rose-400')
            .should('have.class', 'ring-rose-600')
        cy.get('#eventrow').each(($row) => {
            cy.wrap($row)
                .find('td:nth-child(4)')
                .should('contain', 'Odottaa hyväksyntää')
        })
    })

    it('All events can be displayed by pressing the button', function () {
        cy.get('#allEvents-button').click()
        cy.get('#allEvents-button')
            .should('have.class', 'bg-blue-400')
            .should('have.class', 'ring-blue-600')
    })





    describe('Unconfirmed events', () => {

        it('User can choose timeline', function () {
            cy.get('#timeline-button').click()
            cy.get('#datefrom').type('2023-05-30')
            cy.get('#dateto').type('2023-06-15')
            cy.get('#events').find('#eventrow').should('have.length', 1)
        })

        it('User can sort unconfirmed events by day', function () {
            cy.wait(1000)
            cy.get('#date').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/5\/6\/2023|6\/5\/2023/)
                })
            cy.get('#events').find('tbody').find('tr').last().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/5\/20\/2023|20\/5\/2023/)
                })
        })

        it('User can sort unconfirmed events by location', function () {
            cy.wait(1000)
            cy.get('#location').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').eq(1).should('have.text', 'Espoo')
            cy.get('#events').find('tbody').find('tr').last().find('td').eq(1).should('have.text', 'Vantaa')

        })

        it('User can sort unconfirmed events by Team', function () {
            cy.wait(1000)
            cy.get('#team').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').eq(2).should('have.text', 'EBT Naiset')
            cy.get('#events').find('tbody').find('tr').last().find('td').eq(2).should('have.text', 'Pojat UI19 ')

        })

        it('User can see detailed information when clicking event', function () {
            cy.get('#events').find('tbody').find('tr').first().click()
            cy.get('#eventdetail')
                .should('contain', 'Vastustaja')
                .should('contain', 'Joukkue2')
                .should('contain', 'Kellonaika')
                .should(($el) => {
                    const text = $el.text()
                    expect(text).to.match(/20:30:00|8:30:00 PM/)
                })
                .should('contain', 'Lisätiedot')
                .should('contain', 'Toimitsija')
                .should('contain', 'Status')
                .should('contain', 'Odottaa hyväksyntää')
                .should('contain', 'Luotu')
                .should('contain', 'Hyväksyjän nimi')


        })

    })

    describe('Accepted events', () => {

        it('Acepted events can be displayed by pressing the button', function () {
            cy.get('#confirmedEvents-button').click()
            cy.get('#confirmedEvents-button')
                .should('have.class', 'bg-emerald-400')
                .should('have.class', 'ring-emerald-600')
        })

    })

    describe('All events', () => {

        beforeEach(() => {
            cy.get('#allEvents-button').click()
        })

        it('User can choose timeline for all events', function () {
            cy.get('#timeline-button').click()
            cy.get('#datefrom').type('2023-05-30')
            cy.get('#dateto').type('2023-06-15')
            cy.get('#events').find('#eventrow').should('have.length', 1)
        })

        it('User can hide timeline for all events', function () {
            cy.wait(1000)
            cy.get('#timeline-button').click()
            cy.contains('Tapahtumat alkaen')
            cy.contains('Tapahtumat asti')
            cy.get('#timeline-button').click()
            cy.contains('Tapahtumat alkaen').should('not.exist')
            cy.contains('Tapahtumat asti').should('not.exist')
        })

        it('User can sort all events by day', function () {
            cy.wait(1000)
            cy.get('#date').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/5\/6\/2023|6\/5\/2023/)
                })
            cy.get('#events').find('tbody').find('tr').last().find('td').first().invoke('text')
                .then((text) => {
                    expect(text).to.match(/5\/20\/2023|20\/5\/2023/)
                })

        })

        it('User can sort all events by location', function () {
            cy.wait(1000)
            cy.get('#location').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').eq(1).should('have.text', 'Espoo')
            cy.get('#events').find('tbody').find('tr').last().find('td').eq(1).should('have.text', 'Vantaa')

        })

        it('User can sort all events by Team', function () {
            cy.get('#team').click()
            cy.get('#events').find('tbody').find('tr').first().find('td').eq(2).should('have.text', 'EBT Naiset')
            cy.get('#events').find('tbody').find('tr').last().find('td').eq(2).should('have.text', 'Pojat UI19 ')

        })


    })

})