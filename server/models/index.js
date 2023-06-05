const User = require('./user')
const Team = require('./team')
const Event = require('./event')
const Supervisor = require('./supervisor')


User.hasMany(Event, { foreignKey: 'createdByUserId', as: 'CreatedEvents' })
User.hasMany(Event, { foreignKey: 'confirmedByUserId', as: 'ConfirmedEvents' })
User.belongsToMany(Team, { through: 'Supervisor', foreignKey: 'userId' })

Team.hasMany(Event, { foreignKey: 'teamId', as: 'TeamEvents' })
Team.belongsToMany(User, { through: 'Supervisor', foreignKey: 'teamId' })

Event.belongsTo(User, { foreignKey: 'createdByUserId', as: 'CreatedBy' })
Event.belongsTo(Team, { foreignKey: 'teamId', as: 'EventTeam' })
Event.belongsTo(User, { foreignKey: 'confirmedBySupervisorId', as: 'ConfirmedBy' })

Supervisor.belongsTo(User)
Supervisor.belongsTo(Team)

module.exports = {
    User,
    Team,
    Event,
    Supervisor
}