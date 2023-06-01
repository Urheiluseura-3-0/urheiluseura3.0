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
Event.belongsTo(Supervisor, { foreignKey: 'confirmedBySupervisorId', as: 'confirmedBy' })

Supervisor.belongsTo(User, { allowNull: false, foreignKey: 'userId', as: 'user' })
Supervisor.belongsTo(Team, { allowNull: false, foreignKey: 'teamId', as: 'team' })

User.sync({ alter:true })
Team.sync({ alter:true })
Supervisor.sync({ alter:true })
Event.sync({ alter:true })

module.exports = {
    User,
    Team,
    Event,
    Supervisor
}