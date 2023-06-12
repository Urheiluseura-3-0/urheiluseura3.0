describe('Eventlist', function(){

    beforeEach(function(){
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
                category: 'edustus' },

            {
                name: 'Pojat UI19 ',
                category: 'u19' }
        ]


        cy.request('POST', 'http://localhost:3001/api/team', teams[0])

        cy.request('POST', 'http://localhost:3001/api/team', teams[1])

        cy.request('POST', 'http://localhost:3001/api/team', teams[2])



        const loggedUserInfo =
        {
            username:'Tiina14',
            password: 'salainen1234'
        }

        const loggedUser = cy.request('POST', 'http://localhost:3001/api/login', loggedUserInfo)

        let idList = null

        cy.request('GET', 'http://localhost:3001/api/team').then((response) => {
            idList === response
        })


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
                location: 'Hyvinkää',
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
                console.log('EVENT', event.team)
                const team = teamList.find(team => team.name === event.team)
                if (team) {
                    event.team = team.id
                }
            })
        })

        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[0] })
        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[1] })
        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[2] })
        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[3] })
        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[4] })
        cy.request({ method:'POST', url: 'http://localhost:3001/api/event',
            headers: { Cookie: loggedUser.cookie }, body: events[5] })

        cy.visit('http://localhost:3000')
    })

    it('User can see all events', function() {
        cy.contains('Tapahtumat')

    })

})