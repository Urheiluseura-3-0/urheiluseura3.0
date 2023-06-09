const eventRouter = require('express').Router()

const { Event } = require('../models')
const { User } = require('../models')
const { Team } = require('../models')
const { validateEventInput } = require('../utils/validate_input.js')
const { tokenExtractor } = require('../utils/middleware')
const { checkMissing } = require('../utils/checks')




eventRouter.post('/', tokenExtractor, async (request, response) => {

    try {
        const { team, opponent, location, date, time, description } = request.body
        checkMissing(team, 'Virheellinen tiimi', response)
        checkMissing(opponent, 'Virheellinen vastustaja', response)
        checkMissing(location, 'Virheellinen sijainti', response)
        checkMissing(date,'Virheellinen päivämäärä' , response)
        checkMissing(time ,'Virheellinen aika', response)

        const checkEventErrors = validateEventInput(team, opponent, date, time, location, description)

        if (checkEventErrors.length > 0) {
            return response.status(401).json({ error: `${checkEventErrors}` })

        }

        const finduser = await User.findByPk(request.decodedToken.id)

        if (!finduser) {
            return response.status(401).json({ error: 'Käyttäjän hakeminen epäonnistui' })
        }

        const newdate = new Date(date)
        const [hours, minutes] = time.split(':')

        newdate.setHours(hours)
        newdate.setMinutes(minutes)

        const findteam = await Team.findByPk(team)

        if (!findteam) {
            return response.status(401).json({ error: 'Tiimin hakeminen epäonnistui' })
        }

        const event = new Event({
            createdById: finduser.dataValues.id,
            opponent: opponent,
            location: location,
            dateTime: newdate,
            description: description,
            teamId: team
        })

        const savedEvent = await Event.create(event.dataValues)

        return response.status(200).json(savedEvent)

    } catch (error) {
        return response.status(400)
    }


})

eventRouter.get('/', tokenExtractor, async (request, response) => {
    try {
        const finduser = await User.findByPk(request.decodedToken.id)
        const events = await finduser.getCreatedEvents({
            include: {
                model:Team,
                as: 'EventTeam'
            },
        })

        return response.json(events)

    } catch (error) {
        return response.status(400)
    }

})

eventRouter.get('/:id', tokenExtractor, async (request, response) => {
    try {
        const event = await Event.findByPk(request.params.id, {
            include: {
                model:Team,
                as: 'EventTeam'
            },
        })
        if (event) {
            if (event.createdById === request.decodedToken.id){
                return response.json(event)
            }
            else{
                return response.status(401).json({error: 'Ei pääsyoikeutta'}).end()
            }
            
        } else {
            return response.status(404).end()
        }

    } catch (error) {
        return response.status(400).end()
    }
})

module.exports = eventRouter