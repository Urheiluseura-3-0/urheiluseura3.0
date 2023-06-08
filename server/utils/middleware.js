const jwt = require('jsonwebtoken')
const Cookies = require('universal-cookie')
const config = require('./config')

const tokenExtractor = (request, response, next) => {

    const cookies = new Cookies(request.headers.cookie)
    const authorization = cookies.get('Token')

    if (authorization){
        try{
            request.decodedToken = jwt.verify(authorization, config.SECRET)
        } catch (error){
            return response.status(401).json({ error: 'Virheellinen token' })
        }
    }else {
        return response.status(401).json({ error: 'Token puuttuu'})
    }

    next()
    
}



module.exports = {tokenExtractor}