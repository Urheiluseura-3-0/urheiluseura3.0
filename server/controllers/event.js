const eventRouter = require('express').Router()
const config = require('../utils/config')
const {Event} = require('../models')
const {User} = require('../models')
const {validateEventInput} = require('./validate_input.js')
const jwt = require('jsonwebtoken')

eventRouter.post('/', async(request, response) => {

    try{
        

        console.log(request.body)
        const { team, opponent, location, date, time, description, token } = request.body

        console.log(config.SECRET)
        const decodedToken = jwt.verify(token, config.SECRET) 


    
        if (!decodedToken){
            return response.status(401).json({error: 'invalid token'})
        }

        const finduser = await User.findByPk(decodedToken.id)

        let user = null
    
        if (finduser) {
            user = finduser.dataValues
        }
        

        console.log(date, time)

        const newdate = new Date(date)
        const [hours, minutes] = time.split(':')

        newdate.setHours(hours)
        newdate.setMinutes(minutes)

        console.log(newdate)

        const checkEventErrors = validateEventInput(team, opponent, newdate, location, description)



       

        if (checkEventErrors.length > 0) {
            return response.status(401).json({error: `${checkEventErrors}`})
        }

        

        const event = new Event({

            userId:user.id,
            opponent:opponent,
            location:location,
            dateTime : newdate,
            description: description,
            teamId: 1
        })

        

        const savedEvent = await Event.create(event.dataValues)

        console.log('SAVED', event)
    
        return response.status(200).json(savedEvent)
    }catch(error){
        return response.status(400)
    }


})

module.exports =  eventRouter