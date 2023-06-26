const { Team } = require('../models')
const { User } = require('../models')

const bcrypt = require('bcrypt')


const initialTeams = [
    {
        name: 'Naiset 3',
        category: 'N2D'
    },
    {
        name: 'EBT SB',
        category: 'N4D'
    },
    {
        name: 'EBT',
        category: 'N3D'
    }
]

const handleToken = (token) => {

    const finalToken = token.split(';')[0]
    return finalToken

}


const teamsInDb = async () => {
    const teams = await Team.findAll({})
    return teams.map(team => team.toJSON())
}

const destroyAllUsers = async () => {
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
}

const destroyAllTeams = async () => {
    await Team.destroy({
        where: {},
        truncate:true,
        cascade: true
    })
}

const initializeInitialUsers = async () => {

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salainen1234', saltRounds)

    const initialUsers = [
        {
            firstName: 'Pekka',
            lastName: 'Testinen',
            username: 'Pekka35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
            phoneNumber: '0509876543',
            email: 'osoite@email.com'
        },
        {
            firstName: 'Mikko',
            lastName: 'Testinen',
            username: 'Mikko35',
            password: passwordHash,
            address: 'Osoite',
            postalCode: '00300',
            city: 'Helsinki',
            phoneNumber: '0509876543',
            email: 'testi@email.com'
        }
    ]

    return initialUsers
}

module.exports = {
    initialTeams, teamsInDb, initializeInitialUsers, destroyAllUsers, destroyAllTeams, handleToken
}