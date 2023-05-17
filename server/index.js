const express = require('express')
const app = express() 
const { Sequelize, Model, DataTypes } = require('sequelize')

app.use(express.json())

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite'
})

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

app.post('/', async(request, response) => {
    try{
        const user = await User.create(request.body)
        response.json(user)
    } catch(error) {
        return response.status(400).json({error})
    }
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)}) 