const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/user.js')
const registerRouter = require('./controllers/register.js')
const eventRouter = require('./controllers/event.js')
const teamRouter = require('./controllers/team.js')
const resetRouter = require('./controllers/reset.js')
const { jobRouter } = require('./controllers/job.js')
const cookieParser = require('cookie-parser')
const middleware = require('./utils/middleware.js')
const userRoleRouter = require('./controllers/userrole.js')

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(cookieParser())


app.use('/api/auth', userRouter)
app.use('/api/register', registerRouter)
app.use('/api/event', eventRouter)
app.use('/api/team', teamRouter)
app.use('/api/reset', resetRouter)
app.use('/api/job', jobRouter)
app.use('/api/userrole', userRoleRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
        res.status(500).send(err)
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app