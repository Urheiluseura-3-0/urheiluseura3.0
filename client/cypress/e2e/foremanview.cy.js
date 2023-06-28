describe('Foremanview', function () {

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

        const role = {
            isForeman : 1,
            isSupervisor: 0,
            isWorker : 0,
            isCoach : 0
        }

        cy.request('POST', 'http://localhost:3001/api/register/', user)
            .then((response) => {
                const id = response.body.id

                cy.request('PUT', `http://localhost:3001/api/userrole/${id}`, role)
            })

        const loggedUserInfo =
        {
            username: 'Tiina14',
            password: 'salainen1234'
        }

        const loggedUser = cy.request('POST', 'http://localhost:3001/api/auth/login', loggedUserInfo)



        const jobs = [
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-27',
                time: '20:00',
                location: 'Helsinki',
                hours: '2',
                minutes: '0'
            },
            {
                squad: 'Tytöt-15',
                context: 'Harjoitukset',
                date: '2023-05-22',
                time: '16:00',
                location: 'Espoo',
                hours: '1',
                minutes: '30'
            },
            {
                squad: 'Aikuiset',
                context: 'Kevyt palloilu',
                date: '2023-06-07',
                time: '17:30',
                location: 'Helsinki',
                hours: '3',
                minutes: '15'
            },
            {
                squad: 'Lapset',
                context: 'Lasten koripallovalmennus',
                date: '2023-06-21',
                time: '11:00',
                location: 'Espoon alakoulu',
                hours: '2',
                minutes: '15'
            },
            {
                squad: 'Pojat-19',
                context: 'Valmennus',
                date: '2023-05-29',
                time: '19:00',
                location: 'Helsinki',
                hours: '1',
                minutes: '45'
            },
            {
                squad: 'Miehet',
                context: 'Miesten treenit',
                date: '2023-06-15',
                time: '20:00',
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

        cy.visit('http://localhost:3001/unconfirmed')
    })

    it('User can see all unaccepted jobs', function () {
        cy.contains('Hyväksymättömät työtunnit')
    })

    it('The first visible job is not accepted', function () {
        cy.get('#jobsrow').each(($row) => {
            cy.wrap($row)
                .find('td:nth-child(4)')
                .should('contain', 'Tiina Testaaja')
        })
    })

    it('User can sort unconfirmed jobs by day', function () {
        cy.wait(1000)
        cy.get('#date').click()
        cy.get('#jobs').find('tbody').find('tr').first().find('td').first().invoke('text')
            .then((text) => {
                expect(text).to.match(/2?1\/0?6\/2023|0?6\/2?1\/2023/)
            })
        cy.get('#jobs').find('tbody').find('tr').last().find('td').first().invoke('text')
            .then((text) => {
                expect(text).to.match(/0?5\/22\/2023|22\/0?5\/2023/)
            })
    })

    it('User can sort unconfirmed jobs by hours', function() {
        cy.wait(1000)
        cy.get('#hours').click()
        cy.get('#jobs').find('tbody').find('tr').first().find('td').eq(1).should('have.text', '1h 30min')
        cy.get('#jobs').find('tbody').find('tr').last().find('td').eq(1).should('have.text', '4h 30min')
    })

    it('User can sort unconfirmed jobs by squad', function () {
        cy.wait(1000)
        cy.get('#squad').click()
        cy.get('#jobs').find('tbody').find('tr').first().find('td').eq(2).should('have.text', 'Aikuiset')
        cy.get('#jobs').find('tbody').find('tr').last().find('td').eq(2).should('have.text', 'Tytöt-15')
    })

    it('User can see detailed information when clicking job', function () {
        cy.get('#jobs').find('tbody').find('tr').first().click()
        cy.get('#jobdetail')
            .should('contain', 'Ryhmä')
            .should('contain', 'Pojat-19')
            .should('contain', 'Tunnit')
            .should('contain', '2h 0min')
            .should('contain', 'Paikka')
            .should('contain', 'Helsinki')
            .should('contain', 'Päivä')
            .should('contain', 'Kellonaika')
            .should('contain', 'Lisätiedot')
            .should('contain', 'Valmennus')
            .should('contain', 'Status')
            .should('contain', 'Odottaa hyväksyntää')
            .should('contain', 'Luotu')
            .should('contain', 'Hyväksyjän nimi')
    })

})