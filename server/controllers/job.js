const jobRouter = require('express').Router()

const { Job } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { validateJobInput } = require('../utils/validate_input.js')
const { checkMissing } = require('../utils/checks')

function hoursToDecimal(hours,minutes) {

    if( minutes === 0) {
        return hours
    }
    const decimalHours = hours + minutes/60
    return decimalHours
}

jobRouter.post('/', tokenExtractor, async (request, response) => {

    try{
        const {squad, context, date, time, location, hours, minutes } = request.body
        checkMissing(squad, 'Virheellinen ryhmä', response)
        checkMissing(date, 'Virheellinen päivämäärä', response)
        checkMissing(time, 'Virheellinen aikaleima', response)
        checkMissing(location, 'Virheellinen sijainti', response)
        checkMissing(hours, 'Virheelliset työtunnit', response)
        checkMissing(minutes, 'Virheelliset minuutit', response)

        const checkJobErrors = validateJobInput(squad, context, date, time, location, intHours, intMinutes)

        if (checkJobErrors.length > 0) {
            return response.status(401).json({ error: `${checkJobErrors}` })

        }

        const intHours = parseInt(hours)
        const intMinutes = parseInt(minutes)
        const workhours = hoursToDecimal(intHours, intMinutes)

        const finduser = await User.findByPk(request.decodedToken.id)

        if (!finduser) {
            return response.status(401).json({error: 'Virhe hakiessa käyttäjää'})
        }

        const newdate = new Date(date)
        const [datehours, dateminutes] = time.split(':')

        newdate.setHours(datehours)
        newdate.setMinutes(dateminutes)

        const job = new Job({
            createdById : finduser.dataValues.id,
            squad : squad,
            context : context,
            dateTime: newdate,
            location : location,
            hours: workhours

        })

        const savedJob = await Job.create(job.dataValues)

        return response.status(200).json(savedJob)
 
    }catch(error){
        return response.status(400)
    }
})



module.exports = { jobRouter, hoursToDecimal }