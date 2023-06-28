const jwt = require('jsonwebtoken')
const Cookies = require('universal-cookie')
const config = require('./config')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Sivua ei löydy' })
}

const errorHandler = (error, request, response, next) => {
    console.log('error', error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Virheellinen id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: 'Validointivirhe' })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'Virheellinen token' })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: 'Kirjautumisesi on vanhentunut',})
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {

    const cookies = new Cookies(request.headers.cookie)
    const authorization = cookies.get('UrheiluseuraToken')

    if (authorization) {
        try {
            request.decodedToken = jwt.verify(authorization, config.SECRET)
        } catch (error) {
            return response.status(401).json({ error: 'Virheellinen token' })
        }
    } else {
        return response.status(401).json({ error: 'Kirjaudu ensin sisään' })
    }

    next()

}

module.exports = {
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}