const userRoleRouter = require('express').Router()
const { tokenExtractor } = require('../utils/middleware')
const { User } = require('../models')

userRoleRouter.put('/:id', tokenExtractor, async (request, response) => {
    if (request.decodedToken.isAdmin === 0 && process.env.NODE_ENV !== 'test') {
        return response.status(401).json({error: 'Käyttäjäroolien muuttaminen ei ole sallittua'})
    }

    const user = await User.findOne({
        where: {
            id: request.params.id
        }
    })

    if (user) {
        user.isForeman = request.body.isForeman
        user.isSupervisor = request.body.isSupervisor
        user.isWorker = request.body.isWorker
        user.isCoach = request.body.isCoach
        await user.save()
        return response.json(user)
    } else {
        return response.status(404).end()
    }
})

module.exports = userRoleRouter