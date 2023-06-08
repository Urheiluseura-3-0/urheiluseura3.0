const eventRouter = require('express').Router()

const {Event} = require('../models')
const {User} = require('../models')
const {Team} = require('../models')
const {validateEventInput} = require('./validate_input.js')
const { tokenExtractor } = require('../utils/middleware')




eventRouter.post('/', tokenExtractor, async(request, response) => {

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

        const finduser = await User.findByPk(request.decodedToken.id)

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

    
        const findteam = await Team.findByPk(team)

        if (!findteam) {
            return response.status(401).json({error: 'team missing or incorrect team'})
        }

        const event = new Event({
            createdById: user.id,
            opponent:opponent,
            location:location,
            dateTime : newdate,
            description: description,
            teamId: team
        })

        const savedEvent = await Event.create(event.dataValues)

      
    
        return response.status(200).json(savedEvent)
    }catch(error){
        return response.status(400)
    }


})

module.exports =  eventRouter