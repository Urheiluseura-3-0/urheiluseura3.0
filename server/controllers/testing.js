const router = require('express').Router()
const { User } = require('../models')


router.post('/reset', async (request, response) => {
    await User.destroy({
        where: {},
        truncate: true,
        cascade: true
    })

    response.status(204).end()
})

module.exports = router