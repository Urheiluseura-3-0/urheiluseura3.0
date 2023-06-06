const router = require('express').Router()
const { User, Team, Supervisor, Event } = require('../models')


router.post('/reset', async (request, response) => {
    await Event.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    await Supervisor.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    await Team.destroy({
        where: {},
        truncate: true,
        cascade: true
    })
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    response.status(204).end()
})

module.exports = router