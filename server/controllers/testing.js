const router = require('express').Router()
const { User } = require('../models/user')


router.post('/reset', async (request, response) => {
    await User.destroy({
        where: {},
        truncate: true
    })

    response.status(204).end()
})

module.exports = router