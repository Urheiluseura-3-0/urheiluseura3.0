const eventRouter = require('express').Router()
const config = require('../utils/config')
const {Event} = require('../models')
const {User} = require('../models')
const {validateEventInput} = require('./validate_input.js')
const jwt = require('jsonwebtoken')

eventRouter.post('/', async(request, response) => {

    try{

        const { team, opponent, location, date, time, description, token } = request.body

        const decodedToken = jwt.verify(token, config.SECRET) 
    
        if (!decodedToken){
            return response.status(401).json({error: 'invalid token'})
        }

        const finduser = await User.findByPk(decodedToken.id)

        let user = null
    
        if (finduser) {
            user = finduser.dataValues
        }


        const checkEventErrors = validateEventInput(team, opponent, date, time, location, description)

        if (checkEventErrors.length > 0) {
            return response.status(401).json({error: `${checkEventErrors}`})
        }

        const[year, month, day] = date.split('-')
        const[hours, minutes] = time.split('-')

        const dateTime = new Date(year, month, -1, day, hours, minutes)

        const event = new Event({

            userId:user.id,
            team:team,
            opponent:opponent,
            location:location,
            dateTime : dateTime,
            description: description
        })

        const savedEvent = await Event.create(event.dataValues)
    
        return response.status(200).json(savedEvent)
    }catch(error){
        return response.status(400)
    }


})

module.exports =  eventRouter