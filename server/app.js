const express = require('express')
const path = require('path')
const app = express() 
const cors = require('cors')
const loginRouter = require('./controllers/login.js')
const registerRouter = require('./controllers/register.js')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))
app.use(cookieParser())


app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

module.exports = app