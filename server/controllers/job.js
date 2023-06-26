const jobRouter = require('express').Router()

const { Job } = require('../models')
const { User } = require('../models')
const { tokenExtractor } = require('../utils/middleware')
const { validateJobInput } = require('../utils/validate_input.js')

function hoursToDecimal(hours, minutes) {

    if (minutes === 0) {
        return hours
    }
    const decimalHours = hours + minutes / 60
    return decimalHours
}

function checkErrors(parameter, message, response) {
    if (!parameter) {
        return response.status(401).json({ error: message })
    }
}

jobRouter.post('/', tokenExtractor, async (request, response) => {

    try {

        const { squad, context, date, location, hours, minutes } = request.body

        const intHours = parseInt(hours)
        const intMinutes = parseInt(minutes)

        checkErrors(squad, 'Virheellinen ryhmä', response)
        checkErrors(date, 'Virheellinen päivämäärä', response)
        checkErrors(location, 'Virheellinen sijainti', response)
        checkErrors(hours, 'Virheelliset työtunnit', response)
        checkErrors(minutes, 'Virheelliset minuutit', response)

        const checkJobErrors = validateJobInput(squad, context, date, location, intHours, intMinutes)


        if (checkJobErrors.length > 0) {
            return response.status(401).json({ error: `${checkJobErrors}` })

        }


        const workhours = hoursToDecimal(intHours, intMinutes)


        const finduser = await User.findByPk(request.decodedToken.id)

        if (!finduser) {
            return response.status(401).json({ error: 'Virhe hakiessa käyttäjää' })
        }

        const job = new Job({
            createdById: finduser.dataValues.id,
            squad: squad,
            context: context,
            dateTime: date,
            location: location,
            hours: workhours

        })

        const savedJob = await Job.create(job.dataValues)



        return response.status(200).json(savedJob)

    } catch (error) {
        return response.status(400)
    }
})

jobRouter.get('/unconfirmed', tokenExtractor, async (request, response) => {

    try {
        const finduser = await User.findByPk(request.decodedToken.id)
        if (finduser.isForeman === 1) {
            const jobs = await Job.findAll({
                where: {
                    status: 0
                }
            })

            return response.json(jobs)
        } else {
            return response.status(403).json({ error: 'Oikeudet puuttuu' })
        }

    } catch (error) {
        return response.status(400)
    }
})



module.exports = { jobRouter, hoursToDecimal }