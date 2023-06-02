const config = require('./config')
const { Sequelize, } = require('sequelize')

const sequelize = new Sequelize(config.DATABASE_URL)

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Connected to the database')
    } catch (err) {
        console.log('Failed to connect to the database')
        return process.exit(1)
    }

    return null
}

const closeConnectionToDatabase = async () => {
    sequelize.close()
}


module.exports = { closeConnectionToDatabase, connectToDatabase, sequelize }