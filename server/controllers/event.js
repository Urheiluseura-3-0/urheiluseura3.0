const eventRouter = require('express').Router()
const config = require('../utils/config')
const {Event} = require('../models')
const {User} = require('../models')
const {Team} = require('../models')
const {validateEventInput} = require('./validate_input.js')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


eventRouter.post('/', async(request, response) => {

    try{
        
        const { team, opponent, location, date, time, description} = request.body
    
        if (!team) {
            return response.status(401).json({error: 'team missing'})           
        }

        if (!opponent) {
            return response.status(401).json({error: 'opponent missing'})           
        }

        if (!location) {
            return response.status(401).json({error: 'location missing'})           
        }

        if (!date) {
            return response.status(401).json({error: 'date missing'})           
        }

        if (!time) {
            return response.status(401).json({error: 'time missing'})           
        }

        try{
            jwt.verify(getTokenFrom(request), config.SECRET)
        }catch(error){
            return response.status(401).json({ error: 'token invalid' })
        }
        
        const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const finduser = await User.findByPk(decodedToken.id)

        let user = null
    
        if (finduser) {
            user = finduser.dataValues
        }
        
        const newdate = new Date(date)
        const [hours, minutes] = time.split(':')

        newdate.setHours(hours)
        newdate.setMinutes(minutes)

        

        const checkEventErrors = validateEventInput(team, opponent, newdate, location, description)


        if (checkEventErrors.length > 0) {
            return response.status(401).json({error: `${checkEventErrors}`})
        }

        const findteam = await Team.findOne({where: {name: team}})
        if (!findteam) {
            return response.status(401).json({error: 'team missing or incorrect team'})
        }

        const event = new Event({
            createdById: user.id,
            opponent:opponent,
            location:location,
            dateTime : newdate,
            description: description,
            teamId: findteam.id
        })
        
        const savedEvent = await Event.create(event.dataValues)

        
    
        return response.status(200).json(savedEvent)
    }catch(error){
        return response.status(400)
    }


})

module.exports =  eventRouter