const updateUserRouter = require('express').Router()
const { User } = require('../models')

updateUserRouter.put('/:id', async (request, response) => {
    const user = await User.findOne({
        where: {
            id: request.params.id
        }
    })

    if (user) {
        user.isForeman = request.body.isForeman
        user.isWorker = request.body.isWorker
        user.isCoach = request.body.isCoach
        await user.save()
        response.json(user)
    } else {
        response.status(404).end()
    }
})

module.exports = updateUserRouter