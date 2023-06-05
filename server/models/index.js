const User = require('./user')
const Team = require('./team')
const Event = require('./event')
const Supervisor = require('./supervisor')


User.hasMany(Event, { foreignKey: 'createdByUserId', as: 'createdEvents' })
User.hasMany(Event, { foreignKey: 'confirmedByUserId', as: 'confirmedEvents' })
User.belongsToMany(Team, { through: 'Supervisor', foreignKey: 'userId' })

Team.hasMany(Event, { foreignKey: 'teamId', as: 'events' })
Team.belongsToMany(User, { through: 'Supervisor', foreignKey: 'teamId' })

Event.belongsTo(User, { foreignKey: 'createdByUserId', as: 'createdBy' })
Event.belongsTo(Team, { foreignKey: 'teamId', as: 'team' })
Event.belongsTo(User, { foreignKey: 'confirmedBySupervisorId', as: 'confirmedBy' })

Supervisor.belongsTo(User)
Supervisor.belongsTo(Team)

module.exports = {
    User,
    Team,
    Event,
    Supervisor
}