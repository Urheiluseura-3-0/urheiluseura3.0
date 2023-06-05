const teamRouter = require('express').Router()
const {Team} = require('../models')


teamRouter.get('/', async (request,response) => {

    try{
        const teams = await Team.findAll()
        response.json(teams)

    }catch(error){
        return response.status(400)
    }
})
teamRouter.get('/:id', async (request,response) => {

    try{
        const team = await Team.findByPK(request.params.id)
        if(team){
            response.json(team)
        }else{
            response.status(404).end()
        }

    }catch(error){
        return response.status(400)
    }
})
module.exports =  teamRouter