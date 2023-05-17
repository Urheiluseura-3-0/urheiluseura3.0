const express = require('express')
const app = express() 
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite'
})



app.get('/', async(request, response) => {
    const names = await sequelize.query('SELECT * FROM users', {type: QueryTypes.SELECT})
    response.json(names)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)}) 