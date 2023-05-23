require('dotenv').config({path:'./.env'})
const express = require('express')
const app = express() 
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { Sequelize, Model, DataTypes } = require('sequelize')
app.use(cors())
app.use(express.json())
app.use(cookieParser())




const sequelize = new Sequelize(process.env.DATABASE_URL)


class User extends Model {}

User.init({
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'user'
})

User.sync()


app.get('/', async(request, response) => {
    const names = await User.findAll()
    response.json(names)
})

app.get('/:id', async(request, response) => {
    const user = await User.findByPk(request.params.id)
    if (user) {
        response.json(user)
    }else{
        response.status(400).end()
    }
})

app.post('/', async(request, response) => {
    try{
        const {name, username, password} = request.body
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            name: name,
            username: username,
            password: passwordHash,
        })

        const savedUser = await User.create(user.dataValues)

        response.json(savedUser)
    } catch(error) {
        return response.status(400)
    }
})

app.post('/login', async (request, response) => {

    const { username, password} = request.body
    const finduser = await User.findOne({where: {username: username}})

    const user = finduser.dataValues

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
        process.env.SECRET,
        { expiresIn:60*60}
    )

    return response
        .cookie('Token', token, {maxAge: 900000, httpOnly:true})
        .status(200)
        .send({token, username:user.username, name:user.name})

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)}) 