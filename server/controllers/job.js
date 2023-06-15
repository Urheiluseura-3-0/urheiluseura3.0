const jobRouter = require('express').Router()

const { Job } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { validateJobInput } = require('./validate_input.js')

function hoursToDecimal(hours,minutes) {

    if( minutes === 0) {
        return hours
    }
    const decimalHours = hours + minutes/60
    return decimalHours
}

jobRouter.post('/', tokenExtractor, async (request, response) => {

    try{

        const {squad, context, date, location, hours, minutes } = request.body

        const intHours = parseInt(hours)
        const intMinutes = parseInt(minutes)

        if (!squad) {
            return response.status(401).json({ error: 'Virheellinen ryhmä' })
        }
        if (!date) {
            return response.status(401).json({ error: 'Virheellinen päivämäärä' })
        }
        if (!location) {
            return response.status(401).json({ error: 'Virheellinen sijainti' })
        }
        if (!hours) {
            return response.status(401).json({ error: 'Virheelliset työtunnit' })
        }

        if(!minutes) {
            return response.status(401).json({error: 'Virheelliset minuutit'})
        }
        
        const checkJobErrors = validateJobInput(squad, context, date, location, intHours, intMinutes)


        if (checkJobErrors.length > 0) {
            return response.status(401).json({ error: `${checkJobErrors}` })

        }


        const workhours = hoursToDecimal(intHours, intMinutes)


        const finduser = await User.findByPk(request.decodedToken.id)

        if (!finduser) {
            return response.status(401).json({error: 'Virhe hakiessa käyttäjää'})
        }

        const job = new Job({
            createdById : finduser.dataValues.id,
            squad : squad,
            context : context,
            dateTime: date,
            location : location,
            hours: workhours

        })

        const savedJob = await Job.create(job.dataValues)



        return response.status(200).json(savedJob)
 
    }catch(error){
        return response.status(400)
    }
})



module.exports = jobRouter