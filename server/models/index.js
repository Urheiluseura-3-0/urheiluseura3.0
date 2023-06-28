const User = require('./user')
const Team = require('./team')
const Event = require('./event')
const Job = require('./job')
const Supervisor = require('./supervisor')
const Reset = require('./reset')


User.hasMany(Event, { foreignKey: 'createdById', as: 'CreatedEvents' })
User.hasMany(Event, { foreignKey: 'confirmedById', as: 'ConfirmedEvents' })
User.hasMany(Job, { foreignKey: 'createdById', as: 'CreatedJobs'})
User.hasMany(Job, { foreignKey: 'confirmedById', as: 'ConfirmedJobs'})
User.belongsToMany(Team, { through: 'Supervisor', foreignKey: 'userId' })
User.hasOne(Reset, {foreignKey: 'userId', as: 'UserReset'})

Team.hasMany(Event, { foreignKey: 'teamId', as: 'TeamEvents' })
Team.belongsToMany(User, { through: 'Supervisor', foreignKey: 'teamId' })

Event.belongsTo(User, { foreignKey: 'createdById', as: 'CreatedBy' })
Event.belongsTo(Team, { foreignKey: 'teamId', as: 'EventTeam' })
Event.belongsTo(User, { foreignKey: 'confirmedById', as: 'ConfirmedBy' })

Job.belongsTo(User, { foreignKey: 'createdById', as: 'CreatedBy' })
Job.belongsTo(User, { foreignKey: 'confirmedById', as: 'ConfirmedBy'})

Supervisor.belongsTo(User)
Supervisor.belongsTo(Team)

Reset.belongsTo(User)

module.exports = {
    User,
    Team,
    Event,
    Supervisor,
    Reset,
    Job
}