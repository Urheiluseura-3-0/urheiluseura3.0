const config = require('./config')
const { Sequelize, } = require('sequelize')

const sequelize = new Sequelize(config.DATABASE_URL)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to the database')
    } catch (err) {
        console.log('Failed to connect to the database')
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }