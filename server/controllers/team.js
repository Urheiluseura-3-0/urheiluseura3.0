const teamRouter = require('express').Router()
const {Team} = require('../models')


teamRouter.get('/', async (request,response) => {

    try{
        const teams = await Team.findAll()
        return response.json(teams)

    }catch(error){
        return response.status(400)
    }
})
teamRouter.get('/:id', async (request,response) => {

    try{
        const team = await Team.findByPk(request.params.id)
        if(team){
            return response.json(team)
        }else{
            return response.status(404).end()
        }

    }catch(error){
        return response.status(400).end()
    }
})
module.exports =  teamRouter