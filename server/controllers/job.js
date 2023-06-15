const jobRouter = require('express').Router()

const { Job } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { validateJobInput } = require('./validate_input.js')

jobRouter.post('/', tokenExtractor, async (request, response) => {

    try{

        const {squad, context, date, location, hours, minutes } = request.body

        console.log('RUNKO', request.body)

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
        
        console.log('MENNÄÄN CHECKIIN')
        const checkJobErrors = validateJobInput(squad, context, date, location, hours, minutes)

        console.log('TULLAAN CHECKISTA', checkJobErrors)

        if (checkJobErrors.length > 0) {
            return response.status(401).json({ error: `${checkJobErrors}` })

        }

        console.log('EI VIRHEITÄ', checkJobErrors.length)

        const minutesToDecimal = minutes/60

        const workhours = hours + minutesToDecimal

        console.log('TYÖTUNNIT', workhours)

        const finduser = await User.findByPk(request.decodedToken.id)

        console.log('LÖYTYI KÄYTTÄJÄ', finduser)

        if (!finduser) {
            return response.status(401).json({error: 'Virhe hakiessa käyttäjää'})
        }

        console.log('LUODAAN TYÖ 1')
        const job = new Job({
            createdById : finduser.dataValues.id,
            squad : squad,
            context : context,
            dateTime: date,
            location : location,
            hours: workhours

        })
        console.log('LUODAAN TYÖ 2', job)

        const savedJob = await Job.create(job.dataValues)

        console.log('LUODAAN TYÖ 3', savedJob)

        return response.status(200).json(savedJob)
 
    }catch(error){
        return response.status(400)
    }
})



module.exports = jobRouter