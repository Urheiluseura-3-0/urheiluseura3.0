const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const config = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

    const { username, password} = request.body
    const finduser = await User.findOne({where: {username: username}})
    
    let user=null

    if (finduser) {
        user = finduser.dataValues
    }
    else{
        return response.status(401).json({error: 'invalid username or password'})  
    }

    const checkPassword = user === null
        ? false
        : await bcrypt.compare(password, user.password)


    if (!(user && checkPassword)) {
        return response.status(401).json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(
        userForToken, 
        config.SECRET,
        { expiresIn:60*60}
    )

    return response
        .cookie('Token', token, {maxAge: 900000, httpOnly:true})
        .status(200)
        .send({token, username:user.username, name:user.name})

})


module.exports = loginRouter