const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express() 
const cors = require('cors')
const loginRouter = require('./controllers/login.js')
const registerRouter = require('./controllers/register.js')
const eventRouter = require('./controllers/event.js')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))
app.use(cookieParser())


app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)
app.use('/api/event', eventRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

module.exports = app