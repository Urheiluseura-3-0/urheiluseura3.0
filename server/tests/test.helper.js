const { Team } = require('../models')

const initialTeams = [
    {
        name: 'Naiset 3',
        category: 'N2D'
    },
    {
        name: 'EBT SB',
        category: 'N4D'
    }
]

const teamsInDb = async () => {
    const teams = await Team.findAll({})
    return teams.map(team => team.toJSON())
}
module.exports = {
    initialTeams, teamsInDb
}